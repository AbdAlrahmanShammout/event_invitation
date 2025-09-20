import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { PublicRoute } from '@/common/decorators/route/public-route.decorator';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { LoggedInUser } from '@/common/decorators/requests/logged-in-user.decorator';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { AuthResultDto } from '@/authentication/dto/response/auth-result.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '@/authentication/dto/request/login.dto';
import { JwtAuthTokenPayload } from '@/authentication/types/jwt-auth-token-payload.type';
import { JwtTokenService } from '@/providers/jwt/jwt-token.service';
import { InputValidationPipe } from '@/common/pipes/input-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  @PublicRoute()
  @UsePipes(new InputValidationPipe())
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Log in' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Logged in successfully.',
    type: AuthResultDto,
  })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @LoggedInUser() userEntity: UserEntity,
  ): Promise<AuthResultDto> {
    const accessToken = await this.jwtTokenService.createJwtToken<JwtAuthTokenPayload>({
      userId: userEntity.id,
      userEmail: userEntity.email,
      userHallId: userEntity.hallId,
    });

    return new AuthResultDto(userEntity, accessToken);
  }
}
