import 'package:hall_dashboard/data/model/admin/hall_model.dart';

class HallEntity {
  const HallEntity({
    required this.id,
    required this.name,
    required this.createdAt,
    this.description,
    this.address,
    this.email,
    this.phone,
    this.status,
    this.ownerId,
    this.ownerName,
    this.balance,
    this.updatedAt,
  });

  factory HallEntity.fromModel(HallModel model) => HallEntity(
    id: model.id,
    name: model.name,
    description: model.description,
    address: model.address,
    email: model.email,
    phone: model.phone,
    status: model.status,
    ownerId: model.ownerId,
    ownerName: model.owner?.name,
    balance: model.balance,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  );

  final int id;
  final String name;
  final String? description;
  final String? address;
  final String? email;
  final String? phone;
  final String? status;
  final int? ownerId;
  final String? ownerName;
  final int? balance;
  final DateTime createdAt;
  final DateTime? updatedAt;
}
