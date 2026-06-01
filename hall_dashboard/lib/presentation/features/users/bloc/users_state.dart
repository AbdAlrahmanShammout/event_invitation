import 'package:hall_dashboard/domain/entities/admin/user_admin_entity.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';

class UsersState {
  const UsersState({
    required this.status,
    this.users = const [],
    this.total = 0,
    this.filterRole,
    this.filterSearch,
    this.error,
  });

  const UsersState.initial()
    : status = LoadStatus.initial,
      users = const [],
      total = 0,
      filterRole = null,
      filterSearch = null,
      error = null;

  final LoadStatus status;
  final List<UserAdminEntity> users;
  final int total;
  final String? filterRole;
  final String? filterSearch;
  final String? error;

  UsersState copyWith({
    LoadStatus? status,
    List<UserAdminEntity>? users,
    int? total,
    String? filterRole,
    String? filterSearch,
    String? error,
  }) => UsersState(
    status: status ?? this.status,
    users: users ?? this.users,
    total: total ?? this.total,
    filterRole: filterRole ?? this.filterRole,
    filterSearch: filterSearch ?? this.filterSearch,
    error: error,
  );
}
