import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestForgetPasswordDto } from '@/authentication/dto/request/request-forget-password.dto';
import { ResetPasswordDto } from '@/authentication/dto/request/reset-password.dto';
import { VerifyResetPasswordTokenDto } from '@/authentication/dto/request/verify-reset-password-token.dto';
import { ForgetPasswordService } from '@/authentication/forget-password.service';
import { PublicRoute } from '@/common/decorators/route/public-route.decorator';
import { AppException } from '@/common/exceptions/app.exception';
import { UserService } from '@/modules/user/user.service';
import {
  GetRequestInfo,
  RequestDetails,
} from '@/common/decorators/requests/get-request-info.decorator';
import { BaseMessageResponse } from '@/common/base/base-message.response';

@Controller('auth/password')
@ApiTags('auth/password')
export class ForgetPasswordController {
  constructor(
    private readonly usersService: UserService,
    private readonly forgetPasswordService: ForgetPasswordService,
  ) {}

  @ApiOperation({ summary: 'Request forget password' })
  @ApiBody({ type: RequestForgetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset request processed successfully',
    type: BaseMessageResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid email format',
  })
  @PublicRoute()
  @Post('forget')
  async forget(
    @Body() requestForgetPasswordDto: RequestForgetPasswordDto,
  ): Promise<BaseMessageResponse> {
    const user = await this.usersService.findByEmail(requestForgetPasswordDto.email);

    if (user) {
      await this.forgetPasswordService.sendResetPasswordRequest(user);
    }

    return new BaseMessageResponse(
      'Password reset link sent to your email. Please check your inbox.',
    );
  }

  @ApiOperation({ summary: 'Verify reset password token' })
  @ApiBody({ type: VerifyResetPasswordTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Token verified successfully',
    type: BaseMessageResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid token or user ID',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Token expired or invalid',
  })
  @PublicRoute()
  @Post('verify-token')
  async verifyResetPasswordToken(
    @Body() verifyResetPasswordTokenDto: VerifyResetPasswordTokenDto,
  ): Promise<BaseMessageResponse> {
    const { token, userId } = verifyResetPasswordTokenDto;
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new AppException({
        message: 'Invalid request',
        code: 'INVALID_REQUEST',
        statusCode: HttpStatus.BAD_REQUEST,
        userFriendly: true,
      });
    }

    await this.forgetPasswordService.verifyResetPasswordToken(user, token);

    return new BaseMessageResponse('Your token is valid');
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
    type: BaseMessageResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid token, user ID, or password format',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Token expired or invalid',
  })
  @PublicRoute()
  @Post('reset')
  async reset(
    @GetRequestInfo() requestDetails: RequestDetails,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<BaseMessageResponse> {
    const { userId, password, token } = resetPasswordDto;
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new AppException({
        message: 'Invalid request',
        code: 'INVALID_REQUEST',
        statusCode: HttpStatus.BAD_REQUEST,
        userFriendly: true,
      });
    }

    await this.forgetPasswordService.verifyResetPasswordToken(user, token);
    await this.forgetPasswordService.resetPassword(user.id, password);
    await this.forgetPasswordService.sendResetPasswordMailConfirmation(user, requestDetails);

    return new BaseMessageResponse('Password reset successful. You can now log in.');
  }
}
