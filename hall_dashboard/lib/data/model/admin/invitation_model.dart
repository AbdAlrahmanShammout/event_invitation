import 'package:json_annotation/json_annotation.dart';

part 'invitation_model.g.dart';

@JsonSerializable()
class InvitationModel {
  const InvitationModel({
    required this.id,
    required this.title,
    required this.status,
    required this.createdAt,
    this.description,
    this.maxGuestsAllowed,
    this.eventDate,
    this.hallId,
    this.creatorId,
    this.startSendAt,
    this.submissionDeadline,
    this.updatedAt,
    this.creator,
    this.hallName,
    this.guestCount,
    this.sentMessagesCount,
    this.deliveryPercentage,
  });

  factory InvitationModel.fromJson(Map<String, dynamic> json) =>
      _$InvitationModelFromJson(json);

  final int id;
  final String title;
  final String? description;
  final int? maxGuestsAllowed;
  final DateTime? eventDate;
  final int? hallId;
  final int? creatorId;
  final String status;
  final DateTime? startSendAt;
  final DateTime? submissionDeadline;
  final DateTime createdAt;
  final DateTime? updatedAt;
  final InvitationCreatorModel? creator;
  final String? hallName;
  final int? guestCount;
  final int? sentMessagesCount;
  final double? deliveryPercentage;

  Map<String, dynamic> toJson() => _$InvitationModelToJson(this);
}

@JsonSerializable()
class InvitationCreatorModel {
  const InvitationCreatorModel({required this.id, required this.name});

  factory InvitationCreatorModel.fromJson(Map<String, dynamic> json) =>
      _$InvitationCreatorModelFromJson(json);

  final int id;
  final String name;

  Map<String, dynamic> toJson() => _$InvitationCreatorModelToJson(this);
}
