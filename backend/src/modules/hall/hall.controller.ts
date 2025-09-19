import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateHallRequestDto } from '@/modules/hall/dto/request/create-hall-request.dto';
import { CreateHallResponseDto } from '@/modules/hall/dto/response/create-hall-response.dto';
import { HallService } from '@/modules/hall/hall.service';
import { HallRepository } from '@/modules/hall/repository/hall.repository';
import { UserRole } from '@/modules/user/enum/general.enum';
import { UserService } from '@/modules/user/user.service';

@ApiTags('halls')
@Controller('hall')
export class HallController {
  constructor(
    private readonly userService: UserService,
    private readonly hallService: HallService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new hall',
    description: 'Creates a new hall along with a hall admin user account',
  })
  @ApiBody({ type: CreateHallRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Hall created successfully',
    type: CreateHallResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email already exists',
  })
  async createHall(@Body() input: CreateHallRequestDto): Promise<CreateHallResponseDto> {
    const user = await this.userService.createUser({
      name: input.ownerName,
      email: input.ownerEmail,
      password: input.ownerPassword,
      role: UserRole.HALL_ADMIN,
    });

    const hall = await this.hallService.createHall({
      name: input.hallName,
      description: input.hallDescription,
      address: input.hallAddress,
      email: input.hallEmail,
      phone: input.hallPhone,
      ownerId: user.id,
    });

    return new CreateHallResponseDto(hall);
  }
}
