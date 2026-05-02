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

import '../../data/datasource/remote/auth_api_client.dart' as _i318;
import '../../data/datasource/remote/auth_remote_data_source.dart' as _i267;
import '../../data/repository/auth_repository_impl.dart' as _i581;
import '../../domain/repositories/auth_repository.dart' as _i1073;
import '../../domain/usecase/auth/login_use_case.dart' as _i294;
import '../../domain/usecase/auth/request_password_reset_use_case.dart'
    as _i587;
import '../../domain/usecase/auth/reset_password_use_case.dart' as _i47;
import '../../domain/usecase/auth/verify_reset_password_token_use_case.dart'
    as _i576;
import '../../presentation/features/auth/bloc/auth_bloc.dart' as _i379;
import '../../presentation/features/auth/bloc/password_reset_bloc.dart'
    as _i315;
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
  gh.lazySingleton<_i318.AuthApiClient>(
    () => registerModule.getAuthApiClient(gh<_i361.Dio>()),
  );
  gh.lazySingleton<_i267.AuthRemoteDataSource>(
    () => _i267.AuthRemoteDataSourceImpl(gh<_i318.AuthApiClient>()),
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
  gh.factory<_i379.AuthBloc>(() => _i379.AuthBloc(gh<_i294.LoginUseCase>()));
  gh.factory<_i315.PasswordResetBloc>(
    () => _i315.PasswordResetBloc(
      requestPasswordResetUseCase: gh<_i587.RequestPasswordResetUseCase>(),
      verifyResetPasswordTokenUseCase:
          gh<_i576.VerifyResetPasswordTokenUseCase>(),
      resetPasswordUseCase: gh<_i47.ResetPasswordUseCase>(),
    ),
  );
  return getIt;
}

class _$RegisterModule extends _i291.RegisterModule {}
