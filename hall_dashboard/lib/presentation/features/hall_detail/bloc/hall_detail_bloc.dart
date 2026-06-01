import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/domain/usecase/admin/change_hall_status_use_case.dart';
import 'package:hall_dashboard/domain/usecase/admin/get_credit_transactions_use_case.dart';
import 'package:hall_dashboard/domain/usecase/admin/get_hall_detail_use_case.dart';
import 'package:hall_dashboard/domain/usecase/admin/recharge_hall_use_case.dart';
import 'package:hall_dashboard/presentation/features/hall_detail/bloc/hall_detail_event.dart';
import 'package:hall_dashboard/presentation/features/hall_detail/bloc/hall_detail_state.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:injectable/injectable.dart';

@injectable
class HallDetailBloc extends Bloc<HallDetailEvent, HallDetailState> {
  HallDetailBloc(
    this._getHallDetailUseCase,
    this._changeHallStatusUseCase,
    this._rechargeHallUseCase,
    this._getCreditTransactionsUseCase,
  ) : super(const HallDetailState.initial()) {
    on<HallDetailLoadRequested>(_handleLoadRequested);
    on<HallDetailStatusChangeRequested>(_handleStatusChange);
    on<HallDetailRechargeRequested>(_handleRecharge);
  }

  final GetHallDetailUseCase _getHallDetailUseCase;
  final ChangeHallStatusUseCase _changeHallStatusUseCase;
  final RechargeHallUseCase _rechargeHallUseCase;
  final GetCreditTransactionsUseCase _getCreditTransactionsUseCase;

  int? _currentHallId;

  Future<void> _handleLoadRequested(
    HallDetailLoadRequested event,
    Emitter<HallDetailState> emit,
  ) async {
    _currentHallId = event.hallId;
    emit(state.copyWith(status: LoadStatus.loading));
    try {
      final detail = await _getHallDetailUseCase.execute(event.hallId);
      final transactions = await _getCreditTransactionsUseCase.execute(
        hallId: event.hallId,
      );
      emit(state.copyWith(
        status: LoadStatus.loaded,
        detail: detail,
        transactions: transactions,
      ));
    } catch (err) {
      emit(state.copyWith(
        status: LoadStatus.error,
        error: 'Failed to load hall details.',
      ));
    }
  }

  Future<void> _handleStatusChange(
    HallDetailStatusChangeRequested event,
    Emitter<HallDetailState> emit,
  ) async {
    if (_currentHallId == null) return;
    emit(state.copyWith(actionStatus: LoadStatus.loading));
    try {
      final action = switch (event.action) {
        'suspend' => HallStatusAction.suspend,
        'freeze' => HallStatusAction.freeze,
        _ => HallStatusAction.reactivate,
      };
      await _changeHallStatusUseCase.execute(
        hallId: _currentHallId!,
        action: action,
        reason: event.reason,
      );
      add(HallDetailLoadRequested(_currentHallId!));
    } catch (err) {
      emit(state.copyWith(
        actionStatus: LoadStatus.error,
        actionError: 'Failed to change hall status.',
      ));
    }
  }

  Future<void> _handleRecharge(
    HallDetailRechargeRequested event,
    Emitter<HallDetailState> emit,
  ) async {
    if (_currentHallId == null) return;
    emit(state.copyWith(actionStatus: LoadStatus.loading));
    try {
      await _rechargeHallUseCase.execute(
        hallId: _currentHallId!,
        amount: event.amount,
      );
      add(HallDetailLoadRequested(_currentHallId!));
    } catch (err) {
      emit(state.copyWith(
        actionStatus: LoadStatus.error,
        actionError: 'Failed to recharge hall.',
      ));
    }
  }
}
