import 'package:flutter/material.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';

/// KPI summary card used on the Overview page.
/// Uses [FittedBox] on the value so it never overflows the card width,
/// and allows the label to wrap onto two lines.
class StatCard extends StatelessWidget {
  const StatCard({
    super.key,
    required this.label,
    required this.value,
    required this.icon,
    this.color,
    this.subtitle,
  });

  final String label;
  final String value;
  final IconData icon;
  final Color? color;
  final String? subtitle;

  @override
  Widget build(BuildContext context) {
    final Color cardColor = color ?? colorTheme(context).primary;
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: colorTheme(context).outlineVariant.withValues(alpha: 0.2),
        ),
      ),
      color: colorTheme(context).surface,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            // Icon badge
            Container(
              padding: const EdgeInsets.all(9),
              decoration: BoxDecoration(
                color: cardColor.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: cardColor, size: 20),
            ),
            const SizedBox(height: 14),
            // Value — scales down if it doesn't fit
            FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Text(
                value,
                style: TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.w800,
                  color: colorTheme(context).onSurface,
                  height: 1.1,
                ),
              ),
            ),
            const SizedBox(height: 5),
            // Label — wraps up to 2 lines
            Text(
              label,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: colorTheme(context).onSurfaceVariant,
                height: 1.3,
              ),
            ),
            if (subtitle != null) ...<Widget>[
              const SizedBox(height: 3),
              Text(
                subtitle!,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 10,
                  color: colorTheme(
                    context,
                  ).onSurfaceVariant.withValues(alpha: 0.65),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
