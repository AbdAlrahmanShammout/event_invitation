import 'package:hall_dashboard/domain/entities/admin/invitation_entity.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';

class InvitationsState {
  const InvitationsState({
    required this.status,
    this.invitations = const [],
    this.total = 0,
    this.filterStatus,
    this.filterHallId,
    this.filterSearch,
    this.error,
  });

  const InvitationsState.initial()
    : status = LoadStatus.initial,
      invitations = const [],
      total = 0,
      filterStatus = null,
      filterHallId = null,
      filterSearch = null,
      error = null;

  final LoadStatus status;
  final List<InvitationEntity> invitations;
  final int total;
  final String? filterStatus;
  final int? filterHallId;
  final String? filterSearch;
  final String? error;

  InvitationsState copyWith({
    LoadStatus? status,
    List<InvitationEntity>? invitations,
    int? total,
    String? filterStatus,
    int? filterHallId,
    String? filterSearch,
    String? error,
  }) => InvitationsState(
    status: status ?? this.status,
    invitations: invitations ?? this.invitations,
    total: total ?? this.total,
    filterStatus: filterStatus ?? this.filterStatus,
    filterHallId: filterHallId ?? this.filterHallId,
    filterSearch: filterSearch ?? this.filterSearch,
    error: error,
  );
}
