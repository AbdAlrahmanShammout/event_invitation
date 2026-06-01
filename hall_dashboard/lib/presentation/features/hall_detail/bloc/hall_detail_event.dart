abstract class HallDetailEvent {
  const HallDetailEvent();
}

class HallDetailLoadRequested extends HallDetailEvent {
  const HallDetailLoadRequested(this.hallId);

  final int hallId;
}

class HallDetailStatusChangeRequested extends HallDetailEvent {
  const HallDetailStatusChangeRequested({
    required this.action,
    this.reason,
  });

  final String action;
  final String? reason;
}

class HallDetailRechargeRequested extends HallDetailEvent {
  const HallDetailRechargeRequested(this.amount);

  final int amount;
}
