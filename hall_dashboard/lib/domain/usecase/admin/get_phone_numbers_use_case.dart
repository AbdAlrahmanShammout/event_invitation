import 'package:hall_dashboard/domain/entities/admin/phone_number_entity.dart';
import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class GetPhoneNumbersUseCase {
  const GetPhoneNumbersUseCase(this._repository);

  final AdminRepository _repository;

  Future<List<PhoneNumberEntity>> execute({
    String? search,
    int? hallId,
    int? invitationId,
  }) => _repository.getPhoneNumbers(
    search: search,
    hallId: hallId,
    invitationId: invitationId,
  );
}
