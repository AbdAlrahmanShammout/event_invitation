import 'package:hall_dashboard/data/model/auth/auth_user_model.dart';
import 'package:hall_dashboard/domain/entities/auth/auth_session.dart';
import 'package:json_annotation/json_annotation.dart';

part 'auth_result_model.g.dart';

@JsonSerializable()
class AuthResultModel {
  const AuthResultModel({required this.user, required this.accessToken});

  factory AuthResultModel.fromJson(Map<String, dynamic> json) {
    return _$AuthResultModelFromJson(json);
  }

  final AuthUserModel user;
  final String accessToken;

  AuthSession toEntity() {
    return AuthSession(user: user.toEntity(), accessToken: accessToken);
  }
}
