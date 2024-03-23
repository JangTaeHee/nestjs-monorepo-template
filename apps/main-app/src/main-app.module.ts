import { Module } from '@nestjs/common';
import { MainAppController } from './main-app.controller';
import { MainAppService } from './main-app.service';
import { MainAppConfigModule } from '@lib/config/main-app';
import { CommonLoggerModule } from '@lib/log';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CommonCacheModule } from '@lib/cache';
import { DataServicesModule } from '@lib/database';
import { OrganizationsModule } from './models/organizations/organizations.module';

@Module({
  imports: [
    CommonLoggerModule,
    CommonCacheModule,
    DataServicesModule,
    MainAppConfigModule,
    OrganizationsModule,
  ],
  controllers: [MainAppController],
  providers: [
    MainAppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class MainAppModule {}
