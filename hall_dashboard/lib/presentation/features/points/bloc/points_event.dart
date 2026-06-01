abstract class PointsEvent {
  const PointsEvent();
}

class PointsLoadRequested extends PointsEvent {
  const PointsLoadRequested();
}

class PointsHallSelected extends PointsEvent {
  const PointsHallSelected(this.hallId);

  final int hallId;
}

class PointsRechargeRequested extends PointsEvent {
  const PointsRechargeRequested({required this.hallId, required this.amount});

  final int hallId;
  final int amount;
}
