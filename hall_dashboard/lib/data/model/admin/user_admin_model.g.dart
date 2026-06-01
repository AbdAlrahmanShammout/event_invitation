// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_admin_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserAdminModel _$UserAdminModelFromJson(Map<String, dynamic> json) =>
    UserAdminModel(
      id: (json['id'] as num).toInt(),
      name: json['name'] as String,
      email: json['email'] as String,
      role: json['role'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
      phone: json['phone'] as String?,
      hallId: (json['hallId'] as num?)?.toInt(),
      hallName: json['hallName'] as String?,
      status: json['status'] as String?,
      lastLoginAt: json['lastLoginAt'] == null
          ? null
          : DateTime.parse(json['lastLoginAt'] as String),
      updatedAt: json['updatedAt'] == null
          ? null
          : DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$UserAdminModelToJson(UserAdminModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'email': instance.email,
      'phone': instance.phone,
      'hallId': instance.hallId,
      'hallName': instance.hallName,
      'role': instance.role,
      'status': instance.status,
      'lastLoginAt': instance.lastLoginAt?.toIso8601String(),
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
    };
