import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:hall_dashboard/core/di/injection.dart';
import 'package:hall_dashboard/presentation/core/app/filter_app.dart';

void main() {
  testWidgets('shows login page and opens forgot password page', (
    WidgetTester tester,
  ) async {
    await getIt.reset();
    configureInjection('');
    await tester.binding.setSurfaceSize(const Size(1200, 900));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(const FilterApp());
    expect(find.text('Welcome back'), findsOneWidget);
    expect(find.text('Email address'), findsOneWidget);
    expect(find.text('Password'), findsOneWidget);

    await tester.tap(find.text('Forgot password?'));
    await tester.pumpAndSettle();

    expect(find.text('Forgot password'), findsOneWidget);
    expect(find.text('Send reset link'), findsOneWidget);
  });
}
