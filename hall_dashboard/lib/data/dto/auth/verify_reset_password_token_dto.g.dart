// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'verify_reset_password_token_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

VerifyResetPasswordTokenDto _$VerifyResetPasswordTokenDtoFromJson(
  Map<String, dynamic> json,
) => VerifyResetPasswordTokenDto(
  token: json['token'] as String,
  userId: (json['userId'] as num).toInt(),
);

Map<String, dynamic> _$VerifyResetPasswordTokenDtoToJson(
  VerifyResetPasswordTokenDto instance,
) => <String, dynamic>{'token': instance.token, 'userId': instance.userId};
