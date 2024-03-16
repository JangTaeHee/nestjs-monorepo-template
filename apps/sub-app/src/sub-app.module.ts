import { Module } from '@nestjs/common';
import { AppController } from './sub-app.controller';
import { AppService } from './app.service';
import { SubAppConfigModule } from '@lib/config/sub-app';

@Module({
  imports: [SubAppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
