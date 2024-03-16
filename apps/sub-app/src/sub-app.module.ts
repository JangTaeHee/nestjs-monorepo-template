import { Module } from '@nestjs/common';
import { AppController } from './sub-app.controller';
import { AppService } from './sub-app.service';
import { SubAppConfigModule } from '@lib/config/sub-app';
import { CommonLoggerModule } from '@lib/log';

@Module({
  imports: [CommonLoggerModule, SubAppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
