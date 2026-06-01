import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hall_dashboard/core/theme/theme_helper.dart';
import 'package:hall_dashboard/domain/entities/admin/phone_number_entity.dart';
import 'package:hall_dashboard/presentation/core/widgets/empty_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/error_state.dart';
import 'package:hall_dashboard/presentation/core/widgets/status_badge.dart';
import 'package:hall_dashboard/presentation/features/contacts/bloc/contacts_bloc.dart';
import 'package:hall_dashboard/presentation/features/contacts/bloc/contacts_event.dart';
import 'package:hall_dashboard/presentation/features/contacts/bloc/contacts_state.dart';
import 'package:hall_dashboard/presentation/features/overview/bloc/overview_state.dart';
import 'package:intl/intl.dart';

class ContactsPage extends StatefulWidget {
  const ContactsPage({super.key});

  @override
  State<ContactsPage> createState() => _ContactsPageState();
}

class _ContactsPageState extends State<ContactsPage> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ContactsBloc, ContactsState>(
      builder: (BuildContext ctx, ContactsState state) {
        return Column(
          children: <Widget>[
            _buildSearchBar(ctx),
            Expanded(child: _buildContent(ctx, state)),
          ],
        );
      },
    );
  }

  Widget _buildSearchBar(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: colorTheme(context).outlineVariant.withValues(alpha: 0.4),
          ),
        ),
      ),
      child: Row(
        children: <Widget>[
          Expanded(
            child: SizedBox(
              height: 40,
              child: TextField(
                controller: _searchController,
                decoration: InputDecoration(
                  hintText: 'Search by number, hall, or invitation…',
                  prefixIcon: const Icon(Icons.search, size: 18),
                  contentPadding: EdgeInsets.zero,
                  filled: true,
                  fillColor: colorTheme(
                    context,
                  ).surfaceContainerHighest.withValues(alpha: 0.5),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide.none,
                  ),
                ),
                onSubmitted: (_) => _search(context),
              ),
            ),
          ),
          const SizedBox(width: 12),
          FilledButton.tonal(
            onPressed: () => _search(context),
            child: const Text('Search'),
          ),
        ],
      ),
    );
  }

  Widget _buildContent(BuildContext context, ContactsState state) {
    return switch (state.status) {
      LoadStatus.loading || LoadStatus.initial => const Center(
        child: CircularProgressIndicator(),
      ),
      LoadStatus.error => ErrorState(
        message: state.error ?? 'Failed to load contacts.',
        onRetry: () => context.read<ContactsBloc>().add(
          const ContactsLoadRequested(),
        ),
      ),
      LoadStatus.loaded => state.contacts.isEmpty
          ? const EmptyState(message: 'No phone numbers found.')
          : _buildTable(context, state.contacts),
    };
  }

  Widget _buildTable(BuildContext context, List<PhoneNumberEntity> contacts) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Card(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(
            color: colorTheme(context).outlineVariant.withValues(alpha: 0.3),
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: DataTable(
            headingRowColor: WidgetStateProperty.all(
              colorTheme(context).surfaceContainerHighest.withValues(alpha: 0.4),
            ),
            columns: const <DataColumn>[
              DataColumn(label: Text('Phone Number')),
              DataColumn(label: Text('Name')),
              DataColumn(label: Text('Hall')),
              DataColumn(label: Text('Invitation')),
              DataColumn(label: Text('Message Status')),
              DataColumn(label: Text('Last Message')),
            ],
            rows: contacts
                .map(
                  (PhoneNumberEntity c) => DataRow(
                    cells: <DataCell>[
                      DataCell(
                        Text(
                          c.phoneNumber,
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                            fontFamily: 'monospace',
                          ),
                        ),
                      ),
                      DataCell(Text(c.associatedName ?? '—')),
                      DataCell(Text(c.hallName ?? '—')),
                      DataCell(Text(c.invitationTitle ?? '—')),
                      DataCell(
                        c.messageStatus != null
                            ? StatusBadge(c.messageStatus!)
                            : const Text('—'),
                      ),
                      DataCell(
                        Text(
                          c.lastMessageDate != null
                              ? DateFormat('MMM d, HH:mm').format(
                                  c.lastMessageDate!,
                                )
                              : '—',
                        ),
                      ),
                    ],
                  ),
                )
                .toList(),
          ),
        ),
      ),
    );
  }

  void _search(BuildContext context) {
    context.read<ContactsBloc>().add(
      ContactsLoadRequested(
        search: _searchController.text.trim().isEmpty
            ? null
            : _searchController.text.trim(),
      ),
    );
  }
}
