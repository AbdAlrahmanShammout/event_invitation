import 'package:hall_dashboard/domain/entities/admin/hall_credit_transaction_entity.dart';
import 'package:hall_dashboard/domain/repositories/admin_repository.dart';
import 'package:injectable/injectable.dart';

@injectable
class GetCreditTransactionsUseCase {
  const GetCreditTransactionsUseCase(this._repository);

  final AdminRepository _repository;

  Future<List<HallCreditTransactionEntity>> execute({
    required int hallId,
    int page = 1,
    int limit = 20,
  }) => _repository.getCreditTransactions(hallId: hallId, page: page, limit: limit);
}
