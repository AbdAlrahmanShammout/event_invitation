import 'package:hall_dashboard/data/model/admin/platform_overview_model.dart';

class PlatformOverviewEntity {
  const PlatformOverviewEntity({
    required this.totalHalls,
    required this.activeHalls,
    required this.suspendedHalls,
    required this.inactiveHalls,
    required this.totalInvitations,
    required this.invitationsByStatus,
    required this.totalRecipients,
    required this.recipientsByMessageStatus,
    required this.totalWhatsappSessions,
    required this.activeWhatsappSessions,
  });

  factory PlatformOverviewEntity.fromModel(PlatformOverviewModel model) =>
      PlatformOverviewEntity(
        totalHalls: model.halls.total,
        activeHalls: model.halls.active,
        suspendedHalls: model.halls.suspended,
        inactiveHalls: model.halls.inactive,
        totalInvitations: model.invitations.total,
        invitationsByStatus: model.invitations.byStatus,
        totalRecipients: model.recipients.total,
        recipientsByMessageStatus: model.recipients.byMessageStatus,
        totalWhatsappSessions: model.whatsappSessions.total,
        activeWhatsappSessions: model.whatsappSessions.active,
      );

  final int totalHalls;
  final int activeHalls;
  final int suspendedHalls;
  final int inactiveHalls;
  final int totalInvitations;
  final Map<String, int> invitationsByStatus;
  final int totalRecipients;
  final Map<String, int> recipientsByMessageStatus;
  final int totalWhatsappSessions;
  final int activeWhatsappSessions;

  int get pendingInvitations =>
      invitationsByStatus['PENDING_APPROVAL'] ?? 0;

  int get sentMessagesToday =>
      recipientsByMessageStatus['sent'] ?? 0;
}
