import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { MongoDatabaseConfigService } from './mongodb-config.service';
import configuration from './mongodb-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_HOST_MONGO: Joi.string().default(
          'mongodb://127.0.0.1:27017/test',
        ),
      }),
    }),
  ],
  providers: [ConfigService, MongoDatabaseConfigService],
  exports: [ConfigService, MongoDatabaseConfigService],
})
export class MongoDatabaseConfigModule {}
