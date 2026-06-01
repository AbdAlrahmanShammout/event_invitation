import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/domain/usecase/admin/get_halls_use_case.dart';
import 'package:hall_dashboard/presentation/features/halls/bloc/halls_event.dart';
import 'package:hall_dashboard/presentation/features/halls/bloc/halls_state.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:injectable/injectable.dart';

@injectable
class HallsBloc extends Bloc<HallsEvent, HallsState> {
  HallsBloc(this._getHallsUseCase) : super(const HallsState.initial()) {
    on<HallsLoadRequested>(_handleLoadRequested);
    on<HallsRefreshRequested>(_handleRefreshRequested);
  }

  final GetHallsUseCase _getHallsUseCase;

  Future<void> _handleLoadRequested(
    HallsLoadRequested event,
    Emitter<HallsState> emit,
  ) async {
    emit(state.copyWith(
      status: LoadStatus.loading,
      filterStatus: event.status,
      filterSearch: event.search,
    ));
    try {
      final result = await _getHallsUseCase.execute(
        status: event.status,
        search: event.search,
      );
      emit(state.copyWith(
        status: LoadStatus.loaded,
        halls: result.halls,
        total: result.total,
      ));
    } catch (err) {
      emit(state.copyWith(
        status: LoadStatus.error,
        error: 'Failed to load halls.',
      ));
    }
  }

  Future<void> _handleRefreshRequested(
    HallsRefreshRequested event,
    Emitter<HallsState> emit,
  ) async {
    add(HallsLoadRequested(
      status: state.filterStatus,
      search: state.filterSearch,
    ));
  }
}
