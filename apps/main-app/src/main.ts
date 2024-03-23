import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MainAppModule } from './main-app.module';
import { MainAppConfigService } from '@lib/config/main-app';
import { Logger } from 'nestjs-pino';
import { VersioningType } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { setupSwagger } from '@lib/swagger';
import { OrganizationsModuleV1 } from './models/organizations/v1/organizations.module';
import { AllExceptionsFilter } from 'libs/exception/src';

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule, { bufferLogs: true });
  const logger = app.get(Logger);

  app.useLogger(logger);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const appConfig: MainAppConfigService = app.get(MainAppConfigService);

  // Start versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  // End versioning

  // Start - swagger v1
  if (appConfig.env !== 'production') {
    app.use(
      ['/*/api/docs'],
      basicAuth({
        challenge: true,
        users: {
          [appConfig.swaggerUser]: appConfig.swaggerPassword,
        },
      }),
    );
    // organization
    setupSwagger(
      app,
      'main-app',
      'organization',
      'Organization API',
      'Organization API Description',
      1,
      'organizations',
      [OrganizationsModuleV1],
    );
  }
  // End - swagger v1

  await app
    .listen(appConfig.port)
    .then(() =>
      logger.log(
        `--------------- [port: ${appConfig.port}] ${appConfig.name} start!! ---------------`,
      ),
    );
}
bootstrap();
