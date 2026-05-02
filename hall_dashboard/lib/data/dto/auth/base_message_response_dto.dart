import 'package:json_annotation/json_annotation.dart';

part 'base_message_response_dto.g.dart';

@JsonSerializable()
class BaseMessageResponseDto {
  const BaseMessageResponseDto({required this.message});

  factory BaseMessageResponseDto.fromJson(Map<String, dynamic> json) {
    return _$BaseMessageResponseDtoFromJson(json);
  }

  final String message;
}
