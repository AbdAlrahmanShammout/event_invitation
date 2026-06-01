// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hall_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HallModel _$HallModelFromJson(Map<String, dynamic> json) => HallModel(
  id: (json['id'] as num).toInt(),
  name: json['name'] as String,
  createdAt: DateTime.parse(json['createdAt'] as String),
  description: json['description'] as String?,
  address: json['address'] as String?,
  email: json['email'] as String?,
  phone: json['phone'] as String?,
  status: json['status'] as String?,
  ownerId: (json['ownerId'] as num?)?.toInt(),
  balance: (json['balance'] as num?)?.toInt(),
  updatedAt: json['updatedAt'] == null
      ? null
      : DateTime.parse(json['updatedAt'] as String),
  owner: json['owner'] == null
      ? null
      : HallOwnerModel.fromJson(json['owner'] as Map<String, dynamic>),
);

Map<String, dynamic> _$HallModelToJson(HallModel instance) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'description': instance.description,
  'address': instance.address,
  'email': instance.email,
  'phone': instance.phone,
  'status': instance.status,
  'ownerId': instance.ownerId,
  'balance': instance.balance,
  'createdAt': instance.createdAt.toIso8601String(),
  'updatedAt': instance.updatedAt?.toIso8601String(),
  'owner': instance.owner,
};

HallOwnerModel _$HallOwnerModelFromJson(Map<String, dynamic> json) =>
    HallOwnerModel(
      id: (json['id'] as num).toInt(),
      name: json['name'] as String,
      email: json['email'] as String?,
    );

Map<String, dynamic> _$HallOwnerModelToJson(HallOwnerModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'email': instance.email,
    };
