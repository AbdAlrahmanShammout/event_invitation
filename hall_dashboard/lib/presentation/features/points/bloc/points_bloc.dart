import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/domain/usecase/admin/get_credit_transactions_use_case.dart';
import 'package:hall_dashboard/domain/usecase/admin/get_halls_use_case.dart';
import 'package:hall_dashboard/domain/usecase/admin/recharge_hall_use_case.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:hall_dashboard/presentation/features/points/bloc/points_event.dart';
import 'package:hall_dashboard/presentation/features/points/bloc/points_state.dart';
import 'package:injectable/injectable.dart';

@injectable
class PointsBloc extends Bloc<PointsEvent, PointsState> {
  PointsBloc(
    this._getHallsUseCase,
    this._getCreditTransactionsUseCase,
    this._rechargeHallUseCase,
  ) : super(const PointsState.initial()) {
    on<PointsLoadRequested>(_handleLoadRequested);
    on<PointsHallSelected>(_handleHallSelected);
    on<PointsRechargeRequested>(_handleRecharge);
  }

  final GetHallsUseCase _getHallsUseCase;
  final GetCreditTransactionsUseCase _getCreditTransactionsUseCase;
  final RechargeHallUseCase _rechargeHallUseCase;

  Future<void> _handleLoadRequested(
    PointsLoadRequested event,
    Emitter<PointsState> emit,
  ) async {
    emit(state.copyWith(hallsStatus: LoadStatus.loading));
    try {
      final result = await _getHallsUseCase.execute(limit: 100);
      emit(state.copyWith(hallsStatus: LoadStatus.loaded, halls: result.halls));
    } catch (err) {
      emit(state.copyWith(
        hallsStatus: LoadStatus.error,
        error: 'Failed to load halls.',
      ));
    }
  }

  Future<void> _handleHallSelected(
    PointsHallSelected event,
    Emitter<PointsState> emit,
  ) async {
    emit(state.copyWith(
      selectedHallId: event.hallId,
      transactionsStatus: LoadStatus.loading,
    ));
    try {
      final transactions = await _getCreditTransactionsUseCase.execute(
        hallId: event.hallId,
      );
      emit(state.copyWith(
        transactionsStatus: LoadStatus.loaded,
        transactions: transactions,
      ));
    } catch (err) {
      emit(state.copyWith(
        transactionsStatus: LoadStatus.error,
        error: 'Failed to load transactions.',
      ));
    }
  }

  Future<void> _handleRecharge(
    PointsRechargeRequested event,
    Emitter<PointsState> emit,
  ) async {
    try {
      await _rechargeHallUseCase.execute(
        hallId: event.hallId,
        amount: event.amount,
      );
      add(PointsHallSelected(event.hallId));
    } catch (err) {
      emit(state.copyWith(error: 'Failed to recharge.'));
    }
  }
}
