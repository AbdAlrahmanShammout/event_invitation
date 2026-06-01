// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'get_halls_response_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

GetHallsResponseModel _$GetHallsResponseModelFromJson(
  Map<String, dynamic> json,
) => GetHallsResponseModel(
  halls: (json['halls'] as List<dynamic>)
      .map((e) => HallModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  total: (json['total'] as num).toInt(),
);

Map<String, dynamic> _$GetHallsResponseModelToJson(
  GetHallsResponseModel instance,
) => <String, dynamic>{'halls': instance.halls, 'total': instance.total};
