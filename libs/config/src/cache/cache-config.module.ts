import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './cache-configuration';
import { CacheConfigService } from './cache-config.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('local'),
        REDIS_NAME: Joi.string().default('redis'),
        REDIS_OPTION: Joi.string().default('{"host":"127.0.0.1","port":6379}'),
      }),
    }),
  ],
  providers: [ConfigService, CacheConfigService],
  exports: [ConfigService, CacheConfigService],
})
export class CacheConfigModule {}
