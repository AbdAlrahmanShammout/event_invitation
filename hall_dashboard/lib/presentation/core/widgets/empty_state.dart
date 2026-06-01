import 'package:flutter/material.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';

class EmptyState extends StatelessWidget {
  const EmptyState({super.key, this.message = 'No data found.'});

  final String message;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Icon(
            Icons.inbox_outlined,
            size: 56,
            color: colorTheme(context).onSurfaceVariant.withValues(alpha: 0.4),
          ),
          const SizedBox(height: 12),
          Text(
            message,
            style: TextStyle(
              color: colorTheme(context).onSurfaceVariant,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
