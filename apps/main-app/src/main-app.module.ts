import { Module } from '@nestjs/common';
import { MainAppController } from './main-app.controller';
import { MainAppService } from './main-app.service';
import { MainAppConfigModule } from '@lib/config/main-app';

@Module({
  imports: [MainAppConfigModule],
  controllers: [MainAppController],
  providers: [MainAppService],
})
export class MainAppModule {}
