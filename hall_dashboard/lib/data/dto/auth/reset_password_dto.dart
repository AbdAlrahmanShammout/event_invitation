import 'package:json_annotation/json_annotation.dart';

part 'reset_password_dto.g.dart';

@JsonSerializable()
class ResetPasswordDto {
  const ResetPasswordDto({
    required this.token,
    required this.userId,
    required this.password,
  });

  final String token;
  final int userId;
  final String password;

  Map<String, dynamic> toJson() => _$ResetPasswordDtoToJson(this);
}
