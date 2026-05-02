import 'package:hall_dashboard/domain/repositories/auth_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class RequestPasswordResetUseCase {
  const RequestPasswordResetUseCase(this._authRepository);

  final AuthRepository _authRepository;

  Future<String> execute({required String email}) {
    return _authRepository.requestPasswordReset(email: email);
  }
}
