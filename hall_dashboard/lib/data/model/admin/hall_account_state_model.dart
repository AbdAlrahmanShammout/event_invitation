import 'package:json_annotation/json_annotation.dart';

part 'hall_account_state_model.g.dart';

@JsonSerializable()
class HallAccountStateModel {
  const HallAccountStateModel({
    required this.status,
    this.reason,
    this.updatedAt,
  });

  factory HallAccountStateModel.fromJson(Map<String, dynamic> json) =>
      _$HallAccountStateModelFromJson(json);

  final String status;
  final String? reason;
  final DateTime? updatedAt;

  Map<String, dynamic> toJson() => _$HallAccountStateModelToJson(this);
}
