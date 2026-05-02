import 'package:json_annotation/json_annotation.dart';

part 'verify_reset_password_token_dto.g.dart';

@JsonSerializable()
class VerifyResetPasswordTokenDto {
  const VerifyResetPasswordTokenDto({
    required this.token,
    required this.userId,
  });

  final String token;
  final int userId;

  Map<String, dynamic> toJson() => _$VerifyResetPasswordTokenDtoToJson(this);
}
