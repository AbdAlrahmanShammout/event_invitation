import 'package:hall_dashboard/domain/entities/admin/hall_credit_transaction_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_detail_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/invitation_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/phone_number_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/platform_overview_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/user_admin_entity.dart';

abstract class AdminRepository {
  Future<PlatformOverviewEntity> getPlatformOverview();

  Future<List<PhoneNumberEntity>> getPhoneNumbers({
    String? search,
    int? hallId,
    int? invitationId,
  });

  Future<({List<HallEntity> halls, int total})> getHalls({
    int page,
    int limit,
    String? status,
    String? search,
  });

  Future<HallDetailEntity> getHallById(int id);

  Future<HallDetailEntity> updateHall({
    required int id,
    String? name,
    String? description,
    String? address,
    String? email,
    String? phone,
  });

  Future<void> suspendHall({required int id, String? reason});

  Future<void> freezeHall({required int id, String? reason});

  Future<void> reactivateHall(int id);

  Future<void> rechargeHall({required int id, required int amount});

  Future<List<HallCreditTransactionEntity>> getCreditTransactions({
    required int hallId,
    int page,
    int limit,
  });

  Future<({List<InvitationEntity> invitations, int total})> getInvitations({
    int page,
    int limit,
    String? status,
    int? hallId,
    String? search,
  });

  Future<void> approveInvitation(int id);

  Future<({List<UserAdminEntity> users, int total})> getUsers({
    int page,
    int limit,
    String? role,
    String? search,
  });
}
