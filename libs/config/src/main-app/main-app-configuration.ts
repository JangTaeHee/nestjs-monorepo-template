import { registerAs } from '@nestjs/config';

export default registerAs('main_app', () => ({
  env: process.env.NODE_ENV,
  name: process.env.MAIN_APP_NAME,
  port: process.env.MAIN_APP_PORT,
}));
