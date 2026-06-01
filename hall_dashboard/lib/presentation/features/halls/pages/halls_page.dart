import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/di/injection.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_entity.dart';
import 'package:hall_dashboard/presentation/core/widgets/empty_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/error_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/status_badge.dart';
import 'package:hall_dashboard/presentation/features/hall_detail/bloc/hall_detail_bloc.dart';
import 'package:hall_dashboard/presentation/features/hall_detail/bloc/hall_detail_event.dart';
import 'package:hall_dashboard/presentation/features/hall_detail/pages/hall_detail_page.dart';
import 'package:hall_dashboard/presentation/features/halls/bloc/halls_bloc.dart';
import 'package:hall_dashboard/presentation/features/halls/bloc/halls_event.dart';
import 'package:hall_dashboard/presentation/features/halls/bloc/halls_state.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:intl/intl.dart';

class HallsPage extends StatefulWidget {
  const HallsPage({super.key});

  @override
  State<HallsPage> createState() => _HallsPageState();
}

class _HallsPageState extends State<HallsPage> {
  final TextEditingController _searchController = TextEditingController();
  String? _selectedStatus;

  static const List<String?> _statusOptions = <String?>[
    null,
    'active',
    'frozen',
    'suspended',
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HallsBloc, HallsState>(
      builder: (BuildContext ctx, HallsState state) {
        return Column(
          children: <Widget>[
            _buildFilterBar(ctx),
            Expanded(child: _buildContent(ctx, state)),
          ],
        );
      },
    );
  }

  Widget _buildFilterBar(BuildContext context) {
    return Container(
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
          Expanded(
            flex: 3,
            child: SizedBox(
              height: 40,
              child: TextField(
                controller: _searchController,
                decoration: InputDecoration(
                  hintText: 'Search halls…',
                  prefixIcon: const Icon(Icons.search, size: 18),
                  contentPadding: const EdgeInsets.symmetric(vertical: 0),
                  filled: true,
                  fillColor: colorTheme(
                    context,
                  ).surfaceContainerHighest.withValues(alpha: 0.5),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide.none,
                  ),
                ),
                onSubmitted: (_) => _applyFilters(context),
              ),
            ),
          ),
          const SizedBox(width: 12),
          DropdownButtonHideUnderline(
            child: DropdownButton<String?>(
              value: _selectedStatus,
              hint: const Text('All Statuses'),
              items: _statusOptions.map((String? s) {
                return DropdownMenuItem<String?>(
                  value: s,
                  child: Text(s?.toUpperCase() ?? 'ALL'),
                );
              }).toList(),
              onChanged: (String? value) {
                setState(() => _selectedStatus = value);
                _applyFilters(context);
              },
            ),
          ),
          const SizedBox(width: 12),
          FilledButton.tonal(
            onPressed: () => _applyFilters(context),
            child: const Text('Search'),
          ),
        ],
      ),
    );
  }

  Widget _buildContent(BuildContext context, HallsState state) {
    return switch (state.status) {
      LoadStatus.loading || LoadStatus.initial => const Center(
        child: CircularProgressIndicator(),
      ),
      LoadStatus.error => ErrorState(
        message: state.error ?? 'Failed to load halls.',
        onRetry: () => context.read<HallsBloc>().add(
          const HallsRefreshRequested(),
        ),
      ),
      LoadStatus.loaded => state.halls.isEmpty
          ? const EmptyState(message: 'No halls found.')
          : _buildTable(context, state.halls),
    };
  }

  Widget _buildTable(BuildContext context, List<HallEntity> halls) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Card(
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
                  DataColumn(label: Text('Hall Name')),
                  DataColumn(label: Text('Owner')),
                  DataColumn(label: Text('Status')),
                  DataColumn(label: Text('Balance')),
                  DataColumn(label: Text('Created')),
                  DataColumn(label: Text('Actions')),
                ],
                rows: halls.map((HallEntity hall) => _buildRow(context, hall)).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  DataRow _buildRow(BuildContext context, HallEntity hall) {
    return DataRow(
      cells: <DataCell>[
        DataCell(
          Text(
            hall.name,
            style: const TextStyle(fontWeight: FontWeight.w600),
          ),
        ),
        DataCell(Text(hall.ownerName ?? '—')),
        DataCell(StatusBadge(hall.status ?? 'unknown')),
        DataCell(Text('${hall.balance ?? 0} pts')),
        DataCell(
          Text(
            DateFormat('MMM d, yyyy').format(hall.createdAt),
          ),
        ),
        DataCell(
          Row(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              IconButton(
                icon: const Icon(Icons.visibility_outlined, size: 18),
                tooltip: 'View Details',
                onPressed: () => _openHallDetail(context, hall.id),
              ),
            ],
          ),
        ),
      ],
    );
  }

  void _applyFilters(BuildContext context) {
    context.read<HallsBloc>().add(
      HallsLoadRequested(
        status: _selectedStatus,
        search: _searchController.text.trim().isEmpty
            ? null
            : _searchController.text.trim(),
      ),
    );
  }

  void _openHallDetail(BuildContext context, int hallId) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => BlocProvider<HallDetailBloc>(
          create: (_) => getIt<HallDetailBloc>()
            ..add(HallDetailLoadRequested(hallId)),
          child: const HallDetailPage(),
        ),
      ),
    );
  }
}
