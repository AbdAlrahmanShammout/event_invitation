import 'package:hall_dashboard/data/model/admin/hall_account_state_model.dart';
import 'package:hall_dashboard/data/model/admin/hall_credit_balance_model.dart';
import 'package:hall_dashboard/data/model/admin/hall_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'hall_admin_detail_model.g.dart';

@JsonSerializable()
class HallAdminDetailModel {
  const HallAdminDetailModel({
    required this.hall,
    this.accountState,
    this.creditBalance,
  });

  factory HallAdminDetailModel.fromJson(Map<String, dynamic> json) =>
      _$HallAdminDetailModelFromJson(json);

  final HallModel hall;
  final HallAccountStateModel? accountState;
  final HallCreditBalanceModel? creditBalance;

  Map<String, dynamic> toJson() => _$HallAdminDetailModelToJson(this);
}
