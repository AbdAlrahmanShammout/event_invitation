import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

enum HallStatusAction { suspend, freeze, reactivate }

@injectable
class ChangeHallStatusUseCase {
  const ChangeHallStatusUseCase(this._repository);

  final AdminRepository _repository;

  Future<void> execute({
    required int hallId,
    required HallStatusAction action,
    String? reason,
  }) {
    return switch (action) {
      HallStatusAction.suspend =>
        _repository.suspendHall(id: hallId, reason: reason),
      HallStatusAction.freeze =>
        _repository.freezeHall(id: hallId, reason: reason),
      HallStatusAction.reactivate => _repository.reactivateHall(hallId),
    };
  }
}
