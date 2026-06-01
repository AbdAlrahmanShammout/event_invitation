import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/domain/entities/admin/user_admin_entity.dart';
import 'package:hall_dashboard/presentation/core/widgets/empty_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/error_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/status_badge.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:hall_dashboard/presentation/features/users/bloc/users_bloc.dart';
import 'package:hall_dashboard/presentation/features/users/bloc/users_event.dart';
import 'package:hall_dashboard/presentation/features/users/bloc/users_state.dart';
import 'package:intl/intl.dart';

class UsersPage extends StatefulWidget {
  const UsersPage({super.key});

  @override
  State<UsersPage> createState() => _UsersPageState();
}

class _UsersPageState extends State<UsersPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabController;
  final TextEditingController _searchController = TextEditingController();

  static const List<String?> _tabRoles = <String?>[
    null,
    'hall_admin',
    null,
  ];
  static const List<String> _tabLabels = <String>[
    'All Users',
    'Hall Managers',
    'Suspended',
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
    context.read<UsersBloc>().add(
      UsersLoadRequested(role: _tabRoles[_tabController.index]),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        _buildToolbar(context),
        TabBar(
          controller: _tabController,
          tabs: _tabLabels.map((String l) => Tab(text: l)).toList(),
        ),
        Expanded(
          child: BlocBuilder<UsersBloc, UsersState>(
            builder: (BuildContext ctx, UsersState state) {
              return switch (state.status) {
                LoadStatus.loading || LoadStatus.initial => const Center(
                  child: CircularProgressIndicator(),
                ),
                LoadStatus.error => ErrorState(
                  message: state.error ?? 'Failed.',
                  onRetry: () => ctx.read<UsersBloc>().add(
                    const UsersLoadRequested(),
                  ),
                ),
                LoadStatus.loaded => state.users.isEmpty
                    ? const EmptyState(message: 'No users found.')
                    : _buildTable(ctx, state.users),
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
                  hintText: 'Search users…',
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
                onSubmitted: (_) => _search(context),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTable(BuildContext context, List<UserAdminEntity> users) {
    final List<UserAdminEntity> filtered = _tabController.index == 2
        ? users.where((u) => u.status == 'suspended').toList()
        : users;

    if (filtered.isEmpty) return const EmptyState(message: 'No users found.');

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
              DataColumn(label: Text('Name')),
              DataColumn(label: Text('Email')),
              DataColumn(label: Text('Phone')),
              DataColumn(label: Text('Hall')),
              DataColumn(label: Text('Role')),
              DataColumn(label: Text('Status')),
              DataColumn(label: Text('Last Login')),
            ],
            rows: filtered
                .map(
                  (UserAdminEntity user) => DataRow(
                    cells: <DataCell>[
                      DataCell(
                        Text(
                          user.name,
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                      ),
                      DataCell(Text(user.email)),
                      DataCell(Text(user.phone ?? '—')),
                      DataCell(Text(user.hallName ?? '—')),
                      DataCell(StatusBadge(user.role)),
                      DataCell(StatusBadge(user.status ?? 'active')),
                      DataCell(
                        Text(
                          user.lastLoginAt != null
                              ? DateFormat('MMM d, yyyy').format(
                                  user.lastLoginAt!,
                                )
                              : 'Never',
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

  void _search(BuildContext context) {
    context.read<UsersBloc>().add(
      UsersLoadRequested(
        role: _tabRoles[_tabController.index],
        search: _searchController.text.trim().isEmpty
            ? null
            : _searchController.text.trim(),
      ),
    );
  }
}
