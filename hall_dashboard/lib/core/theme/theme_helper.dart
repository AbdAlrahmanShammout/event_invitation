import 'package:flutter/material.dart';
import 'package:hall_dashboard/core/theme/text_style_theme.dart';

/// Helper function to get the current color scheme from the context.
/// Returns the ColorScheme based on the current theme (light or dark).
///
/// Example:
/// ```dart
/// final colors = colorTheme(context);
/// Container(color: colors.primary);
/// ```
ColorScheme colorTheme(BuildContext context) {
  return Theme.of(context).colorScheme;
}

/// Helper function to get the custom text style theme from the context.
/// Returns the TextStyleTheme extension with all custom text styles.
///
/// Example:
/// ```dart
/// final textStyles = textTheme(context);
/// Text('Hello', style: textStyles.h1);
/// ```
TextStyleTheme textTheme(BuildContext context) {
  return Theme.of(context).extension<TextStyleTheme>()!;
}
