import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/domain/entities/auth/auth_session.dart';
import 'package:hall_dashboard/domain/usecase/auth/login_use_case.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/auth_event.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/auth_state.dart';
import 'package:injectable/injectable.dart';

@injectable
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc(this._loginUseCase) : super(const AuthState.initial()) {
    on<LoginSubmitted>(_handleLoginSubmitted);
  }

  final LoginUseCase _loginUseCase;

  Future<void> _handleLoginSubmitted(
    LoginSubmitted event,
    Emitter<AuthState> emit,
  ) async {
    emit(state.copyWith(status: AuthStatus.loading));
    try {
      final AuthSession session = await _loginUseCase.execute(
        email: event.email.trim().toLowerCase(),
        password: event.password,
      );
      emit(
        state.copyWith(
          status: AuthStatus.authenticated,
          session: session,
          message: 'Logged in successfully.',
        ),
      );
    } catch (error) {
      emit(
        state.copyWith(
          status: AuthStatus.failure,
          message: 'Unable to log in. Please check your credentials.',
        ),
      );
    }
  }
}
