import 'package:dio/dio.dart';
import 'package:hall_dashboard/core/network/dio_factory.dart';
import 'package:hall_dashboard/data/datasource/remote/auth_api_client.dart';
import 'package:injectable/injectable.dart';

@module
abstract class RegisterModule {
  @lazySingleton
  Dio get dio => DioFactory.createDio();

  @lazySingleton
  AuthApiClient getAuthApiClient(Dio dio) => AuthApiClient(dio);
}
