import 'package:hall_dashboard/domain/repositories/auth_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class VerifyResetPasswordTokenUseCase {
  const VerifyResetPasswordTokenUseCase(this._authRepository);

  final AuthRepository _authRepository;

  Future<String> execute({required String token, required int userId}) {
    return _authRepository.verifyResetPasswordToken(
      token: token,
      userId: userId,
    );
  }
}
