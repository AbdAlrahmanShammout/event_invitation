import { Module } from '@nestjs/common';

import { UserRepository } from '@/modules/user/repository/user.repository';
import { UserAdminController } from '@/modules/user/user.admin.controller';
import { UserController } from '@/modules/user/user.controller';

import { UserPrismaRepsitory } from './repository/user-prisma.repsitory';
import { UserService } from './user.service';

@Module({
  controllers: [UserController, UserAdminController],
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
