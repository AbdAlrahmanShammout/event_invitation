import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/domain/entities/admin/platform_overview_entity.dart';
import 'package:hall_dashboard/presentation/core/widgets/error_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/stat_card.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_bloc.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_event.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';

class OverviewPage extends StatelessWidget {
  const OverviewPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<OverviewBloc, OverviewState>(
      builder: (BuildContext ctx, OverviewState state) {
        return switch (state.status) {
          LoadStatus.loading || LoadStatus.initial => const Center(
            child: CircularProgressIndicator(),
          ),
          LoadStatus.error => ErrorState(
            message: state.error ?? 'Something went wrong.',
            onRetry: () =>
                ctx.read<OverviewBloc>().add(const OverviewLoadRequested()),
          ),
          LoadStatus.loaded => _OverviewContent(overview: state.overview!),
        };
      },
    );
  }
}

class _OverviewContent extends StatelessWidget {
  const _OverviewContent({required this.overview});

  final PlatformOverviewEntity overview;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          // ── KPI grid ────────────────────────────────────────────────────────
          LayoutBuilder(
            builder: (BuildContext ctx, BoxConstraints constraints) {
              return _KpiGrid(
                overview: overview,
                availableWidth: constraints.maxWidth,
              );
            },
          ),
          const SizedBox(height: 32),
          // ── Section header ───────────────────────────────────────────────────
          Text(
            'Platform Breakdown',
            style: TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w700,
              color: colorTheme(context).onSurface,
            ),
          ),
          const SizedBox(height: 16),
          // ── Charts — responsive ──────────────────────────────────────────────
          LayoutBuilder(
            builder: (BuildContext ctx, BoxConstraints constraints) {
              return _ChartsSection(
                overview: overview,
                availableWidth: constraints.maxWidth,
              );
            },
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}

// ── KPI Grid ─────────────────────────────────────────────────────────────────

class _KpiGrid extends StatelessWidget {
  const _KpiGrid({required this.overview, required this.availableWidth});

  final PlatformOverviewEntity overview;
  final double availableWidth;

  static const double _minCardWidth = 180.0;
  static const double _cardSpacing = 12.0;

  @override
  Widget build(BuildContext context) {
    final int pendingInvitations =
        overview.invitationsByStatus['PENDING_APPROVAL'] ?? 0;
    final int sentMessages = overview.recipientsByMessageStatus['sent'] ?? 0;

    final List<({String label, String value, IconData icon, Color color, String? subtitle})>
    cards = <({String label, String value, IconData icon, Color color, String? subtitle})>[
      (
        label: 'Total Halls',
        value: '${overview.totalHalls}',
        icon: Icons.business_outlined,
        color: colorTheme(context).primary,
        subtitle: null,
      ),
      (
        label: 'Active Halls',
        value: '${overview.activeHalls}',
        icon: Icons.check_circle_outline,
        color: const Color(0xFF059669),
        subtitle: null,
      ),
      (
        label: 'Suspended Halls',
        value: '${overview.suspendedHalls}',
        icon: Icons.block_outlined,
        color: colorTheme(context).error,
        subtitle: null,
      ),
      (
        label: 'Total Invitations',
        value: '${overview.totalInvitations}',
        icon: Icons.mail_outline,
        color: colorTheme(context).secondary,
        subtitle: null,
      ),
      (
        label: 'Pending Requests',
        value: '$pendingInvitations',
        icon: Icons.pending_outlined,
        color: const Color(0xFFD97706),
        subtitle: 'Awaiting approval',
      ),
      (
        label: 'Messages Sent',
        value: '$sentMessages',
        icon: Icons.send_outlined,
        color: const Color(0xFF7C3AED),
        subtitle: 'Total delivered',
      ),
      (
        label: 'Total Recipients',
        value: '${overview.totalRecipients}',
        icon: Icons.people_outline,
        color: const Color(0xFF0891B2),
        subtitle: 'Registered numbers',
      ),
      (
        label: 'WhatsApp Sessions',
        value: '${overview.activeWhatsappSessions}/${overview.totalWhatsappSessions}',
        icon: Icons.phone_outlined,
        color: const Color(0xFF16A34A),
        subtitle: 'Active / Total',
      ),
    ];

    // Compute how many columns fit given available width.
    final int columns = _computeColumns(availableWidth);
    final double cardWidth =
        (availableWidth - (_cardSpacing * (columns - 1))) / columns;
    // Height is 1.15× width for a comfortable card.
    final double cardHeight = cardWidth / 2.1;

    return Wrap(
      spacing: _cardSpacing,
      runSpacing: _cardSpacing,
      children: cards.map((item) {
        return SizedBox(
          width: cardWidth,
          height: cardHeight,
          child: StatCard(
            label: item.label,
            value: item.value,
            icon: item.icon,
            color: item.color,
            subtitle: item.subtitle,
          ),
        );
      }).toList(),
    );
  }

  int _computeColumns(double width) {
    if (width >= _minCardWidth * 4 + _cardSpacing * 3) return 4;
    if (width >= _minCardWidth * 3 + _cardSpacing * 2) return 3;
    if (width >= _minCardWidth * 2 + _cardSpacing) return 2;
    return 1;
  }
}

// ── Charts section ────────────────────────────────────────────────────────────

class _ChartsSection extends StatelessWidget {
  const _ChartsSection({
    required this.overview,
    required this.availableWidth,
  });

  final PlatformOverviewEntity overview;
  final double availableWidth;

  static const double _minChartWidth = 220.0;
  static const double _chartSpacing = 16.0;

