import 'package:hall_dashboard/domain/entities/admin/hall_credit_transaction_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_entity.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';

class PointsState {
  const PointsState({
    required this.hallsStatus,
    required this.transactionsStatus,
    this.halls = const [],
    this.transactions = const [],
    this.selectedHallId,
    this.error,
  });

  const PointsState.initial()
    : hallsStatus = LoadStatus.initial,
      transactionsStatus = LoadStatus.initial,
      halls = const [],
      transactions = const [],
      selectedHallId = null,
      error = null;

  final LoadStatus hallsStatus;
  final LoadStatus transactionsStatus;
  final List<HallEntity> halls;
  final List<HallCreditTransactionEntity> transactions;
  final int? selectedHallId;
  final String? error;

  PointsState copyWith({
    LoadStatus? hallsStatus,
    LoadStatus? transactionsStatus,
    List<HallEntity>? halls,
    List<HallCreditTransactionEntity>? transactions,
    int? selectedHallId,
    String? error,
  }) => PointsState(
    hallsStatus: hallsStatus ?? this.hallsStatus,
    transactionsStatus: transactionsStatus ?? this.transactionsStatus,
    halls: halls ?? this.halls,
    transactions: transactions ?? this.transactions,
    selectedHallId: selectedHallId ?? this.selectedHallId,
    error: error,
  );
}
