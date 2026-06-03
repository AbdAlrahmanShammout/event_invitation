import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@/common/decorators/route/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { CreateUserRequestDto } from '@/modules/user/dto/request/create-user-request.dto';
import { GetUsersRequestDto } from '@/modules/user/dto/request/get-users-request.dto';
import { GetUsersResponseDto } from '@/modules/user/dto/response/get-users-response.dto';
import { UserResponseDto } from '@/modules/user/dto/response/user-response.dto';
import { UserRole } from '@/modules/user/enum/general.enum';
import { UserService } from '@/modules/user/user.service';

/**
 * Handles user management endpoints that are restricted to super admins.
 */
@ApiTags('Admin - Users')
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
@ApiBearerAuth()
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a user',
    description: 'Creates a user account with a selected role. Super admin access is required.',
  })
  @ApiBody({ type: CreateUserRequestDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  async createUser(@Body() input: CreateUserRequestDto): Promise<UserResponseDto> {
    const user = await this.userService.createUser({
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role,
      hallId: input.hallId,
    });
    return new UserResponseDto(user);
  }

  @Get()
  @ApiOperation({
    summary: 'List users',
    description:
      'Returns users with optional role and hall filters. Super admin access is required.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: GetUsersResponseDto,
  })
  async getUsers(@Query() query: GetUsersRequestDto): Promise<GetUsersResponseDto> {
    const users = await this.userService.findUsers({
      hallId: query.hallId,
      role: query.role,
      limit: query.limit,
      offset: query.offset,
    });
    return new GetUsersResponseDto(users);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user',
    description: 'Returns a user by ID. Super admin access is required.',
  })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: UserResponseDto,
  })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    const user = await this.userService.getUserById(id);
    return new UserResponseDto(user);
  }
}
