import 'package:hall_dashboard/domain/repositories/auth_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class ResetPasswordUseCase {
  const ResetPasswordUseCase(this._authRepository);

  final AuthRepository _authRepository;

  Future<String> execute({
    required String token,
    required int userId,
    required String password,
  }) {
    return _authRepository.resetPassword(
      token: token,
      userId: userId,
      password: password,
    );
  }
}
