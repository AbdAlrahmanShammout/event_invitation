import 'package:json_annotation/json_annotation.dart';

part 'hall_credit_transaction_model.g.dart';

@JsonSerializable()
class HallCreditTransactionModel {
  const HallCreditTransactionModel({
    required this.id,
    required this.type,
    required this.amount,
    required this.balanceAfter,
    required this.createdAt,
    this.reference,
    this.performedBy,
  });

  factory HallCreditTransactionModel.fromJson(Map<String, dynamic> json) =>
      _$HallCreditTransactionModelFromJson(json);

  final int id;
  final String type;
  final int amount;
  final int balanceAfter;
  final String? reference;
  final DateTime createdAt;
  final TransactionActorModel? performedBy;

  Map<String, dynamic> toJson() => _$HallCreditTransactionModelToJson(this);
}

@JsonSerializable()
class TransactionActorModel {
  const TransactionActorModel({required this.id, required this.name});

  factory TransactionActorModel.fromJson(Map<String, dynamic> json) =>
      _$TransactionActorModelFromJson(json);

  final int id;
  final String name;

  Map<String, dynamic> toJson() => _$TransactionActorModelToJson(this);
}
