import { Injectable } from '@nestjs/common';
import { RequestDetails } from '@/common/decorators/requests/get-request-info.decorator';
import { AppConfigService } from '@/config/app/app-config.service';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserService } from '@/modules/user/user.service';
import { JwtTokenService } from '@/providers/jwt/jwt-token.service';
// import { NodemailerService } from '@/providers/mail/nodemailer/nodemailer.service';
// import { TypesOfMail } from '@/providers/mail/nodemailer/types/mail-types';
import { JwtConfigService } from '@/config/jwt/jwt-config.service';
import { JwtResetPasswordPayload } from '@/authentication/types/jwt-reset-password-payload.type';

@Injectable()
export class ForgetPasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly appConfigService: AppConfigService,
    // private readonly nodemailerService: NodemailerService,
  ) {}

  async sendResetPasswordRequest(user: UserEntity): Promise<void> {
    const secretKey = this.jwtConfigService.jwtResetPasswordTokenSecretKey;
    const expiresIn = this.jwtConfigService.jwtResetPasswordTokenExpiresIn;
    const resetPasswordToken = await this.jwtTokenService.createJwtToken<JwtResetPasswordPayload>(
      {
        userId: user.id,
        userEmail: user.email,
      },
      secretKey,
      expiresIn,
    );
    const resetPasswordLink = `${this.appConfigService.clientUrl}/reset-password/${user.id}?token=${resetPasswordToken}`;
    await this.sendResetPasswordMail(user, resetPasswordLink);
  }

  async verifyResetPasswordToken(user: UserEntity, resetPasswordToken: string): Promise<void> {
    const secretKey = this.jwtConfigService.jwtResetPasswordTokenSecretKey;
    await this.jwtTokenService.verifyJWTToken<JwtResetPasswordPayload>(
      resetPasswordToken,
      secretKey,
    );
  }

  async resetPassword(userId: number, password: string): Promise<void> {
    await this.userService.updatePassword({ id: userId, password });
  }

  async sendResetPasswordMailConfirmation(
    user: UserEntity,
    requestDetails: RequestDetails,
  ): Promise<void> {
    // await this.nodemailerService.sendMail({
    //   attributes: {
    //     to: user.email,
    //   },
    //   content: {
    //     mail_type: TypesOfMail.MAIL_PASSWORD_RESET_CONFIRMATION,
    //     data: {
    //       name: user.name,
    //       password_change_date: new Date(),
    //       ip_request: requestDetails.ip,
    //       user_agent: requestDetails.userAgent,
    //     },
    //   },
    // });
  }

  private async sendResetPasswordMail(user: UserEntity, resetPasswordLink: string): Promise<void> {
    // await this.nodemailerService.sendMail({
    //   attributes: {
    //     to: user.email,
    //   },
    //   content: {
    //     mail_type: TypesOfMail.MAIL_RESET_PASSWORD,
    //     data: {
    //       name: user.name,
    //       reset_password_link: resetPasswordLink,
    //     },
    //   },
    // });
  }
}
