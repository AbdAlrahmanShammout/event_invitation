class AuthUser {
  const AuthUser({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.hallId,
    this.lastLoginAt,
  });

  final int id;
  final String name;
  final String email;
  final String role;
  final int? hallId;
  final DateTime? lastLoginAt;
}
