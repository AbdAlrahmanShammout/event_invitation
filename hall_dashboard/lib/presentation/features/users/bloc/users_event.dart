abstract class UsersEvent {
  const UsersEvent();
}

class UsersLoadRequested extends UsersEvent {
  const UsersLoadRequested({this.role, this.search});

  final String? role;
  final String? search;
}
