import 'package:dio/dio.dart';
import 'package:hall_dashboard/core/config/app_config.dart';

class DioFactory {
  const DioFactory._();

  static const Duration _connectionTimeout = Duration(seconds: 20);
  static const Duration _receiveTimeout = Duration(seconds: 20);

  static Dio createDio() {
    final BaseOptions options = BaseOptions(
      baseUrl: AppConfig.apiBaseUrl,
      connectTimeout: _connectionTimeout,
      receiveTimeout: _receiveTimeout,
      contentType: Headers.jsonContentType,
      responseType: ResponseType.json,
    );
    return Dio(options);
  }
}
