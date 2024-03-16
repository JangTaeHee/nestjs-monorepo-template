import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { SubAppConfigService } from './sub-app-config.service';
import configuration from './sub-app-configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('local'),
        SUB_APP_NAME: Joi.string().default('sub'),
        SUB_APP_PORT: Joi.number().default(9090),
      }),
    }),
  ],
  providers: [ConfigService, SubAppConfigService],
  exports: [ConfigService, SubAppConfigService],
})
export class SubAppConfigModule {}
