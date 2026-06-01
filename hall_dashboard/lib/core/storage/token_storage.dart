import 'package:injectable/injectable.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Manages persistence and in-memory caching of the JWT access token.
@lazySingleton
class TokenStorage {
  static const String _tokenKey = 'access_token';

  String? _cachedToken;

  /// Returns the currently stored access token, if any.
  String? get accessToken => _cachedToken;

  /// Persists the token to shared preferences and updates the in-memory cache.
  Future<void> saveToken(String token) async {
    _cachedToken = token;
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  /// Loads the token from shared preferences into the in-memory cache.
  Future<void> loadToken() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    _cachedToken = prefs.getString(_tokenKey);
  }

  /// Clears the token from both memory and persistent storage.
  Future<void> clearToken() async {
    _cachedToken = null;
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }
}
