import 'package:dio/dio.dart';
import 'package:hall_dashboard/data/model/admin/get_halls_response_model.dart';
import 'package:hall_dashboard/data/model/admin/get_invitations_response_model.dart';
import 'package:hall_dashboard/data/model/admin/get_users_response_model.dart';
import 'package:hall_dashboard/data/model/admin/hall_admin_detail_model.dart';
import 'package:hall_dashboard/data/model/admin/hall_credit_transaction_model.dart';
import 'package:hall_dashboard/data/model/admin/platform_overview_model.dart';
import 'package:hall_dashboard/data/model/admin/phone_number_entry_model.dart';
import 'package:retrofit/retrofit.dart';

part 'admin_api_client.g.dart';

@RestApi()
abstract class AdminApiClient {
  factory AdminApiClient(Dio dio, {String baseUrl}) = _AdminApiClient;

  // ── Monitoring ──────────────────────────────────────────────────────────────

  @GET('/admin/monitoring/overview')
  Future<PlatformOverviewModel> getPlatformOverview();

  @GET('/admin/monitoring/phone-numbers')
  Future<List<PhoneNumberEntryModel>> getPhoneNumbers({
    @Query('search') String? search,
    @Query('hallId') int? hallId,
    @Query('invitationId') int? invitationId,
  });

  // ── Halls ────────────────────────────────────────────────────────────────────

  @GET('/admin/halls')
  Future<GetHallsResponseModel> getHalls({
    @Query('page') int? page,
    @Query('limit') int? limit,
    @Query('status') String? status,
    @Query('search') String? search,
  });

  @GET('/admin/halls/{id}')
  Future<HallAdminDetailModel> getHallById(@Path('id') int id);

  @PATCH('/admin/halls/{id}')
  Future<HallAdminDetailModel> updateHall(
    @Path('id') int id,
    @Body() Map<String, dynamic> body,
  );

  @POST('/admin/halls/{id}/suspend')
  Future<void> suspendHall(
    @Path('id') int id,
    @Body() Map<String, dynamic> body,
  );

  @POST('/admin/halls/{id}/freeze')
  Future<void> freezeHall(
    @Path('id') int id,
    @Body() Map<String, dynamic> body,
  );

  @POST('/admin/halls/{id}/reactivate')
  Future<void> reactivateHall(@Path('id') int id);

  @POST('/admin/halls/{id}/recharge')
  Future<void> rechargeHall(
    @Path('id') int id,
    @Body() Map<String, dynamic> body,
  );

  @GET('/admin/halls/{id}/credit-transactions')
  Future<List<HallCreditTransactionModel>> getCreditTransactions(
    @Path('id') int id, {
    @Query('page') int? page,
    @Query('limit') int? limit,
  });

  // ── Invitations ─────────────────────────────────────────────────────────────

  @GET('/admin/invitations')
  Future<GetInvitationsResponseModel> getInvitations({
    @Query('page') int? page,
    @Query('limit') int? limit,
    @Query('status') String? status,
    @Query('hallId') int? hallId,
    @Query('search') String? search,
  });

  @POST('/admin/invitations/{id}/approve')
  Future<void> approveInvitation(@Path('id') int id);

  // ── Users ───────────────────────────────────────────────────────────────────

  @GET('/admin/users')
  Future<GetUsersResponseModel> getUsers({
    @Query('page') int? page,
    @Query('limit') int? limit,
    @Query('role') String? role,
    @Query('search') String? search,
  });
}
