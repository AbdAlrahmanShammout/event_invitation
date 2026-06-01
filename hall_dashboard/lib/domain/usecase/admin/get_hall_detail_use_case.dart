import 'package:hall_dashboard/domain/entities/admin/hall_detail_entity.dart';
import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class GetHallDetailUseCase {
  const GetHallDetailUseCase(this._repository);

  final AdminRepository _repository;

  Future<HallDetailEntity> execute(int id) => _repository.getHallById(id);
}
