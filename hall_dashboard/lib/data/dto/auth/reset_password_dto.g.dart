// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'reset_password_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ResetPasswordDto _$ResetPasswordDtoFromJson(Map<String, dynamic> json) =>
    ResetPasswordDto(
      token: json['token'] as String,
      userId: (json['userId'] as num).toInt(),
      password: json['password'] as String,
    );

Map<String, dynamic> _$ResetPasswordDtoToJson(ResetPasswordDto instance) =>
    <String, dynamic>{
      'token': instance.token,
      'userId': instance.userId,
      'password': instance.password,
    };
