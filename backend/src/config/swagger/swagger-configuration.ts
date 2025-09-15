import { registerAs } from '@nestjs/config';
import { version } from '../../../package.json';

export default registerAs('swagger', () => ({
  title: process.env.APP_NAME,
  description: 'API documentation for Event Invitation Management System',
  version,
}));
