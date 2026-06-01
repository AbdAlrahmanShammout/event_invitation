// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'get_invitations_response_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

GetInvitationsResponseModel _$GetInvitationsResponseModelFromJson(
  Map<String, dynamic> json,
) => GetInvitationsResponseModel(
  invitations: (json['invitations'] as List<dynamic>)
      .map((e) => InvitationModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  total: (json['total'] as num).toInt(),
);

Map<String, dynamic> _$GetInvitationsResponseModelToJson(
  GetInvitationsResponseModel instance,
) => <String, dynamic>{
  'invitations': instance.invitations,
  'total': instance.total,
};
