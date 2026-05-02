import 'package:flutter/material.dart';
import 'package:hall_dashboard/core/di/injection.dart';
import 'package:hall_dashboard/presentation/core/app/filter_app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  configureInjection('');
  runApp(const FilterApp());
}
