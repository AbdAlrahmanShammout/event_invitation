import 'package:hall_dashboard/data/model/admin/invitation_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'get_invitations_response_model.g.dart';

@JsonSerializable()
class GetInvitationsResponseModel {
  const GetInvitationsResponseModel({
    required this.invitations,
    required this.total,
  });

  factory GetInvitationsResponseModel.fromJson(Map<String, dynamic> json) =>
      _$GetInvitationsResponseModelFromJson(json);

  final List<InvitationModel> invitations;
  final int total;

  Map<String, dynamic> toJson() => _$GetInvitationsResponseModelToJson(this);
}
