import 'package:hall_dashboard/data/model/admin/phone_number_entry_model.dart';

class PhoneNumberEntity {
  const PhoneNumberEntity({
    required this.phoneNumber,
    this.associatedName,
    this.hallId,
    this.hallName,
    this.invitationId,
    this.invitationTitle,
    this.messageStatus,
    this.lastMessageDate,
  });

  factory PhoneNumberEntity.fromModel(PhoneNumberEntryModel model) =>
      PhoneNumberEntity(
        phoneNumber: model.phoneNumber,
        associatedName: model.associatedName,
        hallId: model.hallId,
        hallName: model.hallName,
        invitationId: model.invitationId,
        invitationTitle: model.invitationTitle,
        messageStatus: model.messageStatus,
        lastMessageDate: model.lastMessageDate,
      );

  final String phoneNumber;
  final String? associatedName;
  final int? hallId;
  final String? hallName;
  final int? invitationId;
  final String? invitationTitle;
  final String? messageStatus;
  final DateTime? lastMessageDate;
}
