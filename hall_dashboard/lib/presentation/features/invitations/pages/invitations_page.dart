import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/domain/entities/admin/invitation_entity.dart';
import 'package:hall_dashboard/presentation/core/widgets/empty_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/error_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/status_badge.dart';
import 'package:hall_dashboard/presentation/features/invitations/bloc/invitations_bloc.dart';
import 'package:hall_dashboard/presentation/features/invitations/bloc/invitations_event.dart';
import 'package:hall_dashboard/presentation/features/invitations/bloc/invitations_state.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:intl/intl.dart';

class InvitationsPage extends StatefulWidget {
  const InvitationsPage({super.key});

  @override
  State<InvitationsPage> createState() => _InvitationsPageState();
}

class _InvitationsPageState extends State<InvitationsPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabController;
  final TextEditingController _searchController = TextEditingController();

  static const List<String?> _tabStatuses = <String?>[
    null,
    'PENDING_APPROVAL',
    'APPROVED',
    'REJECTED',
    'SCHEDULED',
    'COMPLETED',
  ];

  static const List<String> _tabLabels = <String>[
    'All',
    'Pending',
    'Approved',
    'Rejected',
    'Scheduled',
    'Completed',
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _tabLabels.length, vsync: this);
    _tabController.addListener(_onTabChanged);
  }

  @override
  void dispose() {
    _tabController.removeListener(_onTabChanged);
    _tabController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _onTabChanged() {
    if (!_tabController.indexIsChanging) return;
    context.read<InvitationsBloc>().add(
      InvitationsLoadRequested(
        status: _tabStatuses[_tabController.index],
        search: _searchController.text.trim().isEmpty
            ? null
            : _searchController.text.trim(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        _buildToolbar(context),
        TabBar(
          controller: _tabController,
          isScrollable: true,
          tabs: _tabLabels.map((String l) => Tab(text: l)).toList(),
        ),
        Expanded(
          child: BlocBuilder<InvitationsBloc, InvitationsState>(
            builder: (BuildContext ctx, InvitationsState state) {
              return switch (state.status) {
                LoadStatus.loading || LoadStatus.initial => const Center(
                  child: CircularProgressIndicator(),
                ),
                LoadStatus.error => ErrorState(
                  message: state.error ?? 'Failed.',
                  onRetry: () => ctx.read<InvitationsBloc>().add(
                    InvitationsLoadRequested(
                      status: _tabStatuses[_tabController.index],
                    ),
                  ),
                ),
                LoadStatus.loaded => state.invitations.isEmpty
                    ? const EmptyState(message: 'No invitations found.')
                    : _buildTable(ctx, state.invitations),
              };
            },
          ),
        ),
      ],
    );
  }

  Widget _buildToolbar(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: Row(
        children: <Widget>[
          Expanded(
            child: SizedBox(
              height: 40,
              child: TextField(
                controller: _searchController,
                decoration: InputDecoration(
                  hintText: 'Search by name…',
                  prefixIcon: const Icon(Icons.search, size: 18),
                  contentPadding: EdgeInsets.zero,
                  filled: true,
                  fillColor: colorTheme(
                    context,
                  ).surfaceContainerHighest.withValues(alpha: 0.5),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide.none,
                  ),
                ),
                onSubmitted: (_) => _onTabChanged(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTable(BuildContext context, List<InvitationEntity> invitations) {
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
              DataColumn(label: Text('Title')),
              DataColumn(label: Text('Hall')),
              DataColumn(label: Text('Event Date')),
              DataColumn(label: Text('Guests')),
              DataColumn(label: Text('Sent')),
              DataColumn(label: Text('Delivery %')),
              DataColumn(label: Text('Status')),
              DataColumn(label: Text('Created By')),
            ],
            rows: invitations
                .map(
                  (InvitationEntity inv) => DataRow(
                    cells: <DataCell>[
                      DataCell(
                        Text(
                          inv.title,
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                      ),
                      DataCell(Text(inv.hallName ?? '—')),
                      DataCell(
                        Text(
                          inv.eventDate != null
                              ? DateFormat('MMM d, yyyy').format(inv.eventDate!)
                              : '—',
                        ),
                      ),
                      DataCell(Text('${inv.guestCount ?? 0}')),
                      DataCell(Text('${inv.sentMessagesCount ?? 0}')),
                      DataCell(
                        Text(
                          inv.deliveryPercentage != null
                              ? '${inv.deliveryPercentage!.toStringAsFixed(1)}%'
                              : '—',
                        ),
                      ),
                      DataCell(StatusBadge(inv.status)),
                      DataCell(Text(inv.creatorName ?? '—')),
                    ],
                  ),
                )
                .toList(),
          ),
        ),
      ),
    );
  }
}
