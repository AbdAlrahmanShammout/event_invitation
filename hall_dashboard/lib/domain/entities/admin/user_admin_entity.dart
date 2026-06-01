import 'package:hall_dashboard/data/model/admin/user_admin_model.dart';

class UserAdminEntity {
  const UserAdminEntity({
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
  });

  factory UserAdminEntity.fromModel(UserAdminModel model) => UserAdminEntity(
    id: model.id,
    name: model.name,
    email: model.email,
    phone: model.phone,
    hallId: model.hallId,
    hallName: model.hallName,
    role: model.role,
    status: model.status,
    lastLoginAt: model.lastLoginAt,
    createdAt: model.createdAt,
  );

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
}
