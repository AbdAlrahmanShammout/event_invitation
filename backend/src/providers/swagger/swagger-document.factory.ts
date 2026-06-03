import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { SwaggerConfigService } from '@/config/swagger/swagger-config.service';
import { SwaggerDocumentDefinition } from '@/providers/swagger/swagger-document.definitions';

/**
 * Builds an OpenAPI document scoped to a single API audience.
 */
export function createSwaggerDocument(
  app: INestApplication,
  swaggerConfigService: SwaggerConfigService,
  documentDefinition: SwaggerDocumentDefinition,
): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(documentDefinition.titleSuffix)
    .setDescription(documentDefinition.description)
    .setVersion(swaggerConfigService.version)
    .addServer('');

  if (documentDefinition.hasBearerAuth) {
    builder.addBearerAuth();
  }

  return SwaggerModule.createDocument(app, builder.build(), {
    include: [...documentDefinition.include],
    deepScanRoutes: true,
  });
}
