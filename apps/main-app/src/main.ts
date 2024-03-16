import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './main-app.module';
import { MainAppConfigService } from '@lib/config/main-app';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule, { bufferLogs: true });
  const logger = app.get(Logger);

  app.useLogger(logger);

  const appConfig: MainAppConfigService = app.get(MainAppConfigService);

  await app
    .listen(appConfig.port)
    .then(() =>
      logger.log(
        `--------------- [port: ${appConfig.port}] ${appConfig.name} start!! ---------------`,
      ),
    );
}
bootstrap();
