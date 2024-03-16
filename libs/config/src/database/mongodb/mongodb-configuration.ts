import { registerAs } from '@nestjs/config';

export default registerAs('database_mongo', () => ({
  host: process.env.DATABASE_HOST_MONGO,
}));
