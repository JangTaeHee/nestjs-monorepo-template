import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './main-app.module';
import { MainAppConfigService } from '@lib/config/main-app';

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule, { bufferLogs: true });

  const appConfig: MainAppConfigService = app.get(MainAppConfigService);

  console.log('App Name: ', appConfig.name);

  await app.listen(appConfig.port);
}
bootstrap();
