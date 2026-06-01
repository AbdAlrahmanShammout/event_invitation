import 'package:json_annotation/json_annotation.dart';

part 'hall_credit_balance_model.g.dart';

@JsonSerializable()
class HallCreditBalanceModel {
  const HallCreditBalanceModel({
    required this.availableCredits,
    required this.reservedCredits,
    this.updatedAt,
  });

  factory HallCreditBalanceModel.fromJson(Map<String, dynamic> json) =>
      _$HallCreditBalanceModelFromJson(json);

  final int availableCredits;
  final int reservedCredits;
  final DateTime? updatedAt;

  Map<String, dynamic> toJson() => _$HallCreditBalanceModelToJson(this);
}
