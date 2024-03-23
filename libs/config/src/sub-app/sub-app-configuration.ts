import { registerAs } from '@nestjs/config';

export default registerAs('subApp', () => ({
  env: process.env.NODE_ENV,
  name: process.env.SUB_APP_NAME,
  port: process.env.SUB_APP_PORT,
  swaggerUser: process.env.SWAGGER_USER,
  swaggerPassword: process.env.SWAGGER_PASSWORD,
}));
