import 'package:flutter/material.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';

/// Destination model for the side navigation drawer.
class AdminDestination {
  const AdminDestination({
    required this.icon,
    required this.selectedIcon,
    required this.label,
  });

  final IconData icon;
  final IconData selectedIcon;
  final String label;
}

/// Shell widget that wraps all super-admin pages with a persistent left sidebar
/// and a top header. The sidebar never overlaps the content area — it is placed
/// inside a [Row] and the content column takes the remaining space via [Expanded].
class AdminScaffold extends StatelessWidget {
  const AdminScaffold({
    super.key,
    required this.selectedIndex,
    required this.destinations,
    required this.body,
    required this.onDestinationSelected,
    this.title = 'Super Admin',
    this.actions,
  });

  final int selectedIndex;
  final List<AdminDestination> destinations;
  final Widget body;
  final ValueChanged<int> onDestinationSelected;
  final String title;
  final List<Widget>? actions;

  static const double _sidebarExpandedWidth = 220;
  static const double _sidebarCollapsedWidth = 64;

  /// Breakpoint at which the sidebar shows labels.
  static const double _wideBreakpoint = 900;

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.sizeOf(context).width;
    final bool isExpanded = screenWidth >= _wideBreakpoint;

    return Scaffold(
      // Use a plain Row: sidebar is a fixed-width SizedBox so it never
      // pushes content underneath it.
      body: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          // ── Sidebar ─────────────────────────────────────────────────────────
          // SizedBox with a fixed width guarantees the sidebar claims exactly
          // this much horizontal space; the Row then gives the rest to Expanded.
          SizedBox(
            width: isExpanded ? _sidebarExpandedWidth : _sidebarCollapsedWidth,
            child: _Sidebar(
              selectedIndex: selectedIndex,
              destinations: destinations,
              isExpanded: isExpanded,
              onDestinationSelected: onDestinationSelected,
            ),
          ),
          // ── Vertical divider ─────────────────────────────────────────────────
          VerticalDivider(
            width: 1,
            thickness: 1,
            color: colorTheme(context).outlineVariant.withValues(alpha: 0.35),
          ),
          // ── Main area ────────────────────────────────────────────────────────
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                _TopBar(title: title, actions: actions),
                Expanded(child: body),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ── Private widgets ──────────────────────────────────────────────────────────

class _Sidebar extends StatelessWidget {
  const _Sidebar({
    required this.selectedIndex,
    required this.destinations,
    required this.isExpanded,
    required this.onDestinationSelected,
  });

  final int selectedIndex;
  final List<AdminDestination> destinations;
  final bool isExpanded;
  final ValueChanged<int> onDestinationSelected;

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: colorTheme(context).surface,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          _SidebarHeader(isExpanded: isExpanded),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
              itemCount: destinations.length,
              itemBuilder: (BuildContext ctx, int index) {
                return _NavItem(
                  destination: destinations[index],
                  isSelected: index == selectedIndex,
                  isExpanded: isExpanded,
                  onTap: () => onDestinationSelected(index),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _SidebarHeader extends StatelessWidget {
  const _SidebarHeader({required this.isExpanded});

  final bool isExpanded;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 14),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: colorTheme(context).outlineVariant.withValues(alpha: 0.35),
          ),
        ),
      ),
      child: Row(
        mainAxisAlignment:
            isExpanded ? MainAxisAlignment.start : MainAxisAlignment.center,
        children: <Widget>[
          Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(
              color: colorTheme(context).primary,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(
              Icons.admin_panel_settings,
              color: Colors.white,
              size: 20,
            ),
          ),
          if (isExpanded) ...<Widget>[
            const SizedBox(width: 10),
            Flexible(
              child: Text(
                'Admin Panel',
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontWeight: FontWeight.w800,
                  fontSize: 15,
                  color: colorTheme(context).onSurface,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  const _NavItem({
    required this.destination,
    required this.isSelected,
    required this.isExpanded,
    required this.onTap,
  });

  final AdminDestination destination;
  final bool isSelected;
  final bool isExpanded;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final Color primary = colorTheme(context).primary;
    final Color iconColor =
        isSelected ? primary : colorTheme(context).onSurfaceVariant;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Tooltip(
        message: isExpanded ? '' : destination.label,
        child: Material(
          color:
              isSelected ? primary.withValues(alpha: 0.1) : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
          child: InkWell(
            borderRadius: BorderRadius.circular(10),
            onTap: onTap,
            child: Padding(
              padding: EdgeInsets.symmetric(
                horizontal: isExpanded ? 12 : 0,
                vertical: 11,
              ),
              child: Row(
                mainAxisAlignment: isExpanded
                    ? MainAxisAlignment.start
                    : MainAxisAlignment.center,
                children: <Widget>[
                  Icon(
                    isSelected ? destination.selectedIcon : destination.icon,
                    color: iconColor,
                    size: 22,
                  ),
                  if (isExpanded) ...<Widget>[
                    const SizedBox(width: 12),
                    Flexible(
                      child: Text(
                        destination.label,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: iconColor,
                          fontWeight: isSelected
                              ? FontWeight.w700
                              : FontWeight.w500,
                          fontSize: 14,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _TopBar extends StatelessWidget {
  const _TopBar({required this.title, this.actions});

  final String title;
  final List<Widget>? actions;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 24),
      decoration: BoxDecoration(
        color: colorTheme(context).surface,
        border: Border(
          bottom: BorderSide(
            color: colorTheme(context).outlineVariant.withValues(alpha: 0.35),
          ),
        ),
      ),
      child: Row(
        children: <Widget>[
          Expanded(
            child: Text(
              title,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontWeight: FontWeight.w700,
                fontSize: 18,
                color: colorTheme(context).onSurface,
              ),
            ),
          ),
          if (actions != null) ...actions!,
        ],
      ),
    );
  }
}
