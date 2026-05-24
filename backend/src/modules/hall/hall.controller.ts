import { Controller, Get, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggedInUser } from '@/common/decorators/requests/logged-in-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { HallDetailsResponseDto } from '@/modules/hall/dto/response/hall-details.response.dto';
import { HallService } from '@/modules/hall/hall.service';
import { WhatsappSessionService } from '@/modules/whatsapp-session/whatsapp-session.service';
import { UserEntity } from '@/modules/user/entity/user.entity';

@ApiTags('halls')
@Controller('hall')
export class HallController {
  constructor(
    private readonly hallService: HallService,
    private readonly whatsappSessionService: WhatsappSessionService,
  ) {}

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
