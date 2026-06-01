import 'package:hall_dashboard/domain/entities/admin/hall_credit_transaction_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_detail_entity.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';

class HallDetailState {
  const HallDetailState({
    required this.status,
    this.detail,
    this.transactions = const [],
    this.actionStatus = LoadStatus.initial,
    this.error,
    this.actionError,
  });

  const HallDetailState.initial()
    : status = LoadStatus.initial,
      detail = null,
      transactions = const [],
      actionStatus = LoadStatus.initial,
      error = null,
      actionError = null;

  final LoadStatus status;
  final HallDetailEntity? detail;
  final List<HallCreditTransactionEntity> transactions;
  final LoadStatus actionStatus;
  final String? error;
  final String? actionError;

  HallDetailState copyWith({
    LoadStatus? status,
    HallDetailEntity? detail,
    List<HallCreditTransactionEntity>? transactions,
    LoadStatus? actionStatus,
    String? error,
    String? actionError,
  }) => HallDetailState(
    status: status ?? this.status,
    detail: detail ?? this.detail,
    transactions: transactions ?? this.transactions,
    actionStatus: actionStatus ?? this.actionStatus,
    error: error,
    actionError: actionError,
  );
}
