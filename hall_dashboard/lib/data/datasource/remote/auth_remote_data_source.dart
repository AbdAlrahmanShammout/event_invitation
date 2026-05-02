import 'package:hall_dashboard/data/datasource/remote/auth_api_client.dart';
import 'package:hall_dashboard/data/dto/auth/login_request_dto.dart';
import 'package:hall_dashboard/data/dto/auth/request_forget_password_dto.dart';
import 'package:hall_dashboard/data/dto/auth/reset_password_dto.dart';
import 'package:hall_dashboard/data/dto/auth/verify_reset_password_token_dto.dart';
import 'package:hall_dashboard/data/model/auth/auth_result_model.dart';
import 'package:injectable/injectable.dart';

abstract class AuthRemoteDataSource {
  Future<AuthResultModel> login({
    required String email,
    required String password,
  });

  Future<String> requestPasswordReset({required String email});

  Future<String> verifyResetPasswordToken({
    required String token,
    required int userId,
  });

  Future<String> resetPassword({
    required String token,
    required int userId,
    required String password,
  });
}

@LazySingleton(as: AuthRemoteDataSource)
class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  const AuthRemoteDataSourceImpl(this._authApiClient);

  final AuthApiClient _authApiClient;

  @override
  Future<AuthResultModel> login({
    required String email,
    required String password,
  }) {
    return _authApiClient.login(
      LoginRequestDto(email: email, password: password),
    );
  }

  @override
  Future<String> requestPasswordReset({required String email}) async {
    final response = await _authApiClient.requestPasswordReset(
      RequestForgetPasswordDto(email: email),
    );
    return response.message;
  }

  @override
  Future<String> verifyResetPasswordToken({
    required String token,
    required int userId,
  }) async {
    final response = await _authApiClient.verifyResetPasswordToken(
      VerifyResetPasswordTokenDto(token: token, userId: userId),
    );
    return response.message;
  }

  @override
  Future<String> resetPassword({
    required String token,
    required int userId,
    required String password,
  }) async {
    final response = await _authApiClient.resetPassword(
      ResetPasswordDto(token: token, userId: userId, password: password),
    );
    return response.message;
  }
}
