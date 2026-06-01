import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_credit_transaction_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_detail_entity.dart';
import 'package:hall_dashboard/presentation/core/widgets/error_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/status_badge.dart';
import 'package:hall_dashboard/presentation/features/hall_detail/bloc/hall_detail_bloc.dart';
import 'package:hall_dashboard/presentation/features/hall_detail/bloc/hall_detail_event.dart';
import 'package:hall_dashboard/presentation/features/hall_detail/bloc/hall_detail_state.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:intl/intl.dart';

class HallDetailPage extends StatefulWidget {
  const HallDetailPage({super.key});

  @override
  State<HallDetailPage> createState() => _HallDetailPageState();
}

class _HallDetailPageState extends State<HallDetailPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hall Details'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const <Tab>[
            Tab(text: 'Overview'),
            Tab(text: 'Billing / Points'),
            Tab(text: 'Actions'),
          ],
        ),
      ),
      body: BlocBuilder<HallDetailBloc, HallDetailState>(
        builder: (BuildContext ctx, HallDetailState state) {
          return switch (state.status) {
            LoadStatus.loading || LoadStatus.initial => const Center(
              child: CircularProgressIndicator(),
            ),
            LoadStatus.error => ErrorState(message: state.error ?? 'Error'),
            LoadStatus.loaded => TabBarView(
              controller: _tabController,
              children: <Widget>[
                _OverviewTab(detail: state.detail!),
                _BillingTab(
                  detail: state.detail!,
                  transactions: state.transactions,
                ),
                _ActionsTab(detail: state.detail!),
              ],
            ),
          };
        },
      ),
    );
  }
}

class _OverviewTab extends StatelessWidget {
  const _OverviewTab({required this.detail});

  final HallDetailEntity detail;

  @override
  Widget build(BuildContext context) {
    final hall = detail.hall;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          _InfoRow('Name', hall.name),
          _InfoRow('Description', hall.description ?? '—'),
          _InfoRow('Address', hall.address ?? '—'),
          _InfoRow('Email', hall.email ?? '—'),
          _InfoRow('Phone', hall.phone ?? '—'),
          _InfoRow('Owner', hall.ownerName ?? '—'),
          _InfoRow(
            'Account Status',
            detail.accountStatus ?? 'unknown',
            valueWidget: StatusBadge(detail.accountStatus ?? 'unknown'),
          ),
          if (detail.accountStatusReason != null)
            _InfoRow('Status Reason', detail.accountStatusReason!),
          _InfoRow('Hall Balance', '${hall.balance ?? 0} pts'),
          _InfoRow(
            'Available Credits',
            '${detail.availableCredits ?? 0} pts',
          ),
          _InfoRow(
            'Reserved Credits',
            '${detail.reservedCredits ?? 0} pts',
          ),
          _InfoRow(
            'Created',
            DateFormat('MMM d, yyyy HH:mm').format(hall.createdAt),
          ),
        ],
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  const _InfoRow(this.label, this.value, {this.valueWidget});

  final String label;
  final String value;
  final Widget? valueWidget;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          SizedBox(
            width: 180,
            child: Text(
              label,
              style: TextStyle(
                color: colorTheme(context).onSurfaceVariant,
                fontWeight: FontWeight.w500,
                fontSize: 14,
              ),
            ),
          ),
          valueWidget ?? Text(value, style: const TextStyle(fontSize: 14)),
        ],
      ),
    );
  }
}

class _BillingTab extends StatelessWidget {
  const _BillingTab({required this.detail, required this.transactions});

