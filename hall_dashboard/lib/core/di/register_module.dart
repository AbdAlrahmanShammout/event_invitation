import 'package:dio/dio.dart';
import 'package:hall_dashboard/core/network/auth_interceptor.dart';
import 'package:hall_dashboard/core/network/dio_factory.dart';
import 'package:hall_dashboard/data/datasource/remote/admin_api_client.dart';
import 'package:hall_dashboard/data/datasource/remote/auth_api_client.dart';
import 'package:injectable/injectable.dart';

@module
abstract class RegisterModule {
  @lazySingleton
  Dio get dio => DioFactory.createDio();

  @lazySingleton
  AuthApiClient getAuthApiClient(Dio dio) => AuthApiClient(dio);

  @lazySingleton
  AdminApiClient getAdminApiClient(
    Dio dio,
    AuthInterceptor authInterceptor,
  ) {
    dio.interceptors.add(authInterceptor);
    return AdminApiClient(dio);
  }
}