  @override
  Widget build(BuildContext context) {
    final List<Widget> charts = <Widget>[
      _ChartCard(
        title: 'Hall Status',
        child: _PieChartWidget(
          sections: <_PieSection>[
            _PieSection(
              'Active',
              overview.activeHalls.toDouble(),
              const Color(0xFF059669),
            ),
            _PieSection(
              'Suspended',
              overview.suspendedHalls.toDouble(),
              colorTheme(context).error,
            ),
            _PieSection(
              'Inactive',
              overview.inactiveHalls.toDouble(),
              colorTheme(context).outlineVariant,
            ),
          ],
        ),
      ),
      _ChartCard(
        title: 'Invitations by Status',
        child: _PieChartWidget(
          sections: _buildInvitationSections(context),
        ),
      ),
      _ChartCard(
        title: 'Message Delivery',
        child: _PieChartWidget(
          sections: _buildMessageSections(context),
        ),
      ),
    ];

    // Lay out charts in columns based on available width.
    final bool isWide = availableWidth >= _minChartWidth * 3 + _chartSpacing * 2;
    final bool isMedium =
        !isWide && availableWidth >= _minChartWidth * 2 + _chartSpacing;

    if (isWide) {
      return Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Expanded(child: charts[0]),
          const SizedBox(width: _chartSpacing),
          Expanded(child: charts[1]),
          const SizedBox(width: _chartSpacing),
          Expanded(child: charts[2]),
        ],
      );
    }

    if (isMedium) {
      return Column(
        children: <Widget>[
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Expanded(child: charts[0]),
              const SizedBox(width: _chartSpacing),
              Expanded(child: charts[1]),
            ],
          ),
          const SizedBox(height: _chartSpacing),
          charts[2],
        ],
      );
    }

    // Narrow: stack vertically
    return Column(
      children: <Widget>[
        charts[0],
        const SizedBox(height: _chartSpacing),
        charts[1],
        const SizedBox(height: _chartSpacing),
        charts[2],
      ],
    );
  }

  List<_PieSection> _buildInvitationSections(BuildContext context) {
    final Map<String, Color> statusColors = <String, Color>{
      'DRAFT': colorTheme(context).outlineVariant,
      'PENDING_APPROVAL': const Color(0xFFD97706),
      'APPROVED': const Color(0xFF059669),
      'REJECTED': colorTheme(context).error,
      'SCHEDULED': const Color(0xFF7C3AED),
      'COMPLETED': const Color(0xFF0891B2),
    };
    return overview.invitationsByStatus.entries
        .where((e) => e.value > 0)
        .map(
          (e) => _PieSection(
            e.key.replaceAll('_', ' '),
            e.value.toDouble(),
            statusColors[e.key] ?? colorTheme(context).outlineVariant,
          ),
        )
        .toList();
  }

  List<_PieSection> _buildMessageSections(BuildContext context) {
    final Map<String, Color> statusColors = <String, Color>{
      'sent': const Color(0xFF059669),
      'pending': const Color(0xFFD97706),
      'holding': const Color(0xFF0891B2),
      'failed': colorTheme(context).error,
    };
    return overview.recipientsByMessageStatus.entries
        .where((e) => e.value > 0)
        .map(
          (e) => _PieSection(
            e.key[0].toUpperCase() + e.key.substring(1),
            e.value.toDouble(),
            statusColors[e.key] ?? colorTheme(context).outlineVariant,
          ),
        )
        .toList();
  }
}

// ── Private chart widgets ─────────────────────────────────────────────────────

class _PieSection {
  const _PieSection(this.label, this.value, this.color);

  final String label;
  final double value;
  final Color color;
}

class _ChartCard extends StatelessWidget {
  const _ChartCard({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
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
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              title,
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w700,
                color: colorTheme(context).onSurface,
              ),
            ),
            const SizedBox(height: 16),
            child,
          ],
        ),
      ),
    );
  }
}

class _PieChartWidget extends StatelessWidget {
  const _PieChartWidget({required this.sections});

  final List<_PieSection> sections;

  @override
  Widget build(BuildContext context) {

    if (sections.isEmpty || sections.every((s) => s.value == 0)) {
      return const SizedBox(
        height: 140,
        child: Center(
          child: Text('No data', style: TextStyle(fontSize: 13)),
        ),
      );
    }

    final double total = sections.fold(0.0, (sum, s) => sum + s.value);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(
          width: double.infinity,
          height: 160,
          child: PieChart(
            PieChartData(
              pieTouchData: PieTouchData(enabled: false),
              sections: sections
                  .where((s) => s.value > 0)
                  .map(
                    (s) => PieChartSectionData(
                      value: s.value,
                      color: s.color,
                      title: total > 0
                          ? '${(s.value / total * 100).round()}%'
                          : '',
                      titleStyle: const TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                      radius: 58,
                    ),
                  )
                  .toList(),
              sectionsSpace: 2,
              centerSpaceRadius: 22,
            ),
          ),
        ),
        const SizedBox(height: 12),
        // Legend
        Wrap(
          spacing: 10,
          runSpacing: 6,
          children: sections
              .where((s) => s.value > 0)
              .map(
                (s) => Row(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Container(
                      width: 9,
                      height: 9,
                      decoration: BoxDecoration(
                        color: s.color,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '${s.label} (${s.value.toInt()})',
                      style: TextStyle(
                        fontSize: 11,
                        color: colorTheme(context).onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              )
              .toList(),
        ),
      ],
    );
  }
}
