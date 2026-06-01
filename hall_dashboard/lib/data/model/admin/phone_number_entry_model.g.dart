// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'phone_number_entry_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PhoneNumberEntryModel _$PhoneNumberEntryModelFromJson(
  Map<String, dynamic> json,
) => PhoneNumberEntryModel(
  phoneNumber: json['phoneNumber'] as String,
  source: json['source'] as String?,
  associatedName: json['associatedName'] as String?,
  hallId: (json['hallId'] as num?)?.toInt(),
  hallName: json['hallName'] as String?,
  invitationId: (json['invitationId'] as num?)?.toInt(),
  invitationTitle: json['invitationTitle'] as String?,
  messageStatus: json['messageStatus'] as String?,
  lastMessageDate: json['lastMessageDate'] == null
      ? null
      : DateTime.parse(json['lastMessageDate'] as String),
);

Map<String, dynamic> _$PhoneNumberEntryModelToJson(
  PhoneNumberEntryModel instance,
) => <String, dynamic>{
  'phoneNumber': instance.phoneNumber,
  'source': instance.source,
  'associatedName': instance.associatedName,
  'hallId': instance.hallId,
  'hallName': instance.hallName,
  'invitationId': instance.invitationId,
  'invitationTitle': instance.invitationTitle,
  'messageStatus': instance.messageStatus,
  'lastMessageDate': instance.lastMessageDate?.toIso8601String(),
};
