import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/domain/usecase/admin/get_phone_numbers_use_case.dart';
import 'package:hall_dashboard/presentation/features/contacts/bloc/contacts_event.dart';
import 'package:hall_dashboard/presentation/features/contacts/bloc/contacts_state.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:injectable/injectable.dart';

@injectable
class ContactsBloc extends Bloc<ContactsEvent, ContactsState> {
  ContactsBloc(this._getPhoneNumbersUseCase)
    : super(const ContactsState.initial()) {
    on<ContactsLoadRequested>(_handleLoadRequested);
  }

  final GetPhoneNumbersUseCase _getPhoneNumbersUseCase;

  Future<void> _handleLoadRequested(
    ContactsLoadRequested event,
    Emitter<ContactsState> emit,
  ) async {
    emit(state.copyWith(status: LoadStatus.loading));
    try {
      final contacts = await _getPhoneNumbersUseCase.execute(
        search: event.search,
        hallId: event.hallId,
        invitationId: event.invitationId,
      );
      emit(state.copyWith(status: LoadStatus.loaded, contacts: contacts));
    } catch (err) {
      emit(state.copyWith(
        status: LoadStatus.error,
        error: 'Failed to load contacts.',
      ));
    }
  }
}
