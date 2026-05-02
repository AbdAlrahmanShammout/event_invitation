import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/di/injection.dart';
import 'package:hall_dashboard/core/theme/theme.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/auth_bloc.dart';
import 'package:hall_dashboard/presentation/features/auth/bloc/password_reset_bloc.dart';
import 'package:hall_dashboard/presentation/features/auth/pages/forgot_password_page.dart';
import 'package:hall_dashboard/presentation/features/auth/pages/login_page.dart';
import 'package:hall_dashboard/presentation/features/auth/pages/reset_password_page.dart';

class FilterApp extends StatelessWidget {
  const FilterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Filter Hall Dashboard',
      debugShowCheckedModeBanner: false,
      theme: lightTheme,
      darkTheme: darkTheme,
      themeMode: ThemeMode.system,
      initialRoute: LoginPage.routeName,
      routes: <String, WidgetBuilder>{
        LoginPage.routeName: (_) => BlocProvider<AuthBloc>(
          create: (_) => getIt<AuthBloc>(),
          child: const LoginPage(),
        ),
        ForgotPasswordPage.routeName: (_) => BlocProvider<PasswordResetBloc>(
          create: (_) => getIt<PasswordResetBloc>(),
          child: const ForgotPasswordPage(),
        ),
        ResetPasswordPage.routeName: (_) => BlocProvider<PasswordResetBloc>(
          create: (_) => getIt<PasswordResetBloc>(),
          child: const ResetPasswordPage(),
        ),
      },
    );
  }
}
