import 'package:json_annotation/json_annotation.dart';

part 'user_admin_model.g.dart';

@JsonSerializable()
class UserAdminModel {
  const UserAdminModel({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    required this.createdAt,
    this.phone,
    this.hallId,
    this.hallName,
    this.status,
    this.lastLoginAt,
    this.updatedAt,
  });

  factory UserAdminModel.fromJson(Map<String, dynamic> json) =>
      _$UserAdminModelFromJson(json);

  final int id;
  final String name;
  final String email;
  final String? phone;
  final int? hallId;
  final String? hallName;
  final String role;
  final String? status;
  final DateTime? lastLoginAt;
  final DateTime createdAt;
  final DateTime? updatedAt;

  Map<String, dynamic> toJson() => _$UserAdminModelToJson(this);
}
