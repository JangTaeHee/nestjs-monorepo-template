import { NestFactory } from '@nestjs/core';
import { AppModule } from './sub-app.module';
import { SubAppConfigService } from '@lib/config/sub-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: SubAppConfigService = app.get(SubAppConfigService);

  console.log('App Name: ', appConfig.name);

  await app.listen(appConfig.port);
}
bootstrap();
