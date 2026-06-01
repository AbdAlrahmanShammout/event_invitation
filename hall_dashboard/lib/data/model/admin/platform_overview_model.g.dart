// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'platform_overview_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PlatformOverviewModel _$PlatformOverviewModelFromJson(
  Map<String, dynamic> json,
) => PlatformOverviewModel(
  halls: HallsOverviewModel.fromJson(json['halls'] as Map<String, dynamic>),
  invitations: InvitationsOverviewModel.fromJson(
    json['invitations'] as Map<String, dynamic>,
  ),
  recipients: RecipientsOverviewModel.fromJson(
    json['recipients'] as Map<String, dynamic>,
  ),
  whatsappSessions: WhatsappSessionsOverviewModel.fromJson(
    json['whatsappSessions'] as Map<String, dynamic>,
  ),
);

Map<String, dynamic> _$PlatformOverviewModelToJson(
  PlatformOverviewModel instance,
) => <String, dynamic>{
  'halls': instance.halls,
  'invitations': instance.invitations,
  'recipients': instance.recipients,
  'whatsappSessions': instance.whatsappSessions,
};

HallsOverviewModel _$HallsOverviewModelFromJson(Map<String, dynamic> json) =>
    HallsOverviewModel(
      total: (json['total'] as num).toInt(),
      active: (json['active'] as num).toInt(),
      inactive: (json['inactive'] as num).toInt(),
      suspended: (json['suspended'] as num).toInt(),
    );

Map<String, dynamic> _$HallsOverviewModelToJson(HallsOverviewModel instance) =>
    <String, dynamic>{
      'total': instance.total,
      'active': instance.active,
      'inactive': instance.inactive,
      'suspended': instance.suspended,
    };

InvitationsOverviewModel _$InvitationsOverviewModelFromJson(
  Map<String, dynamic> json,
) => InvitationsOverviewModel(
  total: (json['total'] as num).toInt(),
  byStatus: Map<String, int>.from(json['byStatus'] as Map),
);

Map<String, dynamic> _$InvitationsOverviewModelToJson(
  InvitationsOverviewModel instance,
) => <String, dynamic>{'total': instance.total, 'byStatus': instance.byStatus};

RecipientsOverviewModel _$RecipientsOverviewModelFromJson(
  Map<String, dynamic> json,
) => RecipientsOverviewModel(
  total: (json['total'] as num).toInt(),
  byMessageStatus: Map<String, int>.from(json['byMessageStatus'] as Map),
);

Map<String, dynamic> _$RecipientsOverviewModelToJson(
  RecipientsOverviewModel instance,
) => <String, dynamic>{
  'total': instance.total,
  'byMessageStatus': instance.byMessageStatus,
};

WhatsappSessionsOverviewModel _$WhatsappSessionsOverviewModelFromJson(
  Map<String, dynamic> json,
) => WhatsappSessionsOverviewModel(
  total: (json['total'] as num).toInt(),
  active: (json['active'] as num).toInt(),
  inactive: (json['inactive'] as num).toInt(),
);

Map<String, dynamic> _$WhatsappSessionsOverviewModelToJson(
  WhatsappSessionsOverviewModel instance,
) => <String, dynamic>{
  'total': instance.total,
  'active': instance.active,
  'inactive': instance.inactive,
};
