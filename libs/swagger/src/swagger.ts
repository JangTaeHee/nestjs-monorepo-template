import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(
  app: INestApplication,
  mode: 'main-app' | 'sub-app',
  level: 'organization' | 'user',
  title: string,
  desc: string,
  version: number,
  tag: string,
  modules: any[],
): void {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(title)
    .setDescription(desc)
    .setVersion(`${version}.0`)
    .addTag(tag)
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'ORGANIZATION_API_KEY',
        description: 'ORGANIZATION API KEY',
        in: 'header',
      },
      'ORGANIZATION_API_KEY',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: modules,
  });
  const path = `v${version}/${mode}/api/docs/${tag}`;
  SwaggerModule.setup(path, app, document);
}
