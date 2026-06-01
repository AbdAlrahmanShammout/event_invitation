import 'package:flutter/material.dart';

/// Pill-shaped badge to display entity status with semantic colour.
class StatusBadge extends StatelessWidget {
  const StatusBadge(this.status, {super.key});

  final String status;

  @override
  Widget build(BuildContext context) {
    final (Color bg, Color fg) = _resolveColors(status.toLowerCase());
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        status.toUpperCase(),
        style: TextStyle(
          color: fg,
          fontSize: 11,
          fontWeight: FontWeight.w700,
          letterSpacing: 0.5,
        ),
      ),
    );
  }

  (Color, Color) _resolveColors(String s) {
    return switch (s) {
      'active' => (const Color(0xFFD1FAE5), const Color(0xFF065F46)),
      'approved' => (const Color(0xFFD1FAE5), const Color(0xFF065F46)),
      'completed' => (const Color(0xFFD1FAE5), const Color(0xFF065F46)),
      'sent' => (const Color(0xFFD1FAE5), const Color(0xFF065F46)),
      'suspended' => (const Color(0xFFFFE4E6), const Color(0xFF9F1239)),
      'frozen' => (const Color(0xFFE0F2FE), const Color(0xFF075985)),
      'rejected' => (const Color(0xFFFFE4E6), const Color(0xFF9F1239)),
      'failed' => (const Color(0xFFFFE4E6), const Color(0xFF9F1239)),
      'pending_approval' => (const Color(0xFFFEF3C7), const Color(0xFF92400E)),
      'pending' => (const Color(0xFFFEF3C7), const Color(0xFF92400E)),
      'draft' => (const Color(0xFFF3F4F6), const Color(0xFF374151)),
      'scheduled' => (const Color(0xFFEDE9FE), const Color(0xFF5B21B6)),
      'recharge' => (const Color(0xFFD1FAE5), const Color(0xFF065F46)),
      'debit' => (const Color(0xFFFFE4E6), const Color(0xFF9F1239)),
      _ => (const Color(0xFFF3F4F6), const Color(0xFF374151)),
    };
  }
}
