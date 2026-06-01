// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hall_account_state_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HallAccountStateModel _$HallAccountStateModelFromJson(
  Map<String, dynamic> json,
) => HallAccountStateModel(
  status: json['status'] as String,
  reason: json['reason'] as String?,
  updatedAt: json['updatedAt'] == null
      ? null
      : DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$HallAccountStateModelToJson(
  HallAccountStateModel instance,
) => <String, dynamic>{
  'status': instance.status,
  'reason': instance.reason,
  'updatedAt': instance.updatedAt?.toIso8601String(),
};
