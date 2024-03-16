import { Module } from '@nestjs/common';
import { MainAppController } from './main-app.controller';
import { MainAppService } from './main-app.service';
import { MainAppConfigModule } from '@lib/config/main-app';
import { CommonLoggerModule } from '@lib/log';

@Module({
  imports: [CommonLoggerModule, MainAppConfigModule],
  controllers: [MainAppController],
  providers: [MainAppService],
})
export class MainAppModule {}
