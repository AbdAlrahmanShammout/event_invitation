import 'package:hall_dashboard/domain/entities/admin/user_admin_entity.dart';
import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class GetUsersUseCase {
  const GetUsersUseCase(this._repository);

  final AdminRepository _repository;

  Future<({List<UserAdminEntity> users, int total})> execute({
    int page = 1,
    int limit = 20,
    String? role,
    String? search,
  }) => _repository.getUsers(page: page, limit: limit, role: role, search: search);
}
