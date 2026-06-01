import 'package:flutter/material.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';

class ErrorState extends StatelessWidget {
  const ErrorState({super.key, required this.message, this.onRetry});

  final String message;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Icon(
            Icons.error_outline,
            size: 56,
            color: colorTheme(context).error,
          ),
          const SizedBox(height: 12),
          Text(
            message,
            style: TextStyle(
              color: colorTheme(context).onSurfaceVariant,
              fontSize: 14,
            ),
          ),
          if (onRetry != null) ...<Widget>[
            const SizedBox(height: 16),
            OutlinedButton.icon(
              onPressed: onRetry,
              icon: const Icon(Icons.refresh),
              label: const Text('Retry'),
            ),
          ],
        ],
      ),
    );
  }
}
