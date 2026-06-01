import 'package:hall_dashboard/data/model/admin/hall_credit_transaction_model.dart';

class HallCreditTransactionEntity {
  const HallCreditTransactionEntity({
    required this.id,
    required this.type,
    required this.amount,
    required this.balanceAfter,
    required this.createdAt,
    this.reference,
    this.performedByName,
  });

  factory HallCreditTransactionEntity.fromModel(
    HallCreditTransactionModel model,
  ) => HallCreditTransactionEntity(
    id: model.id,
    type: model.type,
    amount: model.amount,
    balanceAfter: model.balanceAfter,
    reference: model.reference,
    createdAt: model.createdAt,
    performedByName: model.performedBy?.name,
  );

  final int id;
  final String type;
  final int amount;
  final int balanceAfter;
  final String? reference;
  final DateTime createdAt;
  final String? performedByName;
}
