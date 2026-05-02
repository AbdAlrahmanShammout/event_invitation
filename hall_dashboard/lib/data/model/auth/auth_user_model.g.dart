// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_user_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AuthUserModel _$AuthUserModelFromJson(Map<String, dynamic> json) =>
    AuthUserModel(
      id: (json['id'] as num).toInt(),
      name: json['name'] as String,
      email: json['email'] as String,
      role: json['role'] as String,
      hallId: (json['hallId'] as num?)?.toInt(),
      lastLoginAt: json['lastLoginAt'] == null
          ? null
          : DateTime.parse(json['lastLoginAt'] as String),
    );

Map<String, dynamic> _$AuthUserModelToJson(AuthUserModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'email': instance.email,
      'role': instance.role,
      'hallId': instance.hallId,
      'lastLoginAt': instance.lastLoginAt?.toIso8601String(),
    };
