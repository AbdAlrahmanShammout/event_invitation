import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/domain/usecase/admin/get_invitations_use_case.dart';
import 'package:hall_dashboard/presentation/features/invitations/bloc/invitations_event.dart';
import 'package:hall_dashboard/presentation/features/invitations/bloc/invitations_state.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:injectable/injectable.dart';

@injectable
class InvitationsBloc extends Bloc<InvitationsEvent, InvitationsState> {
  InvitationsBloc(this._getInvitationsUseCase)
    : super(const InvitationsState.initial()) {
    on<InvitationsLoadRequested>(_handleLoadRequested);
  }

  final GetInvitationsUseCase _getInvitationsUseCase;

  Future<void> _handleLoadRequested(
    InvitationsLoadRequested event,
    Emitter<InvitationsState> emit,
  ) async {
    emit(state.copyWith(
      status: LoadStatus.loading,
      filterStatus: event.status,
      filterHallId: event.hallId,
      filterSearch: event.search,
    ));
    try {
      final result = await _getInvitationsUseCase.execute(
        status: event.status,
        hallId: event.hallId,
        search: event.search,
      );
      emit(state.copyWith(
        status: LoadStatus.loaded,
        invitations: result.invitations,
        total: result.total,
      ));
    } catch (err) {
      emit(state.copyWith(
        status: LoadStatus.error,
        error: 'Failed to load invitations.',
      ));
    }
  }
}
