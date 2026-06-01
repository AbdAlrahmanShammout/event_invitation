// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format width=80

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:dio/dio.dart' as _i361;
import 'package:get_it/get_it.dart' as _i174;
import 'package:injectable/injectable.dart' as _i526;

import '../../data/datasource/remote/admin_api_client.dart' as _i134;
import '../../data/datasource/remote/auth_api_client.dart' as _i318;
import '../../data/datasource/remote/auth_remote_data_source.dart' as _i267;
import '../../data/repository/admin_repository_impl.dart' as _i9;
import '../../data/repository/auth_repository_impl.dart' as _i581;
import '../../domain/repositories/admin_repository.dart' as _i64;
import '../../domain/repositories/auth_repository.dart' as _i1073;
import '../../domain/usecase/admin/change_hall_status_use_case.dart' as _i930;
import '../../domain/usecase/admin/get_credit_transactions_use_case.dart'
    as _i452;
import '../../domain/usecase/admin/get_hall_detail_use_case.dart' as _i200;
import '../../domain/usecase/admin/get_halls_use_case.dart' as _i302;
import '../../domain/usecase/admin/get_invitations_use_case.dart' as _i32;
import '../../domain/usecase/admin/get_overview_use_case.dart' as _i479;
import '../../domain/usecase/admin/get_phone_numbers_use_case.dart' as _i1033;
import '../../domain/usecase/admin/get_users_use_case.dart' as _i1043;
import '../../domain/usecase/admin/recharge_hall_use_case.dart' as _i958;
import '../../domain/usecase/auth/login_use_case.dart' as _i294;
import '../../domain/usecase/auth/request_password_reset_use_case.dart'
    as _i587;
import '../../domain/usecase/auth/reset_password_use_case.dart' as _i47;
import '../../domain/usecase/auth/verify_reset_password_token_use_case.dart'
    as _i576;
import '../../presentation/features/auth/bloc/auth_bloc.dart' as _i379;
import '../../presentation/features/auth/bloc/password_reset_bloc.dart'
    as _i315;
import '../../presentation/features/contacts/bloc/contacts_bloc.dart' as _i1064;
import '../../presentation/features/hall_detail/bloc/hall_detail_bloc.dart'
    as _i242;
import '../../presentation/features/halls/bloc/halls_bloc.dart' as _i134;
import '../../presentation/features/invitations/bloc/invitations_bloc.dart'
    as _i854;
import '../../presentation/features/overview/bloc/overview_bloc.dart' as _i609;
import '../../presentation/features/points/bloc/points_bloc.dart' as _i597;
import '../../presentation/features/users/bloc/users_bloc.dart' as _i810;
import '../network/auth_interceptor.dart' as _i908;
import '../storage/token_storage.dart' as _i973;
import 'register_module.dart' as _i291;

