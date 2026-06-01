import 'package:hall_dashboard/data/datasource/remote/admin_api_client.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_credit_transaction_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_detail_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/hall_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/invitation_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/phone_number_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/platform_overview_entity.dart';
import 'package:hall_dashboard/domain/entities/admin/user_admin_entity.dart';
import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

@LazySingleton(as: AdminRepository)
class AdminRepositoryImpl implements AdminRepository {
  const AdminRepositoryImpl(this._apiClient);

  final AdminApiClient _apiClient;

  @override
  Future<PlatformOverviewEntity> getPlatformOverview() async {
    final model = await _apiClient.getPlatformOverview();
    return PlatformOverviewEntity.fromModel(model);
  }

  @override
  Future<List<PhoneNumberEntity>> getPhoneNumbers({
    String? search,
    int? hallId,
    int? invitationId,
  }) async {
    final models = await _apiClient.getPhoneNumbers(
      search: search,
      hallId: hallId,
      invitationId: invitationId,
    );
    return models.map(PhoneNumberEntity.fromModel).toList();
  }

  @override
  Future<({List<HallEntity> halls, int total})> getHalls({
    int page = 1,
    int limit = 20,
    String? status,
    String? search,
  }) async {
    final response = await _apiClient.getHalls(
      page: page,
      limit: limit,
      status: status,
      search: search,
    );
    return (
      halls: response.halls.map(HallEntity.fromModel).toList(),
      total: response.total,
    );
  }

  @override
  Future<HallDetailEntity> getHallById(int id) async {
    final model = await _apiClient.getHallById(id);
    return HallDetailEntity.fromModel(model);
  }

  @override
  Future<HallDetailEntity> updateHall({
    required int id,
    String? name,
    String? description,
    String? address,
    String? email,
    String? phone,
  }) async {
    final body = <String, dynamic>{
      if (name != null) 'name': name,
      if (description != null) 'description': description,
      if (address != null) 'address': address,
      if (email != null) 'email': email,
      if (phone != null) 'phone': phone,
    };
    final model = await _apiClient.updateHall(id, body);
    return HallDetailEntity.fromModel(model);
  }

  @override
  Future<void> suspendHall({required int id, String? reason}) {
    return _apiClient.suspendHall(id, {'reason': reason});
  }

  @override
  Future<void> freezeHall({required int id, String? reason}) {
    return _apiClient.freezeHall(id, {'reason': reason});
  }

  @override
  Future<void> reactivateHall(int id) => _apiClient.reactivateHall(id);

  @override
  Future<void> rechargeHall({required int id, required int amount}) {
    return _apiClient.rechargeHall(id, {'amount': amount});
  }

  @override
  Future<List<HallCreditTransactionEntity>> getCreditTransactions({
    required int hallId,
    int page = 1,
    int limit = 20,
  }) async {
    final models = await _apiClient.getCreditTransactions(
      hallId,
      page: page,
      limit: limit,
    );
    return models.map(HallCreditTransactionEntity.fromModel).toList();
  }

  @override
  Future<({List<InvitationEntity> invitations, int total})> getInvitations({
    int page = 1,
    int limit = 20,
    String? status,
    int? hallId,
    String? search,
  }) async {
    final response = await _apiClient.getInvitations(
      page: page,
      limit: limit,
      status: status,
      hallId: hallId,
      search: search,
    );
    return (
      invitations: response.invitations.map(InvitationEntity.fromModel).toList(),
      total: response.total,
    );
  }

  @override
  Future<void> approveInvitation(int id) => _apiClient.approveInvitation(id);

  @override
  Future<({List<UserAdminEntity> users, int total})> getUsers({
    int page = 1,
    int limit = 20,
    String? role,
    String? search,
  }) async {
    final response = await _apiClient.getUsers(
      page: page,
      limit: limit,
      role: role,
      search: search,
    );
    return (
      users: response.users.map(UserAdminEntity.fromModel).toList(),
      total: response.total,
    );
  }
}
