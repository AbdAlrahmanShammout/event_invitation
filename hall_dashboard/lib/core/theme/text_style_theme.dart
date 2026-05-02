import 'package:flutter/material.dart';

/// Custom text style theme extension for the application.
/// Provides a comprehensive set of text styles with different sizes and weights.
/// Supports both light and dark themes with automatic color switching.
///
/// Usage:
/// ```dart
/// Text('Title', style: textTheme(context).h1);
/// Text('Body', style: textTheme(context).paragraph);
/// ```
@immutable
class TextStyleTheme extends ThemeExtension<TextStyleTheme> {
  /// Extra large text style (40px, weight 800) - For hero sections
  final TextStyle xLarge;

  /// Large text style (38px, weight 800) - For main headings
  final TextStyle large;

  /// Heading 1 style (36px, weight 800) - Primary page titles
  final TextStyle h1;

  /// Heading 2 style (32px, weight 800) - Section titles
  final TextStyle h2;

  /// Heading 3 style (28px, weight 700) - Subsection titles
  final TextStyle h3;

  /// Heading 4 style (24px, weight 700) - Card titles
  final TextStyle h4;

  /// Heading 5 style (20px, weight 700) - Small headings
  final TextStyle h5;

  /// Heading 6 style (18px, weight 600) - Minor headings
  final TextStyle h6;

  /// Paragraph style (16px, weight 500) - Main body text
  final TextStyle paragraph;

  /// Medium text style (14px, weight 500) - Secondary body text
  final TextStyle mid;

  /// Small text style (12px, weight 500) - Captions and labels
  final TextStyle small;

  /// Extra small text style (10px, weight 400) - Fine print
  final TextStyle xSmall;

  /// Tiny text style (8px, weight 400) - Minimal text elements
  final TextStyle tiny;

  const TextStyleTheme({
    required this.xLarge,
    required this.large,
    required this.h1,
    required this.h2,
    required this.h3,
    required this.h4,
    required this.h5,
    required this.h6,
    required this.paragraph,
    required this.mid,
    required this.small,
    required this.xSmall,
    required this.tiny,
  });

  @override
  TextStyleTheme copyWith({
    TextStyle? xLarge,
    TextStyle? large,
    TextStyle? h1,
    TextStyle? h2,
    TextStyle? h3,
    TextStyle? h4,
    TextStyle? h5,
    TextStyle? h6,
    TextStyle? paragraph,
    TextStyle? mid,
    TextStyle? small,
    TextStyle? xSmall,
    TextStyle? tiny,
  }) {
    return TextStyleTheme(
      xLarge: xLarge ?? this.xLarge,
      large: large ?? this.large,
      h1: h1 ?? this.h1,
      h2: h2 ?? this.h2,
      h3: h3 ?? this.h3,
      h4: h4 ?? this.h4,
      h5: h5 ?? this.h5,
      h6: h6 ?? this.h6,
      paragraph: paragraph ?? this.paragraph,
      mid: mid ?? this.mid,
      small: small ?? this.small,
      xSmall: xSmall ?? this.xSmall,
      tiny: tiny ?? this.tiny,
    );
  }

  /// Controls how the properties change on theme transitions.
  /// Provides smooth interpolation between light and dark themes.
  @override
  TextStyleTheme lerp(ThemeExtension<TextStyleTheme>? other, double t) {
    if (other is! TextStyleTheme) {
      return this;
    }
    return TextStyleTheme(
      xLarge: TextStyle.lerp(xLarge, other.xLarge, t)!,
      large: TextStyle.lerp(large, other.large, t)!,
      h1: TextStyle.lerp(h1, other.h1, t)!,
      h2: TextStyle.lerp(h2, other.h2, t)!,
      h3: TextStyle.lerp(h3, other.h3, t)!,
      h4: TextStyle.lerp(h4, other.h4, t)!,
      h5: TextStyle.lerp(h5, other.h5, t)!,
      h6: TextStyle.lerp(h6, other.h6, t)!,
      paragraph: TextStyle.lerp(paragraph, other.paragraph, t)!,
      mid: TextStyle.lerp(mid, other.mid, t)!,
      small: TextStyle.lerp(small, other.small, t)!,
      xSmall: TextStyle.lerp(xSmall, other.xSmall, t)!,
      tiny: TextStyle.lerp(tiny, other.tiny, t)!,
    );
  }

  /// Controls how the instance is displayed when passed to the `print()` method.
  /// Useful for debugging theme-related issues.
  @override
  String toString() =>
      '''TextStyleTheme(
         xLarge: $xLarge,
         large: $large,
         h1: $h1,
         h2: $h2,
         h3: $h3,
         h4: $h4,
         h5: $h5,
         h6: $h6,
         paragraph: $paragraph,
         mid: $mid,
         small: $small,
         xSmall: $xSmall,
         tiny: $tiny,
      )''';

  /// Light theme text styles.
  /// Uses black color for all text to ensure good contrast on light backgrounds.
  static TextStyleTheme light = const TextStyleTheme(
    xLarge: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w800,
      fontSize: 40,
    ),
    large: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w800,
      fontSize: 38,
    ),
    h1: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w800,
      fontSize: 36,
    ),
    h2: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w800,
      fontSize: 32,
    ),
    h3: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w700,
      fontSize: 28,
    ),
    h4: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w700,
      fontSize: 24,
    ),
    h5: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w700,
      fontSize: 20,
    ),
    h6: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w600,
      fontSize: 18,
    ),
    paragraph: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w500,
      fontSize: 16,
    ),
    mid: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w500,
      fontSize: 14,
    ),
    small: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w500,
      fontSize: 12,
    ),
    xSmall: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w400,
      fontSize: 10,
    ),
    tiny: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w400,
      fontSize: 8,
    ),
  );

  /// Dark theme text styles.
  /// Uses white color for all text to ensure good contrast on dark backgrounds.
  static TextStyleTheme dark = const TextStyleTheme(
    xLarge: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w800,
      fontSize: 40,
    ),
    large: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w800,
      fontSize: 38,
    ),
    h1: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w800,
      fontSize: 36,
    ),
    h2: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w800,
      fontSize: 32,
    ),
    h3: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w700,
      fontSize: 28,
    ),
    h4: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w700,
      fontSize: 24,
    ),
    h5: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w700,
      fontSize: 20,
    ),
    h6: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w600,
      fontSize: 18,
    ),
    paragraph: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w500,
      fontSize: 16,
    ),
    mid: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w500,
      fontSize: 14,
    ),
    small: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w500,
      fontSize: 12,
    ),
    xSmall: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w400,
      fontSize: 10,
    ),
    tiny: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.w400,
      fontSize: 8,
    ),
  );
}

/// Example usage:
/// ```dart
/// // Basic usage
/// Text('Title', style: textTheme(context).h1);
///
/// // With customization
/// Text(
///   'Custom text',
///   style: textTheme(context).h1.copyWith(
///     color: Colors.red,
///     fontSize: 20,
///   ),
/// );
///
/// // Accessing colors
/// Text(
///   'Colored text',
///   style: textTheme(context).paragraph.copyWith(
///     color: colorTheme(context).primary,
///   ),
/// );
/// ```
