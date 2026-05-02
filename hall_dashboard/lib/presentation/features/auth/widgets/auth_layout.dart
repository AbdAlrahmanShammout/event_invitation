import 'package:flutter/material.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';

class AuthLayout extends StatelessWidget {
  const AuthLayout({
    super.key,
    required this.title,
    required this.subtitle,
    required this.child,
  });

  final String title;
  final String subtitle;
  final Widget child;

  static const double _desktopBreakpoint = 900;
  static const double _cardMaxWidth = 460;
  static const double _panelMaxWidth = 1180;
  static const EdgeInsets _pagePadding = EdgeInsets.all(32);

  @override
  Widget build(BuildContext context) {
    final bool isDesktop =
        MediaQuery.sizeOf(context).width >= _desktopBreakpoint;
    return Scaffold(
      backgroundColor: colorTheme(context).surface,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: _panelMaxWidth),
            child: Padding(
              padding: _pagePadding,
              child: isDesktop
                  ? _buildDesktopLayout(context)
                  : _buildMobileLayout(context),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDesktopLayout(BuildContext context) {
    return Row(
      children: <Widget>[
        Expanded(
          child: _BrandPanel(title: title, subtitle: subtitle),
        ),
        const SizedBox(width: 40),
        SizedBox(
          width: _cardMaxWidth,
          child: _AuthCard(child: child),
        ),
      ],
    );
  }

  Widget _buildMobileLayout(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          _CompactHeader(title: title, subtitle: subtitle),
          const SizedBox(height: 28),
          _AuthCard(child: child),
        ],
      ),
    );
  }
}

class _BrandPanel extends StatelessWidget {
  const _BrandPanel({required this.title, required this.subtitle});

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: double.infinity,
      padding: const EdgeInsets.all(40),
      decoration: BoxDecoration(
        color: colorTheme(context).primary,
        borderRadius: BorderRadius.circular(32),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          _BrandLogo(color: colorTheme(context).onPrimary),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                title,
                style: textTheme(
                  context,
                ).h1.copyWith(color: colorTheme(context).onPrimary),
              ),
              const SizedBox(height: 16),
              Text(
                subtitle,
                style: textTheme(context).paragraph.copyWith(
                  color: colorTheme(context).onPrimary.withValues(alpha: 0.84),
                  height: 1.5,
                ),
              ),
            ],
          ),
          Text(
            'Hall dashboard for invitations, approvals, and WhatsApp delivery.',
            style: textTheme(context).mid.copyWith(
              color: colorTheme(context).onPrimary.withValues(alpha: 0.72),
            ),
          ),
        ],
      ),
    );
  }
}

class _CompactHeader extends StatelessWidget {
  const _CompactHeader({required this.title, required this.subtitle});

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        _BrandLogo(color: colorTheme(context).primary),
        const SizedBox(height: 28),
        Text(title, style: textTheme(context).h3),
        const SizedBox(height: 12),
        Text(
          subtitle,
          style: textTheme(context).mid.copyWith(
            color: colorTheme(context).onSurfaceVariant,
            height: 1.5,
          ),
        ),
      ],
    );
  }
}

class _AuthCard extends StatelessWidget {
  const _AuthCard({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: colorTheme(context).surface,
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: colorTheme(context).outlineVariant),
        boxShadow: <BoxShadow>[
          BoxShadow(
            color: colorTheme(context).shadow.withValues(alpha: 0.08),
            blurRadius: 30,
            offset: const Offset(0, 18),
          ),
        ],
      ),
      child: Padding(padding: const EdgeInsets.all(32), child: child),
    );
  }
}

class _BrandLogo extends StatelessWidget {
  const _BrandLogo({required this.color});

  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            border: Border.all(color: color.withValues(alpha: 0.4)),
            borderRadius: BorderRadius.circular(14),
          ),
          child: Icon(Icons.filter_alt_rounded, color: color),
        ),
        const SizedBox(width: 12),
        Text('Filter', style: textTheme(context).h5.copyWith(color: color)),
      ],
    );
  }
}
