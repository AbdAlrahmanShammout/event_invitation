import 'package:flutter/material.dart';
import 'package:hall_dashboard/core/theme/color_schemes.dart';
import 'package:hall_dashboard/core/theme/text_style_theme.dart';

ThemeData _buildTheme(ColorScheme colorScheme, TextStyleTheme textStyle) {
  return ThemeData(
    fontFamily: 'Poppins',
    useMaterial3: true,
    colorScheme: colorScheme,
    // Page scaffold background — one shade off-white (slate-50 / dark-900)
    scaffoldBackgroundColor: colorScheme.brightness == Brightness.light
        ? const Color(0xFFF8FAFC)
        : const Color(0xFF0F172A),
    // Cards sit on pure white so they pop off the slate-50 background
    cardTheme: CardThemeData(
      elevation: 0,
      color: colorScheme.surface,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: colorScheme.outlineVariant,
        ),
      ),
    ),
    // AppBar
    appBarTheme: AppBarTheme(
      backgroundColor: colorScheme.surface,
      foregroundColor: colorScheme.onSurface,
      elevation: 0,
      scrolledUnderElevation: 0,
      surfaceTintColor: Colors.transparent,
    ),
    // Tabs
    tabBarTheme: TabBarThemeData(
      labelColor: colorScheme.primary,
      unselectedLabelColor: colorScheme.onSurfaceVariant,
      indicatorColor: colorScheme.primary,
      indicatorSize: TabBarIndicatorSize.label,
      labelStyle: const TextStyle(
        fontWeight: FontWeight.w700,
        fontSize: 13,
      ),
      unselectedLabelStyle: const TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 13,
      ),
    ),
    // Divider
    dividerTheme: DividerThemeData(
      color: colorScheme.outlineVariant,
      thickness: 1,
      space: 1,
    ),
    // Filled buttons
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: colorScheme.primary,
        foregroundColor: colorScheme.onPrimary,
        minimumSize: const Size(0, 42),
        padding: const EdgeInsets.symmetric(horizontal: 20),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        textStyle: const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w700,
        ),
      ),
    ),
    // Outlined buttons
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        minimumSize: const Size(0, 42),
        padding: const EdgeInsets.symmetric(horizontal: 20),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        side: BorderSide(color: colorScheme.outlineVariant),
        textStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
      ),
    ),
    // Text buttons
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: colorScheme.primary,
        textStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    ),
    // Data tables
    dataTableTheme: DataTableThemeData(
      headingTextStyle: TextStyle(
        fontWeight: FontWeight.w700,
        fontSize: 13,
        color: colorScheme.onSurfaceVariant,
      ),
      dataTextStyle: TextStyle(
        fontSize: 13,
        color: colorScheme.onSurface,
      ),
      headingRowHeight: 48,
      dataRowMinHeight: 52,
      dataRowMaxHeight: 52,
      columnSpacing: 24,
    ),
    // Input decoration
    inputDecorationTheme: _buildInputTheme(colorScheme),
    extensions: <ThemeExtension<dynamic>>[
      colorScheme.brightness == Brightness.light
          ? TextStyleTheme.light
          : TextStyleTheme.dark,
    ],
  );
}

ThemeData lightTheme = _buildTheme(lightColorScheme, TextStyleTheme.light);
ThemeData darkTheme = _buildTheme(darkColorScheme, TextStyleTheme.dark);

InputDecorationTheme _buildInputTheme(ColorScheme colorScheme) {
  return InputDecorationTheme(
    filled: true,
    fillColor: colorScheme.surfaceContainerHighest.withValues(alpha: 0.6),
    labelStyle: TextStyle(color: colorScheme.onSurfaceVariant),
    hintStyle: TextStyle(
      color: colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
    ),
    floatingLabelStyle: TextStyle(
      color: colorScheme.primary,
      fontWeight: FontWeight.w600,
    ),
    prefixIconColor: colorScheme.onSurfaceVariant,
    suffixIconColor: colorScheme.onSurfaceVariant,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide.none,
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide.none,
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: colorScheme.primary, width: 1.5),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: colorScheme.error, width: 1.2),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: colorScheme.error, width: 1.5),
    ),
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
  );
}
