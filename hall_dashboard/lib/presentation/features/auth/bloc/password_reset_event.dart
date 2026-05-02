abstract class PasswordResetEvent {
  const PasswordResetEvent();
}

class PasswordResetRequested extends PasswordResetEvent {
  const PasswordResetRequested({required this.email});

  final String email;
}

class ResetPasswordTokenVerified extends PasswordResetEvent {
  const ResetPasswordTokenVerified({required this.token, required this.userId});

  final String token;
  final int userId;
}

class PasswordResetSubmitted extends PasswordResetEvent {
  const PasswordResetSubmitted({
    required this.token,
    required this.userId,
    required this.password,
  });

  final String token;
  final int userId;
  final String password;
}
