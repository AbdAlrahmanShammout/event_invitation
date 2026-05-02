import 'package:hall_dashboard/domain/entities/auth/auth_user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'auth_user_model.g.dart';

@JsonSerializable()
class AuthUserModel {
  const AuthUserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.hallId,
    this.lastLoginAt,
  });

  factory AuthUserModel.fromJson(Map<String, dynamic> json) {
    return _$AuthUserModelFromJson(json);
  }

  final int id;
  final String name;
  final String email;
  final String role;
  final int? hallId;
  final DateTime? lastLoginAt;

  AuthUser toEntity() {
    return AuthUser(
      id: id,
      name: name,
      email: email,
      role: role,
      hallId: hallId,
      lastLoginAt: lastLoginAt,
    );
  }
}
