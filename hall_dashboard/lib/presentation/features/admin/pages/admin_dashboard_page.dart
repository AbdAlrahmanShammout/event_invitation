import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/di/injection.dart';
import 'package:hall_dashboard/presentation/core/widgets/admin_scaffold.dart';
import 'package:hall_dashboard/presentation/features/contacts/bloc/contacts_bloc.dart';
import 'package:hall_dashboard/presentation/features/contacts/pages/contacts_page.dart';
import 'package:hall_dashboard/presentation/features/halls/bloc/halls_bloc.dart';
import 'package:hall_dashboard/presentation/features/halls/bloc/halls_event.dart';
import 'package:hall_dashboard/presentation/features/halls/pages/halls_page.dart';
import 'package:hall_dashboard/presentation/features/invitations/bloc/invitations_bloc.dart';
import 'package:hall_dashboard/presentation/features/invitations/bloc/invitations_event.dart';
import 'package:hall_dashboard/presentation/features/invitations/pages/invitations_page.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_bloc.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_event.dart';
import 'package:hall_dashboard/presentation/features/overview/pages/overview_page.dart';
import 'package:hall_dashboard/presentation/features/points/bloc/points_bloc.dart';
import 'package:hall_dashboard/presentation/features/points/bloc/points_event.dart';
import 'package:hall_dashboard/presentation/features/points/pages/points_page.dart';
import 'package:hall_dashboard/presentation/features/users/bloc/users_bloc.dart';
import 'package:hall_dashboard/presentation/features/users/bloc/users_event.dart';
import 'package:hall_dashboard/presentation/features/users/pages/users_page.dart';

/// Root page of the Super Admin dashboard.
/// Manages the left-drawer navigation and renders each tab in an IndexedStack.
class AdminDashboardPage extends StatefulWidget {
  const AdminDashboardPage({super.key});

  static const String routeName = '/admin/dashboard';

  @override
  State<AdminDashboardPage> createState() => _AdminDashboardPageState();
}

class _AdminDashboardPageState extends State<AdminDashboardPage> {
  int _selectedIndex = 0;

  static const List<AdminDestination> _destinations = <AdminDestination>[
    AdminDestination(
      icon: Icons.dashboard_outlined,
      selectedIcon: Icons.dashboard,
      label: 'Overview',
    ),
    AdminDestination(
      icon: Icons.business_outlined,
      selectedIcon: Icons.business,
      label: 'Halls',
    ),
    AdminDestination(
      icon: Icons.mail_outline,
      selectedIcon: Icons.mail,
      label: 'Invitations',
    ),
    AdminDestination(
      icon: Icons.contacts_outlined,
      selectedIcon: Icons.contacts,
      label: 'Numbers',
    ),
    AdminDestination(
      icon: Icons.group_outlined,
      selectedIcon: Icons.group,
      label: 'Users',
    ),
    AdminDestination(
      icon: Icons.monetization_on_outlined,
      selectedIcon: Icons.monetization_on,
      label: 'Points',
    ),
  ];

  static const List<String> _titles = <String>[
    'Overview',
    'Halls',
    'Invitations',
    'Numbers & Contacts',
    'Users',
    'Points & Transactions',
  ];

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: <BlocProvider<dynamic>>[
        BlocProvider<OverviewBloc>(
          create: (_) => getIt<OverviewBloc>()
            ..add(const OverviewLoadRequested()),
        ),
        BlocProvider<HallsBloc>(
          create: (_) => getIt<HallsBloc>()
            ..add(const HallsLoadRequested()),
        ),
        BlocProvider<InvitationsBloc>(
          create: (_) => getIt<InvitationsBloc>()
            ..add(const InvitationsLoadRequested()),
        ),
        BlocProvider<ContactsBloc>(
          create: (_) => getIt<ContactsBloc>(),
        ),
        BlocProvider<UsersBloc>(
          create: (_) => getIt<UsersBloc>()
            ..add(const UsersLoadRequested()),
        ),
        BlocProvider<PointsBloc>(
          create: (_) => getIt<PointsBloc>()
            ..add(const PointsLoadRequested()),
        ),
      ],
      child: AdminScaffold(
        selectedIndex: _selectedIndex,
        destinations: _destinations,
        title: _titles[_selectedIndex],
        onDestinationSelected: _onDestinationSelected,
        body: IndexedStack(
          index: _selectedIndex,
          children: const <Widget>[
            RepaintBoundary(child: OverviewPage()),
            RepaintBoundary(child: HallsPage()),
            RepaintBoundary(child: InvitationsPage()),
            RepaintBoundary(child: ContactsPage()),
            RepaintBoundary(child: UsersPage()),
            RepaintBoundary(child: PointsPage()),
          ],
        ),
      ),
    );
  }

  void _onDestinationSelected(int index) {
    setState(() => _selectedIndex = index);
  }
}
