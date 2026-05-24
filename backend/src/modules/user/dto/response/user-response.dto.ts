import { ApiProperty } from '@nestjs/swagger';

import { UserResponse } from '@/modules/user/dto/response/model/user.response';
import { UserEntity } from '@/modules/user/entity/user.entity';

export class UserResponseDto {
  @ApiProperty({
    description: 'User information',
    type: () => UserResponse,
  })
  user: UserResponse;

  constructor(user: UserEntity) {
    this.user = new UserResponse(user);
  }
}
