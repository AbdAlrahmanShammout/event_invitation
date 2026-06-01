import 'package:hall_dashboard/domain/entities/admin/platform_overview_entity.dart';
import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class GetOverviewUseCase {
  const GetOverviewUseCase(this._repository);

  final AdminRepository _repository;

  Future<PlatformOverviewEntity> execute() => _repository.getPlatformOverview();
}
