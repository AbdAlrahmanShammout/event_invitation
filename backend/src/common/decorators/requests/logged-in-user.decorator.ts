import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '@/modules/user/entity/user.entity';

import { getUserFromRequestUseContext } from '@/common/helpers';

export const LoggedInUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const user = getUserFromRequestUseContext(context) as UserEntity;

  return user;
});
