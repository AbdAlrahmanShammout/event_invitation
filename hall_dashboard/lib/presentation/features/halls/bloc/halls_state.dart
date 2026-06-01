import 'package:hall_dashboard/domain/entities/admin/hall_entity.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';

class HallsState {
  const HallsState({
    required this.status,
    this.halls = const [],
    this.total = 0,
    this.filterStatus,
    this.filterSearch,
    this.error,
  });

  const HallsState.initial()
    : status = LoadStatus.initial,
      halls = const [],
      total = 0,
      filterStatus = null,
      filterSearch = null,
      error = null;

  final LoadStatus status;
  final List<HallEntity> halls;
  final int total;
  final String? filterStatus;
  final String? filterSearch;
  final String? error;

  HallsState copyWith({
    LoadStatus? status,
    List<HallEntity>? halls,
    int? total,
    String? filterStatus,
    String? filterSearch,
    String? error,
  }) => HallsState(
    status: status ?? this.status,
    halls: halls ?? this.halls,
    total: total ?? this.total,
    filterStatus: filterStatus ?? this.filterStatus,
    filterSearch: filterSearch ?? this.filterSearch,
    error: error,
  );
}
