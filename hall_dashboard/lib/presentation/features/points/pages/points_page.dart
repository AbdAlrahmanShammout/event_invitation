import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_credit_transaction_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_entity.dart';
import 'package:hall_dashboard/presentation/core/widgets/empty_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/error_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/status_badge.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:hall_dashboard/presentation/features/points/bloc/points_bloc.dart';
import 'package:hall_dashboard/presentation/features/points/bloc/points_event.dart';
import 'package:hall_dashboard/presentation/features/points/bloc/points_state.dart';
import 'package:intl/intl.dart';

class PointsPage extends StatelessWidget {
  const PointsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<PointsBloc, PointsState>(
      builder: (BuildContext ctx, PointsState state) {
        return switch (state.hallsStatus) {
          LoadStatus.loading || LoadStatus.initial => const Center(
            child: CircularProgressIndicator(),
          ),
          LoadStatus.error => ErrorState(
            message: state.error ?? 'Failed to load halls.',
            onRetry: () => ctx.read<PointsBloc>().add(const PointsLoadRequested()),
          ),
          LoadStatus.loaded => _PointsContent(state: state),
        };
      },
    );
  }
}

class _PointsContent extends StatelessWidget {
  const _PointsContent({required this.state});

  final PointsState state;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        _buildHallsList(context),
        const VerticalDivider(width: 1),
        Expanded(child: _buildTransactionsPanel(context)),
      ],
    );
  }

  Widget _buildHallsList(BuildContext context) {
    return SizedBox(
      width: 260,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: colorTheme(context).outlineVariant.withValues(alpha: 0.4),
                ),
              ),
            ),
            child: Text(
              'Select Hall',
              style: TextStyle(
                fontWeight: FontWeight.w700,
                fontSize: 14,
                color: colorTheme(context).onSurface,
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: state.halls.length,
              itemBuilder: (BuildContext ctx, int index) {
                final HallEntity hall = state.halls[index];
                final bool isSelected = hall.id == state.selectedHallId;
                return ListTile(
                  selected: isSelected,
                  selectedTileColor:
                      colorTheme(context).primary.withValues(alpha: 0.1),
                  title: Text(
                    hall.name,
                    style: TextStyle(
                      fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                      fontSize: 14,
                    ),
                  ),
                  subtitle: Text(
                    '${hall.balance ?? 0} pts',
                    style: const TextStyle(fontSize: 12),
                  ),
                  trailing: isSelected
                      ? Icon(
                          Icons.chevron_right,
                          color: colorTheme(context).primary,
                        )
                      : null,
                  onTap: () => ctx.read<PointsBloc>().add(
                    PointsHallSelected(hall.id),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTransactionsPanel(BuildContext context) {
    if (state.selectedHallId == null) {
      return const EmptyState(message: 'Select a hall to view transactions.');
    }

    final HallEntity selectedHall = state.halls.firstWhere(
      (h) => h.id == state.selectedHallId,
      orElse: () => state.halls.first,
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(
                color: colorTheme(context).outlineVariant.withValues(alpha: 0.4),
              ),
            ),
          ),
          child: Row(
            children: <Widget>[
              Text(
                selectedHall.name,
                style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
              ),
              const SizedBox(width: 12),
              Text(
                '${selectedHall.balance ?? 0} pts balance',
                style: TextStyle(
                  color: colorTheme(context).onSurfaceVariant,
                  fontSize: 13,
                ),
              ),
              const Spacer(),
              FilledButton.icon(
                onPressed: () => _showRechargeDialog(context),
                icon: const Icon(Icons.add, size: 18),
                label: const Text('Add Points'),
              ),
            ],
          ),
        ),
        Expanded(
          child: switch (state.transactionsStatus) {
            LoadStatus.loading => const Center(child: CircularProgressIndicator()),
            LoadStatus.error => ErrorState(
              message: state.error ?? 'Failed to load transactions.',
            ),
            _ => state.transactions.isEmpty
                ? const EmptyState(message: 'No transactions yet.')
                : _buildTransactionsTable(context, state.transactions),
          },
        ),
      ],
    );
  }

  Widget _buildTransactionsTable(
    BuildContext context,
    List<HallCreditTransactionEntity> transactions,
  ) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Card(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(
            color: colorTheme(context).outlineVariant.withValues(alpha: 0.3),
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: DataTable(
            headingRowColor: WidgetStateProperty.all(
              colorTheme(context).surfaceContainerHighest.withValues(alpha: 0.4),
            ),
            columns: const <DataColumn>[
              DataColumn(label: Text('Type')),
              DataColumn(label: Text('Amount')),
              DataColumn(label: Text('Balance After')),
              DataColumn(label: Text('Reference')),
              DataColumn(label: Text('Added By')),
              DataColumn(label: Text('Date')),
            ],
            rows: transactions
                .map(
                  (HallCreditTransactionEntity t) => DataRow(
                    cells: <DataCell>[
                      DataCell(StatusBadge(t.type)),
                      DataCell(
                        Text(
                          '${t.type == 'debit' ? '-' : '+'}${t.amount}',
                          style: TextStyle(
                            fontWeight: FontWeight.w700,
                            color: t.type == 'debit'
                                ? colorTheme(context).error
                                : const Color(0xFF059669),
                          ),
                        ),
                      ),
                      DataCell(Text('${t.balanceAfter} pts')),
                      DataCell(Text(t.reference ?? '—')),
                      DataCell(Text(t.performedByName ?? 'System')),
                      DataCell(
                        Text(
                          DateFormat('MMM d, yyyy HH:mm').format(t.createdAt),
                        ),
                      ),
                    ],
                  ),
                )
                .toList(),
          ),
        ),
      ),
    );
  }

  Future<void> _showRechargeDialog(BuildContext context) async {
    final TextEditingController controller = TextEditingController();
    final bool? confirmed = await showDialog<bool>(
      context: context,
      builder: (BuildContext ctx) => AlertDialog(
        title: const Text('Add Points'),
        content: TextField(
          controller: controller,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(
            labelText: 'Amount (points)',
            border: OutlineInputBorder(),
          ),
        ),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Add'),
          ),
        ],
      ),
    );
    if (confirmed == true && context.mounted) {
      final int? amount = int.tryParse(controller.text.trim());
      if (amount != null && amount > 0) {
        context.read<PointsBloc>().add(
          PointsRechargeRequested(
            hallId: state.selectedHallId!,
            amount: amount,
          ),
        );
      }
    }
  }
}
