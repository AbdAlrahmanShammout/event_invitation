abstract class HallsEvent {
  const HallsEvent();
}

class HallsLoadRequested extends HallsEvent {
  const HallsLoadRequested({this.status, this.search});

  final String? status;
  final String? search;
}

class HallsRefreshRequested extends HallsEvent {
  const HallsRefreshRequested();
}
