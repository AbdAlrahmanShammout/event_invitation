import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/domain/usecase/admin/get_overview_use_case.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_event.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:injectable/injectable.dart';

@injectable
class OverviewBloc extends Bloc<OverviewEvent, OverviewState> {
  OverviewBloc(this._getOverviewUseCase) : super(const OverviewState.initial()) {
    on<OverviewLoadRequested>(_handleLoadRequested);
  }

  final GetOverviewUseCase _getOverviewUseCase;

  Future<void> _handleLoadRequested(
    OverviewLoadRequested event,
    Emitter<OverviewState> emit,
  ) async {
    emit(state.copyWith(status: LoadStatus.loading));
    try {
      final overview = await _getOverviewUseCase.execute();
      emit(state.copyWith(status: LoadStatus.loaded, overview: overview));
    } catch (err) {
      emit(state.copyWith(
        status: LoadStatus.error,
        error: 'Failed to load overview.',
      ));
    }
  }
}
