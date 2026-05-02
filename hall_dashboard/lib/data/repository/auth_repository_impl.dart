import 'package:hall_dashboard/data/datasource/remote/auth_remote_data_source.dart';
import 'package:hall_dashboard/domain/entities/auth/auth_session.dart';
import 'package:hall_dashboard/domain/repositories/auth_repository.dart';
import 'package:injectable/injectable.dart';

@LazySingleton(as: AuthRepository)
class AuthRepositoryImpl implements AuthRepository {
  const AuthRepositoryImpl(this._authRemoteDataSource);

  final AuthRemoteDataSource _authRemoteDataSource;

  @override
  Future<AuthSession> login({
    required String email,
    required String password,
  }) async {
    final result = await _authRemoteDataSource.login(
      email: email,
      password: password,
    );
    return result.toEntity();
  }

  @override
  Future<String> requestPasswordReset({required String email}) {
    return _authRemoteDataSource.requestPasswordReset(email: email);
  }

  @override
  Future<String> resetPassword({
    required String token,
    required int userId,
    required String password,
  }) {
    return _authRemoteDataSource.resetPassword(
      token: token,
      userId: userId,
      password: password,
    );
  }

  @override
  Future<String> verifyResetPasswordToken({
    required String token,
    required int userId,
  }) {
    return _authRemoteDataSource.verifyResetPasswordToken(
      token: token,
      userId: userId,
    );
  }
}
