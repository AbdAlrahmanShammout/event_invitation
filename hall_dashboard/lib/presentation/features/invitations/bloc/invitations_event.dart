abstract class InvitationsEvent {
  const InvitationsEvent();
}

class InvitationsLoadRequested extends InvitationsEvent {
  const InvitationsLoadRequested({
    this.status,
    this.hallId,
    this.search,
  });

  final String? status;
  final int? hallId;
  final String? search;
}
