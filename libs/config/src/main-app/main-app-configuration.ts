import { registerAs } from '@nestjs/config';

export default registerAs('mainApp', () => ({
  env: process.env.NODE_ENV,
  name: process.env.MAIN_APP_NAME,
  port: process.env.MAIN_APP_PORT,
  swaggerUser: process.env.SWAGGER_USER,
  swaggerPassword: process.env.SWAGGER_PASSWORD,
}));
