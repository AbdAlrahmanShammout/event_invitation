import 'package:hall_dashboard/data/model/admin/invitation_model.dart';

class InvitationEntity {
  const InvitationEntity({
    required this.id,
    required this.title,
    required this.status,
    required this.createdAt,
    this.description,
    this.maxGuestsAllowed,
    this.eventDate,
    this.hallId,
    this.hallName,
    this.creatorId,
    this.creatorName,
    this.startSendAt,
    this.guestCount,
    this.sentMessagesCount,
    this.deliveryPercentage,
    this.updatedAt,
  });

  factory InvitationEntity.fromModel(InvitationModel model) => InvitationEntity(
    id: model.id,
    title: model.title,
    description: model.description,
    maxGuestsAllowed: model.maxGuestsAllowed,
    eventDate: model.eventDate,
    hallId: model.hallId,
    hallName: model.hallName,
    creatorId: model.creatorId,
    creatorName: model.creator?.name,
    status: model.status,
    startSendAt: model.startSendAt,
    guestCount: model.guestCount,
    sentMessagesCount: model.sentMessagesCount,
    deliveryPercentage: model.deliveryPercentage,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  );

  final int id;
  final String title;
  final String? description;
  final int? maxGuestsAllowed;
  final DateTime? eventDate;
  final int? hallId;
  final String? hallName;
  final int? creatorId;
  final String? creatorName;
  final String status;
  final DateTime? startSendAt;
  final int? guestCount;
  final int? sentMessagesCount;
  final double? deliveryPercentage;
  final DateTime createdAt;
  final DateTime? updatedAt;
}
