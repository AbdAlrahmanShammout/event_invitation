import 'package:flutter/material.dart';
import 'package:hall_dashboard/core/theme/color_schemes.dart';
import 'package:hall_dashboard/core/theme/text_style_theme.dart';

/// Base theme configuration shared between light and dark themes.
/// Sets the default font family for the entire application.
ThemeData _baseTheme = ThemeData(
  fontFamily: "Poppins",
  useMaterial3: true,
  filledButtonTheme: FilledButtonThemeData(
    style: FilledButton.styleFrom(
      minimumSize: const Size.fromHeight(54),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
    ),
  ),
);

/// Light theme configuration for the application.
/// Combines the base theme with light color scheme and text styles.
ThemeData lightTheme = _baseTheme.copyWith(
  colorScheme: lightColorScheme,
  inputDecorationTheme: _buildInputDecorationTheme(lightColorScheme),
  extensions: <ThemeExtension<dynamic>>[TextStyleTheme.light],
);

/// Dark theme configuration for the application.
/// Combines the base theme with dark color scheme and text styles.
ThemeData darkTheme = _baseTheme.copyWith(
  colorScheme: darkColorScheme,
  inputDecorationTheme: _buildInputDecorationTheme(darkColorScheme),
  extensions: <ThemeExtension<dynamic>>[TextStyleTheme.dark],
);

InputDecorationTheme _buildInputDecorationTheme(ColorScheme colorScheme) {
  return InputDecorationTheme(
    filled: true,
    fillColor: colorScheme.surfaceContainerHighest.withValues(alpha: 0.55),
    labelStyle: TextStyle(color: colorScheme.onSurfaceVariant),
    hintStyle: TextStyle(
      color: colorScheme.onSurfaceVariant.withValues(alpha: 0.68),
    ),
    floatingLabelStyle: TextStyle(
      color: colorScheme.primary,
      fontWeight: FontWeight.w600,
    ),
    prefixIconColor: colorScheme.onSurfaceVariant,
    suffixIconColor: colorScheme.onSurfaceVariant,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: BorderSide.none,
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: BorderSide.none,
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: BorderSide(color: colorScheme.primary, width: 1.4),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: BorderSide(color: colorScheme.error, width: 1.2),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: BorderSide(color: colorScheme.error, width: 1.4),
    ),
    contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 18),
  );
}
