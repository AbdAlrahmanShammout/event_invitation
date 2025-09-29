import { compareHashString } from '@/common/helpers/bcrypt.helper';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateLoginCredentials(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compareHashString(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
