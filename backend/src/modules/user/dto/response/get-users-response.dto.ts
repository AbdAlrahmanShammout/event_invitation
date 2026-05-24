import { ApiProperty } from '@nestjs/swagger';

import { UserResponse } from '@/modules/user/dto/response/model/user.response';
import { UserEntity } from '@/modules/user/entity/user.entity';

export class GetUsersResponseDto {
  @ApiProperty({
    description: 'List of users',
    type: () => [UserResponse],
  })
  users: UserResponse[];

  @ApiProperty({
    description: 'Total count of users in this response',
    example: 20,
  })
  total: number;

  constructor(users: UserEntity[], total?: number) {
    this.users = users.map((user) => new UserResponse(user));
    this.total = total || users.length;
  }
}
