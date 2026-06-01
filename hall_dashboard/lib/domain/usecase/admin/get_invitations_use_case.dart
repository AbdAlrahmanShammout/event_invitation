import 'package:hall_dashboard/domain/entities/admin/invitation_entity.dart';
import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class GetInvitationsUseCase {
  const GetInvitationsUseCase(this._repository);

  final AdminRepository _repository;

  Future<({List<InvitationEntity> invitations, int total})> execute({
    int page = 1,
    int limit = 20,
    String? status,
    int? hallId,
    String? search,
  }) => _repository.getInvitations(
    page: page,
    limit: limit,
    status: status,
    hallId: hallId,
    search: search,
  );
}
