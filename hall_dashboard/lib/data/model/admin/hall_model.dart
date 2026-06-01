import 'package:json_annotation/json_annotation.dart';

part 'hall_model.g.dart';

@JsonSerializable()
class HallModel {
  const HallModel({
    required this.id,
    required this.name,
    required this.createdAt,
    this.description,
    this.address,
    this.email,
    this.phone,
    this.status,
    this.ownerId,
    this.balance,
    this.updatedAt,
    this.owner,
  });

  factory HallModel.fromJson(Map<String, dynamic> json) =>
      _$HallModelFromJson(json);

  final int id;
  final String name;
  final String? description;
  final String? address;
  final String? email;
  final String? phone;
  final String? status;
  final int? ownerId;
  final int? balance;
  final DateTime createdAt;
  final DateTime? updatedAt;
  final HallOwnerModel? owner;

  Map<String, dynamic> toJson() => _$HallModelToJson(this);
}

@JsonSerializable()
class HallOwnerModel {
  const HallOwnerModel({
    required this.id,
    required this.name,
    this.email,
  });

  factory HallOwnerModel.fromJson(Map<String, dynamic> json) =>
      _$HallOwnerModelFromJson(json);

  final int id;
  final String name;
  final String? email;

  Map<String, dynamic> toJson() => _$HallOwnerModelToJson(this);
}
