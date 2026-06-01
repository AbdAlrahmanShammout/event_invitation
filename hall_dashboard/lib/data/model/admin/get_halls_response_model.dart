import 'package:hall_dashboard/data/model/admin/hall_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'get_halls_response_model.g.dart';

@JsonSerializable()
class GetHallsResponseModel {
  const GetHallsResponseModel({required this.halls, required this.total});

  factory GetHallsResponseModel.fromJson(Map<String, dynamic> json) =>
      _$GetHallsResponseModelFromJson(json);

  final List<HallModel> halls;
  final int total;

  Map<String, dynamic> toJson() => _$GetHallsResponseModelToJson(this);
}
