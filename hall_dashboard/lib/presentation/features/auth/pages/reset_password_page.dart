import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/password_reset_bloc.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/password_reset_event.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/password_reset_state.dart';
import 'package:hall_dashboard/presentation/features/auth/widgets/auth_layout.dart';

class ResetPasswordPage extends StatefulWidget {
  const ResetPasswordPage({super.key});

  static const String routeName = '/reset-password';

  @override
  State<ResetPasswordPage> createState() => _ResetPasswordPageState();
}

class _ResetPasswordPageState extends State<ResetPasswordPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();
  bool _isPasswordVisible = false;
  bool _hasResetPassword = false;
  bool _hasStartedVerification = false;
  bool _hasVerifiedToken = false;

  String get _token {
    return _getQueryParameter('token');
  }

  String get _userId {
    return _getQueryParameter('userId');
  }

  bool get _hasResetParams {
    return _token.isNotEmpty && int.tryParse(_userId) != null;
  }

  int? get _parsedUserId {
    return int.tryParse(_userId);
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _verifyResetToken());
  }

  @override
  void dispose() {
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<PasswordResetBloc, PasswordResetState>(
      listener: _handlePasswordResetState,
      builder: (BuildContext context, PasswordResetState state) {
        return AuthLayout(
          title: 'Set a new secure password for your hall account.',
          subtitle:
              'The reset link carries the token and user reference required by the backend password reset flow.',
          child: _buildContent(context, state),
        );
      },
    );
  }

  Widget _buildContent(BuildContext context, PasswordResetState state) {
    if (!_hasResetParams) {
      return _ResetLinkStatus(
        title: 'Invalid reset link',
        message:
            'This password reset link is missing token or user information.',
        icon: Icons.error_outline,
        color: colorTheme(context).error,
        action: _buildBackToLoginButton(),
      );
    }
    if (_hasVerifiedToken) {
      return _buildResetPasswordForm(context, state);
    }
    if (state.status == PasswordResetStatus.loading &&
        !_hasResetPassword &&
        state.message == null) {
      return _ResetLinkStatus(
        title: 'Checking reset link',
        message: 'Please wait while we verify your password reset token.',
        icon: Icons.hourglass_top_rounded,
        color: colorTheme(context).primary,
        isLoading: true,
      );
    }
    if (state.status == PasswordResetStatus.failure &&
        !_hasResetPassword &&
        !_hasVerifiedToken) {
      return _ResetLinkStatus(
        title: 'Reset link expired',
        message:
            state.message ?? 'This password reset link is invalid or expired.',
        icon: Icons.link_off_rounded,
        color: colorTheme(context).error,
        action: _buildBackToLoginButton(),
      );
    }
    if (state.status != PasswordResetStatus.tokenVerified &&
        state.status != PasswordResetStatus.success &&
        !_hasResetPassword) {
      return _ResetLinkStatus(
        title: 'Preparing reset form',
        message: 'We are preparing your secure password reset form.',
        icon: Icons.hourglass_top_rounded,
        color: colorTheme(context).primary,
        isLoading: true,
      );
    }
    return _buildResetPasswordForm(context, state);
  }

  Widget _buildResetPasswordForm(
    BuildContext context,
    PasswordResetState state,
  ) {
    final bool isSubmitting = state.status == PasswordResetStatus.loading;
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Text('Reset password', style: textTheme(context).h4),
          const SizedBox(height: 8),
          Text(
            'Choose a strong password before returning to the login page.',
            style: textTheme(
              context,
            ).mid.copyWith(color: colorTheme(context).onSurfaceVariant),
          ),
          const SizedBox(height: 24),
          _ResetLinkNotice(message: state.message),
          const SizedBox(height: 24),
          TextFormField(
            controller: _passwordController,
            style: textTheme(
              context,
            ).paragraph.copyWith(color: colorTheme(context).onSurface),
            cursorColor: colorTheme(context).primary,
            obscureText: !_isPasswordVisible,
            textInputAction: TextInputAction.next,
            decoration: InputDecoration(
              labelText: 'New password',
              hintText: 'At least 8 characters',
              prefixIcon: const Icon(Icons.lock_reset_outlined),
              suffixIcon: IconButton(
                onPressed: _togglePasswordVisibility,
                icon: Icon(
                  _isPasswordVisible
                      ? Icons.visibility_off_outlined
                      : Icons.visibility_outlined,
                ),
              ),
            ),
            validator: _validatePassword,
          ),
          const SizedBox(height: 18),
          TextFormField(
            controller: _confirmPasswordController,
            style: textTheme(
              context,
            ).paragraph.copyWith(color: colorTheme(context).onSurface),
            cursorColor: colorTheme(context).primary,
            obscureText: !_isPasswordVisible,
            textInputAction: TextInputAction.done,
            decoration: const InputDecoration(
              labelText: 'Confirm password',
              hintText: 'Repeat the new password',
              prefixIcon: Icon(Icons.check_circle_outline),
            ),
            onFieldSubmitted: (_) => _submitResetPassword(context),
            validator: _validateConfirmedPassword,
          ),
          const SizedBox(height: 24),
          FilledButton(
            onPressed: isSubmitting
                ? null
                : () => _submitResetPassword(context),
            child: isSubmitting
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Text('Reset password'),
          ),
          const SizedBox(height: 12),
          TextButton.icon(
            onPressed: _openLogin,
            icon: const Icon(Icons.arrow_back),
            label: Text(
              _hasResetPassword ? 'Continue to login' : 'Back to login',
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBackToLoginButton() {
    return TextButton.icon(
      onPressed: _openLogin,
      icon: const Icon(Icons.arrow_back),
      label: const Text('Back to login'),
    );
  }

  void _handlePasswordResetState(
    BuildContext context,
    PasswordResetState state,
  ) {
    if (state.status == PasswordResetStatus.tokenVerified) {
      setState(() {
        _hasVerifiedToken = true;
      });
      return;
    }
    if (state.status == PasswordResetStatus.success) {
      setState(() {
        _hasResetPassword = true;
      });
    }
    if (state.status != PasswordResetStatus.success &&
        state.status != PasswordResetStatus.failure) {
      return;
    }
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(state.message ?? 'Password reset status changed.'),
        backgroundColor: state.status == PasswordResetStatus.failure
            ? colorTheme(context).error
            : null,
      ),
    );
  }

  String _getQueryParameter(String name) {
    final String? queryValue = Uri.base.queryParameters[name];
    if (queryValue != null) {
      return queryValue;
    }
    final String fragment = Uri.base.fragment;
    if (fragment.isEmpty) {
      return '';
    }
    return Uri.parse(fragment).queryParameters[name] ?? '';
  }

  void _verifyResetToken() {
    if (_hasStartedVerification || !_hasResetParams || !mounted) {
      return;
    }
    _hasStartedVerification = true;
    context.read<PasswordResetBloc>().add(
      ResetPasswordTokenVerified(token: _token, userId: _parsedUserId!),
    );
  }

  String? _validatePassword(String? value) {
    final String password = value ?? '';
    final bool hasLetter = RegExp('[A-Za-z]').hasMatch(password);
    final bool hasNumberOrSymbol = RegExp(r'[0-9\W_]').hasMatch(password);
    if (password.isEmpty) {
      return 'Password is required.';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters.';
    }
    if (!hasLetter || !hasNumberOrSymbol) {
      return 'Use letters and at least one number or symbol.';
    }
    return null;
  }

  String? _validateConfirmedPassword(String? value) {
    if (value != _passwordController.text) {
      return 'Passwords do not match.';
    }
    return null;
  }

  void _togglePasswordVisibility() {
    setState(() {
      _isPasswordVisible = !_isPasswordVisible;
    });
  }

  void _openLogin() {
    Navigator.of(context).pushReplacementNamed('/login');
  }

  void _submitResetPassword(BuildContext context) {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    final int? userId = _parsedUserId;
    if (userId == null) {
      return;
    }
    context.read<PasswordResetBloc>().add(
      PasswordResetSubmitted(
        token: _token,
        userId: userId,
        password: _passwordController.text,
      ),
    );
  }
}

