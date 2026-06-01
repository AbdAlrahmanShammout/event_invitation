abstract class ContactsEvent {
  const ContactsEvent();
}

class ContactsLoadRequested extends ContactsEvent {
  const ContactsLoadRequested({this.search, this.hallId, this.invitationId});

  final String? search;
  final int? hallId;
  final int? invitationId;
}
