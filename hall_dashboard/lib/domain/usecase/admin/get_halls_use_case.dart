import 'package:hall_dashboard/domain/entities/admin/hall_entity.dart';
import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class GetHallsUseCase {
  const GetHallsUseCase(this._repository);

  final AdminRepository _repository;

  Future<({List<HallEntity> halls, int total})> execute({
    int page = 1,
    int limit = 20,
    String? status,
    String? search,
  }) => _repository.getHalls(
    page: page,
    limit: limit,
    status: status,
    search: search,
  );
}
