import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/domain/usecase/admin/get_users_use_case.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:hall_dashboard/presentation/features/users/bloc/users_event.dart';
import 'package:hall_dashboard/presentation/features/users/bloc/users_state.dart';
import 'package:injectable/injectable.dart';

@injectable
class UsersBloc extends Bloc<UsersEvent, UsersState> {
  UsersBloc(this._getUsersUseCase) : super(const UsersState.initial()) {
    on<UsersLoadRequested>(_handleLoadRequested);
  }

  final GetUsersUseCase _getUsersUseCase;

  Future<void> _handleLoadRequested(
    UsersLoadRequested event,
    Emitter<UsersState> emit,
  ) async {
    emit(state.copyWith(
      status: LoadStatus.loading,
      filterRole: event.role,
      filterSearch: event.search,
    ));
    try {
      final result = await _getUsersUseCase.execute(
        role: event.role,
        search: event.search,
      );
      emit(state.copyWith(
        status: LoadStatus.loaded,
        users: result.users,
        total: result.total,
      ));
    } catch (err) {
      emit(state.copyWith(
        status: LoadStatus.error,
        error: 'Failed to load users.',
      ));
    }
  }
}
