import 'package:hall_dashboard/data/model/admin/hall_admin_detail_model.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_entity.dart';

class HallDetailEntity {
  const HallDetailEntity({
    required this.hall,
    this.accountStatus,
    this.accountStatusReason,
    this.availableCredits,
    this.reservedCredits,
  });

  factory HallDetailEntity.fromModel(HallAdminDetailModel model) =>
      HallDetailEntity(
        hall: HallEntity.fromModel(model.hall),
        accountStatus: model.accountState?.status,
        accountStatusReason: model.accountState?.reason,
        availableCredits: model.creditBalance?.availableCredits,
        reservedCredits: model.creditBalance?.reservedCredits,
      );

  final HallEntity hall;
  final String? accountStatus;
  final String? accountStatusReason;
  final int? availableCredits;
  final int? reservedCredits;
}
