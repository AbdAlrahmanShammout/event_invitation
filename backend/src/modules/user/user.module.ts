import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPrismaRepsitory } from './repository/user-prisma.repsitory';
import { UserRepository } from '@/modules/user/repository/user.repository';
import { UserController } from '@/modules/user/user.controller';

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
