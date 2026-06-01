import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class RechargeHallUseCase {
  const RechargeHallUseCase(this._repository);

  final AdminRepository _repository;

  Future<void> execute({required int hallId, required int amount}) =>
      _repository.rechargeHall(id: hallId, amount: amount);
}
