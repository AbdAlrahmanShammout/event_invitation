export interface MobileTokenPayload {
  invitationId: number;
  hallId: number;
  grantedBy: number; // User ID who generated the QR
  permissions: string[];
  expiresAt: string;
  iat?: number;
  exp?: number;
}

export interface QRCodeData {
  invitationId: number;
  accessToken: string;
  appUrl: string;
}
