// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'get_users_response_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

GetUsersResponseModel _$GetUsersResponseModelFromJson(
  Map<String, dynamic> json,
) => GetUsersResponseModel(
  users: (json['users'] as List<dynamic>)
      .map((e) => UserAdminModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  total: (json['total'] as num).toInt(),
);

Map<String, dynamic> _$GetUsersResponseModelToJson(
  GetUsersResponseModel instance,
) => <String, dynamic>{'users': instance.users, 'total': instance.total};
