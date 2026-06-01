// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hall_credit_balance_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HallCreditBalanceModel _$HallCreditBalanceModelFromJson(
  Map<String, dynamic> json,
) => HallCreditBalanceModel(
  availableCredits: (json['availableCredits'] as num).toInt(),
  reservedCredits: (json['reservedCredits'] as num).toInt(),
  updatedAt: json['updatedAt'] == null
      ? null
      : DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$HallCreditBalanceModelToJson(
  HallCreditBalanceModel instance,
) => <String, dynamic>{
  'availableCredits': instance.availableCredits,
  'reservedCredits': instance.reservedCredits,
  'updatedAt': instance.updatedAt?.toIso8601String(),
};
