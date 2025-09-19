import { ApiProperty } from '@nestjs/swagger';

import { BaseModelResponseDto } from '@/common/base/base-model.response';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserRole } from '@/modules/user/enum/general.enum';

export class UserResponse extends BaseModelResponseDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'ID of the hall the user is associated with',
    example: '1234567890123456789',
    type: 'string',
    required: false,
  })
  hallId?: number;

  @ApiProperty({
    description: 'Role of the user in the system',
    enum: UserRole,
    example: UserRole.HALL_ADMIN,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Last login timestamp',
    example: '2023-12-01T10:00:00Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  lastLoginAt?: Date;

  constructor(data: UserEntity) {
    super(data);
    this.name = data.name;
    this.email = data.email;
    this.hallId = data.hallId;
    this.role = data.role;
    this.lastLoginAt = data.lastLoginAt;
  }
}
