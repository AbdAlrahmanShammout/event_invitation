import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggedInUser } from '@/common/decorators/requests/logged-in-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CreateHallRequestDto } from '@/modules/hall/dto/request/create-hall-request.dto';
import { CreateHallResponseDto } from '@/modules/hall/dto/response/create-hall-response.dto';
import { HallService } from '@/modules/hall/hall.service';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserRole } from '@/modules/user/enum/general.enum';
import { UserService } from '@/modules/user/user.service';
import { UseGuards } from '@nestjs/common';
import { WhatsappSessionService } from '@/modules/whatsapp-session/whatsapp-session.service';
import { HallDetailsResponseDto } from '@/modules/hall/dto/response/hall-details.response.dto';

@ApiTags('halls')
@Controller('hall')
export class HallController {
  constructor(
    private readonly userService: UserService,
    private readonly hallService: HallService,
    private readonly whatsappSessionService: WhatsappSessionService,
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

    await this.userService.updateHallId({
      id: user.id,
      hallId: hall.id,
    });

    return new CreateHallResponseDto(hall);
  }

  @Get('me-hall')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get current hall details',
    description: 'Returns details of the hall associated with the logged-in user',
  })
  @ApiResponse({
    status: 200,
    description: 'Hall details retrieved successfully',
    type: HallDetailsResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not logged in',
  })
  @ApiResponse({
    status: 404,
    description: 'Hall not found - User has no associated hall',
  })
  async getCurrentHallDetails(@LoggedInUser() user: UserEntity): Promise<HallDetailsResponseDto> {
    if (!user.hallId) {
      throw new UnauthorizedException('User has no associated hall');
    }

    const hall = await this.hallService.findHallById(user.hallId);

    if (!hall) {
      throw new UnauthorizedException('Hall not found');
    }

    const resultWhatsappStatus = this.whatsappSessionService.getHallSessionStatus(hall.id);

    return new HallDetailsResponseDto({
      hall,
      whatsappSessionExists: resultWhatsappStatus.exists,
      whatsappIsReady: resultWhatsappStatus.isReady,
    });
  }
}
