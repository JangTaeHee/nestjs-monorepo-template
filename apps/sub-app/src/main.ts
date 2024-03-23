import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './sub-app.module';
import { SubAppConfigService } from '@lib/config/sub-app';
import { Logger } from 'nestjs-pino';
import { AllExceptionsFilter } from 'libs/exception/src';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);

  app.useLogger(logger);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const appConfig: SubAppConfigService = app.get(SubAppConfigService);

  await app
    .listen(appConfig.port)
    .then(() =>
      logger.log(
        `--------------- [port: ${appConfig.port}] ${appConfig.name} start!! ---------------`,
      ),
    );
}
bootstrap();
