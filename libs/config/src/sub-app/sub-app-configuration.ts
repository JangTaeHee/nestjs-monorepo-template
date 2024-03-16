import { registerAs } from '@nestjs/config';

export default registerAs('sub_app', () => ({
  env: process.env.NODE_ENV,
  name: process.env.SUB_APP_NAME,
  port: process.env.SUB_APP_PORT,
}));
