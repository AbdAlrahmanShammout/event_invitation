import { Injectable, UnauthorizedException } from '@nestjs/common';
import { addDays } from 'date-fns';

import {
  MobileTokenPayload,
  QRCodeData,
} from '@/modules/invitation/types/mobile-token-payload.type';
import { JwtTokenService } from '@/providers/jwt/jwt-token.service';

@Injectable()
export class MobileTokenService {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  async generateInvitationAccessToken(input: {
    invitationId: number;
    hallId: number;
    grantedBy: number;
    expiresInDays?: number;
  }): Promise<string> {
    const expiresAt = addDays(new Date(), input.expiresInDays || 30);

    const payload: MobileTokenPayload = {
      invitationId: input.invitationId,
      hallId: input.hallId,
      grantedBy: input.grantedBy,
      permissions: ['read_invitation', 'add_recipients', 'view_status'],
      expiresAt: expiresAt.toISOString(),
    };

    return await this.jwtTokenService.createJwtToken<MobileTokenPayload>(payload, {
      expiresIn: `${input.expiresInDays || 30}d`,
      issuer: 'event-invitation-platform',
      audience: 'mobile-app',
    });
  }

  async validateInvitationAccessToken(token: string): Promise<MobileTokenPayload> {
    try {
      const payload = await this.jwtTokenService.verifyJWTToken<MobileTokenPayload>(token, {
        issuer: 'event-invitation-platform',
        audience: 'mobile-app',
      });

      // Check if token has expired based on our custom expiresAt
      const now = new Date();
      const expiresAt = new Date(payload.expiresAt);

      if (now > expiresAt) {
        throw new UnauthorizedException('Access token has expired');
      }

      return payload;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async generateQRCodeData(input: {
    invitationId: number;
    hallId: number;
    grantedBy: number;
    appUrl?: string;
    expiresInDays?: number;
  }): Promise<QRCodeData> {
    const accessToken = await this.generateInvitationAccessToken({
      invitationId: input.invitationId,
      hallId: input.hallId,
      grantedBy: input.grantedBy,
      expiresInDays: input.expiresInDays,
    });

    return {
      invitationId: input.invitationId,
      accessToken,
      appUrl:
        input.appUrl ||
        `${process.env.MOBILE_APP_URL || 'https://app.yourplatform.com'}/invitation/access`,
    };
  }

  hasPermission(payload: MobileTokenPayload, permission: string): boolean {
    return payload.permissions.includes(permission);
  }

  isValidForInvitation(payload: MobileTokenPayload, invitationId: number): boolean {
    return payload.invitationId === invitationId;
  }

  isValidForHall(payload: MobileTokenPayload, hallId: number): boolean {
    return payload.hallId === hallId;
  }
}
