import { Module } from '@nestjs/common';

import { UserRepository } from '@/modules/user/repository/user.repository';

import { UserPrismaRepsitory } from './repository/user-prisma.repsitory';
import { UserService } from './user.service';

@Module({
  providers: [
    UserPrismaRepsitory,
    {
      provide: UserRepository,
      useClass: UserPrismaRepsitory,
    },
    UserService,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
