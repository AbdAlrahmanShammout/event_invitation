import { Module } from '@nestjs/common';

import { UserRepository } from '@/modules/user/repository/user.repository';
import { UserController } from '@/modules/user/user.controller';

import { UserPrismaRepsitory } from './repository/user-prisma.repsitory';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
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
