import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/domain/usecase/auth/request_password_reset_use_case.dart';
import 'package:hall_dashboard/domain/usecase/auth/reset_password_use_case.dart';
import 'package:hall_dashboard/domain/usecase/auth/verify_reset_password_token_use_case.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/password_reset_event.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/password_reset_state.dart';
import 'package:injectable/injectable.dart';

@injectable
class PasswordResetBloc extends Bloc<PasswordResetEvent, PasswordResetState> {
  PasswordResetBloc({
    required RequestPasswordResetUseCase requestPasswordResetUseCase,
    required VerifyResetPasswordTokenUseCase verifyResetPasswordTokenUseCase,
    required ResetPasswordUseCase resetPasswordUseCase,
  }) : _requestPasswordResetUseCase = requestPasswordResetUseCase,
       _verifyResetPasswordTokenUseCase = verifyResetPasswordTokenUseCase,
       _resetPasswordUseCase = resetPasswordUseCase,
       super(const PasswordResetState.initial()) {
    on<PasswordResetRequested>(_handlePasswordResetRequested);
    on<ResetPasswordTokenVerified>(_handleResetPasswordTokenVerified);
    on<PasswordResetSubmitted>(_handlePasswordResetSubmitted);
  }

  final RequestPasswordResetUseCase _requestPasswordResetUseCase;
  final VerifyResetPasswordTokenUseCase _verifyResetPasswordTokenUseCase;
  final ResetPasswordUseCase _resetPasswordUseCase;

  Future<void> _handlePasswordResetRequested(
    PasswordResetRequested event,
    Emitter<PasswordResetState> emit,
  ) async {
    emit(state.copyWith(status: PasswordResetStatus.loading));
    try {
      final String message = await _requestPasswordResetUseCase.execute(
        email: event.email.trim().toLowerCase(),
      );
      emit(
        state.copyWith(status: PasswordResetStatus.success, message: message),
      );
    } catch (error) {
      emit(
        state.copyWith(
          status: PasswordResetStatus.failure,
          message: 'Unable to request a password reset link.',
        ),
      );
    }
  }

  Future<void> _handleResetPasswordTokenVerified(
    ResetPasswordTokenVerified event,
    Emitter<PasswordResetState> emit,
  ) async {
    emit(state.copyWith(status: PasswordResetStatus.loading));
    try {
      final String message = await _verifyResetPasswordTokenUseCase.execute(
        token: event.token,
        userId: event.userId,
      );
      emit(
        state.copyWith(
          status: PasswordResetStatus.tokenVerified,
          message: message,
        ),
      );
    } catch (error) {
      emit(
        state.copyWith(
          status: PasswordResetStatus.failure,
          message: 'This password reset link is invalid or expired.',
        ),
      );
    }
  }

  Future<void> _handlePasswordResetSubmitted(
    PasswordResetSubmitted event,
    Emitter<PasswordResetState> emit,
  ) async {
    emit(state.copyWith(status: PasswordResetStatus.loading));
    try {
      final String message = await _resetPasswordUseCase.execute(
        token: event.token,
        userId: event.userId,
        password: event.password,
      );
      emit(
        state.copyWith(status: PasswordResetStatus.success, message: message),
      );
    } catch (error) {
      emit(
        state.copyWith(
          status: PasswordResetStatus.failure,
          message: 'Unable to reset password. Please request a new link.',
        ),
      );
    }
  }
}
