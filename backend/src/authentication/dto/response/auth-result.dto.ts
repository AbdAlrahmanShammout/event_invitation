import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '@/modules/user/dto/response/model/user.response';
import { UserEntity } from '@/modules/user/entity/user.entity';

export class AuthResultDto {
  @ApiProperty({
    description: 'user information',
    type: () => UserResponse,
    required: true,
  })
  user: UserResponse;

  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'The access token for authenticating subsequent requests',
  })
  accessToken: string;

  constructor(user: UserEntity, accessToken: string) {
    this.user = new UserResponse(user);
    this.accessToken = accessToken;
  }
}
