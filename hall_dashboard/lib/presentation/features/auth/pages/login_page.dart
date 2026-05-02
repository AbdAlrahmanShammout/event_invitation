import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/auth_bloc.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/auth_event.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/auth_state.dart';
import 'package:hall_dashboard/presentation/features/auth/widgets/auth_layout.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  static const String routeName = '/login';

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isPasswordVisible = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      listener: _handleAuthState,
      builder: (BuildContext context, AuthState state) {
        final bool isSubmitting = state.status == AuthStatus.loading;
        return AuthLayout(
          title: 'Manage every hall invitation from one clean dashboard.',
          subtitle:
              'Sign in to create event invitations, approve guest submissions, and monitor WhatsApp delivery.',
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Text('Welcome back', style: textTheme(context).h4),
                const SizedBox(height: 8),
                Text(
                  'Use your hall admin account to continue.',
                  style: textTheme(
                    context,
                  ).mid.copyWith(color: colorTheme(context).onSurfaceVariant),
                ),
                const SizedBox(height: 28),
                TextFormField(
                  controller: _emailController,
                  style: textTheme(
                    context,
                  ).paragraph.copyWith(color: colorTheme(context).onSurface),
                  cursorColor: colorTheme(context).primary,
                  keyboardType: TextInputType.emailAddress,
                  textInputAction: TextInputAction.next,
                  decoration: const InputDecoration(
                    labelText: 'Email address',
                    hintText: 'owner@example.com',
                    prefixIcon: Icon(Icons.email_outlined),
                  ),
                  validator: _validateEmail,
                ),
                const SizedBox(height: 18),
                TextFormField(
                  controller: _passwordController,
                  style: textTheme(
                    context,
                  ).paragraph.copyWith(color: colorTheme(context).onSurface),
                  cursorColor: colorTheme(context).primary,
                  obscureText: !_isPasswordVisible,
                  textInputAction: TextInputAction.done,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    hintText: 'Enter your password',
                    prefixIcon: const Icon(Icons.lock_outline),
                    suffixIcon: IconButton(
                      onPressed: _togglePasswordVisibility,
                      icon: Icon(
                        _isPasswordVisible
                            ? Icons.visibility_off_outlined
                            : Icons.visibility_outlined,
                      ),
                    ),
                  ),
                  onFieldSubmitted: (_) => _submitLogin(context),
                  validator: _validatePassword,
                ),
                const SizedBox(height: 12),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: _openForgotPassword,
                    child: const Text('Forgot password?'),
                  ),
                ),
                const SizedBox(height: 20),
                FilledButton(
                  onPressed: isSubmitting ? null : () => _submitLogin(context),
                  child: isSubmitting
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Log in'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _handleAuthState(BuildContext context, AuthState state) {
    if (state.status != AuthStatus.authenticated &&
        state.status != AuthStatus.failure) {
      return;
    }
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(state.message ?? 'Authentication status changed.'),
        backgroundColor: state.status == AuthStatus.failure
            ? colorTheme(context).error
            : null,
      ),
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

  String? _validatePassword(String? value) {
    final String password = value ?? '';
    if (password.isEmpty) {
      return 'Password is required.';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters.';
    }
    return null;
  }

  void _togglePasswordVisibility() {
    setState(() {
      _isPasswordVisible = !_isPasswordVisible;
    });
  }

  void _openForgotPassword() {
    Navigator.of(context).pushNamed('/forgot-password');
  }

  void _submitLogin(BuildContext context) {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    context.read<AuthBloc>().add(
      LoginSubmitted(
        email: _emailController.text,
        password: _passwordController.text,
      ),
    );
  }
}
