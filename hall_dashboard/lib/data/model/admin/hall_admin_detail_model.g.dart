// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hall_admin_detail_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HallAdminDetailModel _$HallAdminDetailModelFromJson(
  Map<String, dynamic> json,
) => HallAdminDetailModel(
  hall: HallModel.fromJson(json['hall'] as Map<String, dynamic>),
  accountState: json['accountState'] == null
      ? null
      : HallAccountStateModel.fromJson(
          json['accountState'] as Map<String, dynamic>,
        ),
  creditBalance: json['creditBalance'] == null
      ? null
      : HallCreditBalanceModel.fromJson(
          json['creditBalance'] as Map<String, dynamic>,
        ),
);

Map<String, dynamic> _$HallAdminDetailModelToJson(
  HallAdminDetailModel instance,
) => <String, dynamic>{
  'hall': instance.hall,
  'accountState': instance.accountState,
  'creditBalance': instance.creditBalance,
};
