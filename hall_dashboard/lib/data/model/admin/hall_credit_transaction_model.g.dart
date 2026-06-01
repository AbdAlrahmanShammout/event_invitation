// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hall_credit_transaction_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HallCreditTransactionModel _$HallCreditTransactionModelFromJson(
  Map<String, dynamic> json,
) => HallCreditTransactionModel(
  id: (json['id'] as num).toInt(),
  type: json['type'] as String,
  amount: (json['amount'] as num).toInt(),
  balanceAfter: (json['balanceAfter'] as num).toInt(),
  createdAt: DateTime.parse(json['createdAt'] as String),
  reference: json['reference'] as String?,
  performedBy: json['performedBy'] == null
      ? null
      : TransactionActorModel.fromJson(
          json['performedBy'] as Map<String, dynamic>,
        ),
);

Map<String, dynamic> _$HallCreditTransactionModelToJson(
  HallCreditTransactionModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'type': instance.type,
  'amount': instance.amount,
  'balanceAfter': instance.balanceAfter,
  'reference': instance.reference,
  'createdAt': instance.createdAt.toIso8601String(),
  'performedBy': instance.performedBy,
};

TransactionActorModel _$TransactionActorModelFromJson(
  Map<String, dynamic> json,
) => TransactionActorModel(
  id: (json['id'] as num).toInt(),
  name: json['name'] as String,
);

Map<String, dynamic> _$TransactionActorModelToJson(
  TransactionActorModel instance,
) => <String, dynamic>{'id': instance.id, 'name': instance.name};
