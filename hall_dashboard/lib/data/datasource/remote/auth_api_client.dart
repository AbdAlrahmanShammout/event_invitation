import 'package:dio/dio.dart';
import 'package:hall_dashboard/data/dto/auth/base_message_response_dto.dart';
import 'package:hall_dashboard/data/dto/auth/login_request_dto.dart';
import 'package:hall_dashboard/data/dto/auth/request_forget_password_dto.dart';
import 'package:hall_dashboard/data/dto/auth/reset_password_dto.dart';
import 'package:hall_dashboard/data/dto/auth/verify_reset_password_token_dto.dart';
import 'package:hall_dashboard/data/model/auth/auth_result_model.dart';
import 'package:retrofit/retrofit.dart';

part 'auth_api_client.g.dart';

@RestApi()
abstract class AuthApiClient {
  factory AuthApiClient(Dio dio, {String baseUrl}) = _AuthApiClient;

  @POST('/auth/login')
  Future<AuthResultModel> login(@Body() LoginRequestDto body);

  @POST('/auth/password/forget')
  Future<BaseMessageResponseDto> requestPasswordReset(
    @Body() RequestForgetPasswordDto body,
  );

  @POST('/auth/password/verify-token')
  Future<BaseMessageResponseDto> verifyResetPasswordToken(
    @Body() VerifyResetPasswordTokenDto body,
  );

  @POST('/auth/password/reset')
  Future<BaseMessageResponseDto> resetPassword(@Body() ResetPasswordDto body);
}
