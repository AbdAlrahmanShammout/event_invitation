// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'invitation_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

InvitationModel _$InvitationModelFromJson(Map<String, dynamic> json) =>
    InvitationModel(
      id: (json['id'] as num).toInt(),
      title: json['title'] as String,
      status: json['status'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
      description: json['description'] as String?,
      maxGuestsAllowed: (json['maxGuestsAllowed'] as num?)?.toInt(),
      eventDate: json['eventDate'] == null
          ? null
          : DateTime.parse(json['eventDate'] as String),
      hallId: (json['hallId'] as num?)?.toInt(),
      creatorId: (json['creatorId'] as num?)?.toInt(),
      startSendAt: json['startSendAt'] == null
          ? null
          : DateTime.parse(json['startSendAt'] as String),
      submissionDeadline: json['submissionDeadline'] == null
          ? null
          : DateTime.parse(json['submissionDeadline'] as String),
      updatedAt: json['updatedAt'] == null
          ? null
          : DateTime.parse(json['updatedAt'] as String),
      creator: json['creator'] == null
          ? null
          : InvitationCreatorModel.fromJson(
              json['creator'] as Map<String, dynamic>,
            ),
      hallName: json['hallName'] as String?,
      guestCount: (json['guestCount'] as num?)?.toInt(),
      sentMessagesCount: (json['sentMessagesCount'] as num?)?.toInt(),
      deliveryPercentage: (json['deliveryPercentage'] as num?)?.toDouble(),
    );

Map<String, dynamic> _$InvitationModelToJson(InvitationModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'description': instance.description,
      'maxGuestsAllowed': instance.maxGuestsAllowed,
      'eventDate': instance.eventDate?.toIso8601String(),
      'hallId': instance.hallId,
      'creatorId': instance.creatorId,
      'status': instance.status,
      'startSendAt': instance.startSendAt?.toIso8601String(),
      'submissionDeadline': instance.submissionDeadline?.toIso8601String(),
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
      'creator': instance.creator,
      'hallName': instance.hallName,
      'guestCount': instance.guestCount,
      'sentMessagesCount': instance.sentMessagesCount,
      'deliveryPercentage': instance.deliveryPercentage,
    };

InvitationCreatorModel _$InvitationCreatorModelFromJson(
  Map<String, dynamic> json,
) => InvitationCreatorModel(
  id: (json['id'] as num).toInt(),
  name: json['name'] as String,
);

Map<String, dynamic> _$InvitationCreatorModelToJson(
  InvitationCreatorModel instance,
) => <String, dynamic>{'id': instance.id, 'name': instance.name};
