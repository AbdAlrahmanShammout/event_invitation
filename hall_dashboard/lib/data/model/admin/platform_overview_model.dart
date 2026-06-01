import 'package:json_annotation/json_annotation.dart';

part 'platform_overview_model.g.dart';

@JsonSerializable()
class PlatformOverviewModel {
  const PlatformOverviewModel({
    required this.halls,
    required this.invitations,
    required this.recipients,
    required this.whatsappSessions,
  });

  factory PlatformOverviewModel.fromJson(Map<String, dynamic> json) =>
      _$PlatformOverviewModelFromJson(json);

  final HallsOverviewModel halls;
  final InvitationsOverviewModel invitations;
  final RecipientsOverviewModel recipients;
  final WhatsappSessionsOverviewModel whatsappSessions;

  Map<String, dynamic> toJson() => _$PlatformOverviewModelToJson(this);
}

@JsonSerializable()
class HallsOverviewModel {
  const HallsOverviewModel({
    required this.total,
    required this.active,
    required this.inactive,
    required this.suspended,
  });

  factory HallsOverviewModel.fromJson(Map<String, dynamic> json) =>
      _$HallsOverviewModelFromJson(json);

  final int total;
  final int active;
  final int inactive;
  final int suspended;

  Map<String, dynamic> toJson() => _$HallsOverviewModelToJson(this);
}

@JsonSerializable()
class InvitationsOverviewModel {
  const InvitationsOverviewModel({
    required this.total,
    required this.byStatus,
  });

  factory InvitationsOverviewModel.fromJson(Map<String, dynamic> json) =>
      _$InvitationsOverviewModelFromJson(json);

  final int total;
  final Map<String, int> byStatus;

  Map<String, dynamic> toJson() => _$InvitationsOverviewModelToJson(this);
}

@JsonSerializable()
class RecipientsOverviewModel {
  const RecipientsOverviewModel({
    required this.total,
    required this.byMessageStatus,
  });

  factory RecipientsOverviewModel.fromJson(Map<String, dynamic> json) =>
      _$RecipientsOverviewModelFromJson(json);

  final int total;
  final Map<String, int> byMessageStatus;

  Map<String, dynamic> toJson() => _$RecipientsOverviewModelToJson(this);
}

@JsonSerializable()
class WhatsappSessionsOverviewModel {
  const WhatsappSessionsOverviewModel({
    required this.total,
    required this.active,
    required this.inactive,
  });

  factory WhatsappSessionsOverviewModel.fromJson(Map<String, dynamic> json) =>
      _$WhatsappSessionsOverviewModelFromJson(json);

  final int total;
  final int active;
  final int inactive;

  Map<String, dynamic> toJson() => _$WhatsappSessionsOverviewModelToJson(this);
}