// initializes the registration of main-scope dependencies inside of GetIt
_i174.GetIt initGetIt(
  _i174.GetIt getIt, {
  String? environment,
  _i526.EnvironmentFilter? environmentFilter,
}) {
  final gh = _i526.GetItHelper(getIt, environment, environmentFilter);
  final registerModule = _$RegisterModule();
  gh.lazySingleton<_i361.Dio>(() => registerModule.dio);
  gh.lazySingleton<_i973.TokenStorage>(() => _i973.TokenStorage());
  gh.factory<_i908.AuthInterceptor>(
    () => _i908.AuthInterceptor(gh<_i973.TokenStorage>()),
  );
  gh.lazySingleton<_i318.AuthApiClient>(
    () => registerModule.getAuthApiClient(gh<_i361.Dio>()),
  );
  gh.lazySingleton<_i134.AdminApiClient>(
    () => registerModule.getAdminApiClient(
      gh<_i361.Dio>(),
      gh<_i908.AuthInterceptor>(),
    ),
  );
  gh.lazySingleton<_i267.AuthRemoteDataSource>(
    () => _i267.AuthRemoteDataSourceImpl(gh<_i318.AuthApiClient>()),
  );
  gh.lazySingleton<_i64.AdminRepository>(
    () => _i9.AdminRepositoryImpl(gh<_i134.AdminApiClient>()),
  );
  gh.lazySingleton<_i1073.AuthRepository>(
    () => _i581.AuthRepositoryImpl(gh<_i267.AuthRemoteDataSource>()),
  );
  gh.factory<_i294.LoginUseCase>(
    () => _i294.LoginUseCase(gh<_i1073.AuthRepository>()),
  );
  gh.factory<_i587.RequestPasswordResetUseCase>(
    () => _i587.RequestPasswordResetUseCase(gh<_i1073.AuthRepository>()),
  );
  gh.factory<_i47.ResetPasswordUseCase>(
    () => _i47.ResetPasswordUseCase(gh<_i1073.AuthRepository>()),
  );
  gh.factory<_i576.VerifyResetPasswordTokenUseCase>(
    () => _i576.VerifyResetPasswordTokenUseCase(gh<_i1073.AuthRepository>()),
  );
  gh.factory<_i930.ChangeHallStatusUseCase>(
    () => _i930.ChangeHallStatusUseCase(gh<_i64.AdminRepository>()),
  );
  gh.factory<_i452.GetCreditTransactionsUseCase>(
    () => _i452.GetCreditTransactionsUseCase(gh<_i64.AdminRepository>()),
  );
  gh.factory<_i200.GetHallDetailUseCase>(
    () => _i200.GetHallDetailUseCase(gh<_i64.AdminRepository>()),
  );
  gh.factory<_i302.GetHallsUseCase>(
    () => _i302.GetHallsUseCase(gh<_i64.AdminRepository>()),
  );
  gh.factory<_i32.GetInvitationsUseCase>(
    () => _i32.GetInvitationsUseCase(gh<_i64.AdminRepository>()),
  );
  gh.factory<_i479.GetOverviewUseCase>(
    () => _i479.GetOverviewUseCase(gh<_i64.AdminRepository>()),
  );
  gh.factory<_i1033.GetPhoneNumbersUseCase>(
    () => _i1033.GetPhoneNumbersUseCase(gh<_i64.AdminRepository>()),
  );
  gh.factory<_i1043.GetUsersUseCase>(
    () => _i1043.GetUsersUseCase(gh<_i64.AdminRepository>()),
  );
  gh.factory<_i958.RechargeHallUseCase>(
    () => _i958.RechargeHallUseCase(gh<_i64.AdminRepository>()),
  );
  gh.factory<_i1064.ContactsBloc>(
    () => _i1064.ContactsBloc(gh<_i1033.GetPhoneNumbersUseCase>()),
  );
  gh.factory<_i242.HallDetailBloc>(
    () => _i242.HallDetailBloc(
      gh<_i200.GetHallDetailUseCase>(),
      gh<_i930.ChangeHallStatusUseCase>(),
      gh<_i958.RechargeHallUseCase>(),
      gh<_i452.GetCreditTransactionsUseCase>(),
    ),
  );
  gh.factory<_i379.AuthBloc>(() => _i379.AuthBloc(gh<_i294.LoginUseCase>()));
  gh.factory<_i597.PointsBloc>(
    () => _i597.PointsBloc(
      gh<_i302.GetHallsUseCase>(),
      gh<_i452.GetCreditTransactionsUseCase>(),
      gh<_i958.RechargeHallUseCase>(),
    ),
  );
  gh.factory<_i854.InvitationsBloc>(
    () => _i854.InvitationsBloc(gh<_i32.GetInvitationsUseCase>()),
  );
  gh.factory<_i315.PasswordResetBloc>(
    () => _i315.PasswordResetBloc(
      requestPasswordResetUseCase: gh<_i587.RequestPasswordResetUseCase>(),
      verifyResetPasswordTokenUseCase:
          gh<_i576.VerifyResetPasswordTokenUseCase>(),
      resetPasswordUseCase: gh<_i47.ResetPasswordUseCase>(),
    ),
  );
  gh.factory<_i134.HallsBloc>(
    () => _i134.HallsBloc(gh<_i302.GetHallsUseCase>()),
  );
  gh.factory<_i609.OverviewBloc>(
    () => _i609.OverviewBloc(gh<_i479.GetOverviewUseCase>()),
  );
  gh.factory<_i810.UsersBloc>(
    () => _i810.UsersBloc(gh<_i1043.GetUsersUseCase>()),
  );
  return getIt;
}

class _$RegisterModule extends _i291.RegisterModule {}
