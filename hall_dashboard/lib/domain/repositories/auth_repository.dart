import 'package:hall_dashboard/domain/entities/auth/auth_session.dart';

abstract class AuthRepository {
  Future<AuthSession> login({required String email, required String password});

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