class _ResetLinkNotice extends StatelessWidget {
  const _ResetLinkNotice({required this.message});

  final String? message;

  @override
  Widget build(BuildContext context) {
    final Color noticeColor = colorTheme(context).primary;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: noticeColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: noticeColor.withValues(alpha: 0.3)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Icon(Icons.verified_user_outlined, color: noticeColor),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              message ?? 'Reset link verified. You can now set a new password.',
              style: textTheme(context).mid.copyWith(height: 1.4),
            ),
          ),
        ],
      ),
    );
  }
}

class _ResetLinkStatus extends StatelessWidget {
  const _ResetLinkStatus({
    required this.title,
    required this.message,
    required this.icon,
    required this.color,
    this.action,
    this.isLoading = false,
  });

  final String title;
  final String message;
  final IconData icon;
  final Color color;
  final Widget? action;
  final bool isLoading;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: color.withValues(alpha: 0.3)),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              isLoading
                  ? SizedBox(
                      width: 24,
                      height: 24,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: color,
                      ),
                    )
                  : Icon(icon, color: color),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(title, style: textTheme(context).h6),
                    const SizedBox(height: 8),
                    Text(
                      message,
                      style: textTheme(context).mid.copyWith(
                        color: colorTheme(context).onSurfaceVariant,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        if (action != null) ...<Widget>[const SizedBox(height: 18), action!],
      ],
    );
  }
}
