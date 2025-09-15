import { UserRole } from '@/modules/user/enum/general.enum';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { BaseModelResponseDto } from '@/common/base/base-model.response';

export class UserResponse extends BaseModelResponseDto {
  name: string;
  email: string;
  hallId?: bigint;
  role: UserRole;
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
