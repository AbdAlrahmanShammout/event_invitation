import { registerAs } from '@nestjs/config';
export default [
  registerAs('app', () => ({
    url: process.env.SERVER_URL,
    port: process.env.SERVER_PORT,
    clientUrl: process.env.CLIENT_URL,
    env: process.env.APP_ENV,
  })),
];
