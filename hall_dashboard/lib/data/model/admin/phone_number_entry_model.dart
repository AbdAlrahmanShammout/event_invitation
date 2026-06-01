import 'package:json_annotation/json_annotation.dart';

part 'phone_number_entry_model.g.dart';

@JsonSerializable()
class PhoneNumberEntryModel {
  const PhoneNumberEntryModel({
    required this.phoneNumber,
    this.source,
    this.associatedName,
    this.hallId,
    this.hallName,
    this.invitationId,
    this.invitationTitle,
    this.messageStatus,
    this.lastMessageDate,
  });

  factory PhoneNumberEntryModel.fromJson(Map<String, dynamic> json) =>
      _$PhoneNumberEntryModelFromJson(json);

  final String phoneNumber;
  final String? source;
  final String? associatedName;
  final int? hallId;
  final String? hallName;
  final int? invitationId;
  final String? invitationTitle;
  final String? messageStatus;
  final DateTime? lastMessageDate;

  Map<String, dynamic> toJson() => _$PhoneNumberEntryModelToJson(this);
}
