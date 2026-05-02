import 'package:hall_dashboard/domain/entities/auth/auth_session.dart';

enum AuthStatus { initial, loading, authenticated, failure }

class AuthState {
  const AuthState({required this.status, this.session, this.message});

  const AuthState.initial()
    : status = AuthStatus.initial,
      session = null,
      message = null;

  final AuthStatus status;
  final AuthSession? session;
  final String? message;

  AuthState copyWith({
    AuthStatus? status,
    AuthSession? session,
    String? message,
  }) {
    return AuthState(
      status: status ?? this.status,
      session: session ?? this.session,
      message: message,
    );
  }
}
