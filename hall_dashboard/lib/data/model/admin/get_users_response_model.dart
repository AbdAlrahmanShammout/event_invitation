import 'package:hall_dashboard/data/model/admin/user_admin_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'get_users_response_model.g.dart';

@JsonSerializable()
class GetUsersResponseModel {
  const GetUsersResponseModel({required this.users, required this.total});

  factory GetUsersResponseModel.fromJson(Map<String, dynamic> json) =>
      _$GetUsersResponseModelFromJson(json);

  final List<UserAdminModel> users;
  final int total;

  Map<String, dynamic> toJson() => _$GetUsersResponseModelToJson(this);
}
