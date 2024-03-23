import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  env: process.env.NODE_ENV,
  name: process.env.REDIS_NAME,
  option: process.env.REDIS_OPTION,
}));
