import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/password_reset_bloc.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/password_reset_event.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/password_reset_state.dart';
import 'package:hall_dashboard/presentation/features/auth/widgets/auth_layout.dart';

class ForgotPasswordPage extends StatefulWidget {
  const ForgotPasswordPage({super.key});

  static const String routeName = '/forgot-password';

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<PasswordResetBloc, PasswordResetState>(
      listener: _handlePasswordResetState,
      builder: (BuildContext context, PasswordResetState state) {
        final bool isSubmitting = state.status == PasswordResetStatus.loading;
        return AuthLayout(
          title: 'Recover access without interrupting hall operations.',
          subtitle:
              'Enter the hall admin email and Filter will send password reset instructions if the account exists.',
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Text('Forgot password', style: textTheme(context).h4),
                const SizedBox(height: 8),
                Text(
                  'We will send a secure reset link to the registered email address.',
                  style: textTheme(
                    context,
                  ).mid.copyWith(color: colorTheme(context).onSurfaceVariant),
                ),
                const SizedBox(height: 28),
                if (_hasSubmitted) ...<Widget>[
                  _SuccessNotice(email: _emailController.text.trim()),
                  const SizedBox(height: 24),
                ],
                TextFormField(
                  controller: _emailController,
                  style: textTheme(
                    context,
                  ).paragraph.copyWith(color: colorTheme(context).onSurface),
                  cursorColor: colorTheme(context).primary,
                  keyboardType: TextInputType.emailAddress,
                  textInputAction: TextInputAction.done,
                  decoration: const InputDecoration(
                    labelText: 'Email address',
                    hintText: 'owner@example.com',
                    prefixIcon: Icon(Icons.email_outlined),
                  ),
                  onFieldSubmitted: (_) => _submitResetRequest(context),
                  validator: _validateEmail,
                ),
                const SizedBox(height: 24),
                FilledButton(
                  onPressed: isSubmitting
                      ? null
                      : () => _submitResetRequest(context),
                  child: isSubmitting
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Send reset link'),
                ),
                const SizedBox(height: 12),
                TextButton.icon(
                  onPressed: _openLogin,
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('Back to login'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  String? _validateEmail(String? value) {
    final String email = value?.trim() ?? '';
    final bool hasValidEmail = RegExp(
      r'^[^@\s]+@[^@\s]+\.[^@\s]+$',
    ).hasMatch(email);
    if (email.isEmpty) {
      return 'Email is required.';
    }
    if (!hasValidEmail) {
      return 'Enter a valid email address.';
    }
    return null;
  }

  void _openLogin() {
    Navigator.of(context).pushReplacementNamed('/login');
  }

  void _handlePasswordResetState(
    BuildContext context,
    PasswordResetState state,
  ) {
    if (state.status == PasswordResetStatus.success) {
      setState(() {
        _hasSubmitted = true;
      });
      return;
    }
    if (state.status != PasswordResetStatus.failure) {
      return;
    }
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(state.message ?? 'Unable to request password reset.'),
        backgroundColor: colorTheme(context).error,
      ),
    );
  }

  void _submitResetRequest(BuildContext context) {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    context.read<PasswordResetBloc>().add(
      PasswordResetRequested(email: _emailController.text),
    );
  }
}

class _SuccessNotice extends StatelessWidget {
  const _SuccessNotice({required this.email});

  final String email;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: colorTheme(context).primary.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: colorTheme(context).primary.withValues(alpha: 0.3),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Icon(
            Icons.mark_email_read_outlined,
            color: colorTheme(context).primary,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'If $email is registered, a password reset link has been sent.',
              style: textTheme(context).mid.copyWith(height: 1.4),
            ),
          ),
        ],
      ),
    );
  }
}
