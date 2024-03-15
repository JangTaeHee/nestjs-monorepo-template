import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { MainAppConfigService } from './main-app-config.service';
import configuration from './main-app-configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('local'),
        MAIN_APP_NAME: Joi.string().default('main'),
        MAIN_APP_PORT: Joi.number().default(8080),
      }),
    }),
  ],
  providers: [ConfigService, MainAppConfigService],
  exports: [ConfigService, MainAppConfigService],
})
export class MainAppConfigModule {}