  final HallDetailEntity detail;
  final List<HallCreditTransactionEntity> transactions;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              _CreditChip(
                label: 'Available',
                value: '${detail.availableCredits ?? 0}',
                color: const Color(0xFF059669),
              ),
              const SizedBox(width: 12),
              _CreditChip(
                label: 'Reserved',
                value: '${detail.reservedCredits ?? 0}',
                color: const Color(0xFFD97706),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Text(
            'Transaction History',
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 16,
              color: colorTheme(context).onSurface,
            ),
          ),
          const SizedBox(height: 12),
          if (transactions.isEmpty)
            const Text('No transactions yet.')
          else
            Card(
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
                side: BorderSide(
                  color: colorTheme(context).outlineVariant.withValues(alpha: 0.3),
                ),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: DataTable(
                  columns: const <DataColumn>[
                    DataColumn(label: Text('Type')),
                    DataColumn(label: Text('Amount')),
                    DataColumn(label: Text('Balance After')),
                    DataColumn(label: Text('By')),
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
                            DataCell(Text('${t.balanceAfter}')),
                            DataCell(Text(t.performedByName ?? 'System')),
                            DataCell(
                              Text(
                                DateFormat('MMM d, HH:mm').format(t.createdAt),
                              ),
                            ),
                          ],
                        ),
                      )
                      .toList(),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _CreditChip extends StatelessWidget {
  const _CreditChip({
    required this.label,
    required this.value,
    required this.color,
  });

  final String label;
  final String value;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(label, style: TextStyle(fontSize: 12, color: color)),
          Text(
            '$value pts',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}

class _ActionsTab extends StatelessWidget {
  const _ActionsTab({required this.detail});

  final HallDetailEntity detail;

  @override
  Widget build(BuildContext context) {
    final String? currentStatus = detail.accountStatus;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Account Actions',
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 16,
              color: colorTheme(context).onSurface,
            ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: <Widget>[
              if (currentStatus != 'suspended')
                _ActionButton(
                  label: 'Suspend Hall',
                  icon: Icons.block_outlined,
                  color: colorTheme(context).error,
                  onTap: () => _showStatusDialog(context, 'suspend'),
                ),
              if (currentStatus != 'frozen')
                _ActionButton(
                  label: 'Freeze Hall',
                  icon: Icons.ac_unit_outlined,
                  color: const Color(0xFF0891B2),
                  onTap: () => _showStatusDialog(context, 'freeze'),
                ),
              if (currentStatus != 'active')
                _ActionButton(
                  label: 'Reactivate Hall',
                  icon: Icons.check_circle_outline,
                  color: const Color(0xFF059669),
                  onTap: () => context.read<HallDetailBloc>().add(
                    const HallDetailStatusChangeRequested(action: 'reactivate'),
                  ),
                ),
              _ActionButton(
                label: 'Recharge Credits',
                icon: Icons.add_card_outlined,
                color: const Color(0xFF7C3AED),
                onTap: () => _showRechargeDialog(context),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _showStatusDialog(BuildContext context, String action) async {
    final TextEditingController reasonController = TextEditingController();
    final bool? confirmed = await showDialog<bool>(
      context: context,
      builder: (BuildContext ctx) => AlertDialog(
        title: Text('${action[0].toUpperCase()}${action.substring(1)} Hall'),
        content: TextField(
          controller: reasonController,
          decoration: const InputDecoration(
            labelText: 'Reason (optional)',
            border: OutlineInputBorder(),
          ),
          maxLines: 2,
        ),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Confirm'),
          ),
        ],
      ),
    );
    if (confirmed == true && context.mounted) {
      context.read<HallDetailBloc>().add(
        HallDetailStatusChangeRequested(
          action: action,
          reason: reasonController.text.trim().isEmpty
              ? null
              : reasonController.text.trim(),
        ),
      );
    }
  }

  Future<void> _showRechargeDialog(BuildContext context) async {
    final TextEditingController amountController = TextEditingController();
    final bool? confirmed = await showDialog<bool>(
      context: context,
      builder: (BuildContext ctx) => AlertDialog(
        title: const Text('Recharge Credits'),
        content: TextField(
          controller: amountController,
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
            child: const Text('Recharge'),
          ),
        ],
      ),
    );
    if (confirmed == true && context.mounted) {
      final int? amount = int.tryParse(amountController.text.trim());
      if (amount != null && amount > 0) {
        context.read<HallDetailBloc>().add(HallDetailRechargeRequested(amount));
      }
    }
  }
}

class _ActionButton extends StatelessWidget {
  const _ActionButton({
    required this.label,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  final String label;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return OutlinedButton.icon(
      onPressed: onTap,
      icon: Icon(icon, color: color, size: 18),
      label: Text(label, style: TextStyle(color: color)),
      style: OutlinedButton.styleFrom(
        side: BorderSide(color: color.withValues(alpha: 0.5)),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }
}
