import 'package:hall_dashboard/domain/entities/admin/platform_overview_entity.dart';

enum LoadStatus { initial, loading, loaded, error }

class OverviewState {
  const OverviewState({required this.status, this.overview, this.error});

  const OverviewState.initial()
    : status = LoadStatus.initial,
      overview = null,
      error = null;

  final LoadStatus status;
  final PlatformOverviewEntity? overview;
  final String? error;

  OverviewState copyWith({
    LoadStatus? status,
    PlatformOverviewEntity? overview,
    String? error,
  }) => OverviewState(
    status: status ?? this.status,
    overview: overview ?? this.overview,
    error: error,
  );
}
