enum PasswordResetStatus { initial, loading, tokenVerified, success, failure }

class PasswordResetState {
  const PasswordResetState({required this.status, this.message});

  const PasswordResetState.initial()
    : status = PasswordResetStatus.initial,
      message = null;

  final PasswordResetStatus status;
  final String? message;

  PasswordResetState copyWith({PasswordResetStatus? status, String? message}) {
    return PasswordResetState(status: status ?? this.status, message: message);
  }
}
