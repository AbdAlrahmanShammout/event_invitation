import { registerAs } from '@nestjs/config';

export default [
  registerAs('jwt.auth-token', () => ({
    jwtAuthTokenSecretKey: process.env.JWT_AUTH_TOKEN_SECRET_KEY,
    jwtAuthTokenExpiresIn: process.env.JWT_AUTH_TOKEN_EXPIRES_IN,
  })),
  // registerAs('jwt.refresh-token', () => ({
  //   jwtRefreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  //   jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  // })),
  // registerAs('jwt.invite-token', () => ({
  //   jwtInviteTokenSecretKey: process.env.JWT_INVITE_TOKEN_SECRET_KEY,
  // })),
  registerAs('jwt.reset-passwword-token', () => ({
    jwtResetPasswordTokenSecretKey: process.env.JWT_RESET_PASSWORD_TOKEN_SECRET_KEY,
    jwtResetPasswordTokenExpiresIn: process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRES_IN,
  })),
];
