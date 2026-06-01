import 'package:dio/dio.dart';
import 'package:hall_dashboard/core/storage/token_storage.dart';
import 'package:injectable/injectable.dart';

/// Dio interceptor that injects the Bearer token into every outgoing request.
@injectable
class AuthInterceptor extends Interceptor {
  const AuthInterceptor(this._tokenStorage);

  final TokenStorage _tokenStorage;

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    final String? token = _tokenStorage.accessToken;
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }
}
