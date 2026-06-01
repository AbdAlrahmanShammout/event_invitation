import 'package:flutter/material.dart';

// ── Light scheme — clean indigo/slate SaaS palette ───────────────────────────
//
//  Primary   : Indigo 600  (#4F46E5)  — brand accent
//  Secondary : Violet 600  (#7C3AED)  — secondary accent
//  Tertiary  : Sky 500     (#0EA5E9)  — info / highlight
//  Surface   : White       (#FFFFFF)
//  Background: Slate 50    (#F8FAFC)
//  Text      : Slate 900   (#0F172A)  primary
//              Slate 500   (#64748B)  secondary
//
const lightColorScheme = ColorScheme(
  brightness: Brightness.light,

  // ── Primary — indigo ────────────────────────────────────────────────────────
  primary: Color(0xFF4F46E5),
  onPrimary: Color(0xFFFFFFFF),
  primaryContainer: Color(0xFFEEF2FF),
  onPrimaryContainer: Color(0xFF312E81),

  // ── Secondary — violet ──────────────────────────────────────────────────────
  secondary: Color(0xFF7C3AED),
  onSecondary: Color(0xFFFFFFFF),
  secondaryContainer: Color(0xFFEDE9FE),
  onSecondaryContainer: Color(0xFF4C1D95),

  // ── Tertiary — sky ──────────────────────────────────────────────────────────
  tertiary: Color(0xFF0EA5E9),
  onTertiary: Color(0xFFFFFFFF),
  tertiaryContainer: Color(0xFFE0F2FE),
  onTertiaryContainer: Color(0xFF0C4A6E),

  // ── Error — red ─────────────────────────────────────────────────────────────
  error: Color(0xFFDC2626),
  onError: Color(0xFFFFFFFF),
  errorContainer: Color(0xFFFEE2E2),
  onErrorContainer: Color(0xFF7F1D1D),

  // ── Surfaces & backgrounds ──────────────────────────────────────────────────
  surface: Color(0xFFFFFFFF),
  onSurface: Color(0xFF0F172A),
  surfaceContainerHighest: Color(0xFFF1F5F9),
  onSurfaceVariant: Color(0xFF64748B),

  // ── Outlines ────────────────────────────────────────────────────────────────
  outline: Color(0xFF94A3B8),
  outlineVariant: Color(0xFFE2E8F0),

  // ── Inverse ─────────────────────────────────────────────────────────────────
  inverseSurface: Color(0xFF1E293B),
  onInverseSurface: Color(0xFFF8FAFC),
  inversePrimary: Color(0xFF818CF8),

  // ── Misc ────────────────────────────────────────────────────────────────────
  shadow: Color(0xFF000000),
  surfaceTint: Color(0xFF4F46E5),
  scrim: Color(0xFF000000),
);

// ── Dark scheme — deep slate / indigo ────────────────────────────────────────
const darkColorScheme = ColorScheme(
  brightness: Brightness.dark,

  primary: Color(0xFF818CF8),
  onPrimary: Color(0xFF1E1B4B),
  primaryContainer: Color(0xFF3730A3),
  onPrimaryContainer: Color(0xFFE0E7FF),

  secondary: Color(0xFFA78BFA),
  onSecondary: Color(0xFF2E1065),
  secondaryContainer: Color(0xFF4C1D95),
  onSecondaryContainer: Color(0xFFEDE9FE),

  tertiary: Color(0xFF38BDF8),
  onTertiary: Color(0xFF082F49),
  tertiaryContainer: Color(0xFF0369A1),
  onTertiaryContainer: Color(0xFFE0F2FE),

  error: Color(0xFFFCA5A5),
  onError: Color(0xFF7F1D1D),
  errorContainer: Color(0xFF991B1B),
  onErrorContainer: Color(0xFFFEE2E2),

  surface: Color(0xFF0F172A),
  onSurface: Color(0xFFE2E8F0),
  surfaceContainerHighest: Color(0xFF1E293B),
  onSurfaceVariant: Color(0xFF94A3B8),

  outline: Color(0xFF475569),
  outlineVariant: Color(0xFF334155),

  inverseSurface: Color(0xFFE2E8F0),
  onInverseSurface: Color(0xFF0F172A),
  inversePrimary: Color(0xFF4F46E5),

  shadow: Color(0xFF000000),
  surfaceTint: Color(0xFF818CF8),
  scrim: Color(0xFF000000),
);
