import 'package:hall_dashboard/domain/entities/auth/auth_session.dart';
import 'package:hall_dashboard/domain/repositories/auth_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class LoginUseCase {
  const LoginUseCase(this._authRepository);

  final AuthRepository _authRepository;

  Future<AuthSession> execute({
    required String email,
    required String password,
  }) {
    return _authRepository.login(email: email, password: password);
  }
}
