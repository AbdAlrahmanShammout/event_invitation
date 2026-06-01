import 'package:hall_dashboard/domain/entities/admin/phone_number_entity.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';

class ContactsState {
  const ContactsState({
    required this.status,
    this.contacts = const [],
    this.error,
  });

  const ContactsState.initial()
    : status = LoadStatus.initial,
      contacts = const [],
      error = null;

  final LoadStatus status;
  final List<PhoneNumberEntity> contacts;
  final String? error;

  ContactsState copyWith({
    LoadStatus? status,
    List<PhoneNumberEntity>? contacts,
    String? error,
  }) => ContactsState(
    status: status ?? this.status,
    contacts: contacts ?? this.contacts,
    error: error,
  );
}
