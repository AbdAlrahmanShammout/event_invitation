import 'package:json_annotation/json_annotation.dart';

part 'request_forget_password_dto.g.dart';

@JsonSerializable()
class RequestForgetPasswordDto {
  const RequestForgetPasswordDto({required this.email});

  final String email;

  Map<String, dynamic> toJson() => _$RequestForgetPasswordDtoToJson(this);
}
