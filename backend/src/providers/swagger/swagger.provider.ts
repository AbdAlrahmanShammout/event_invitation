import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';

import { AppConfigService } from '@/config/app/app-config.service';
import { EnvTypes } from '@/config/enviroment';
import { SwaggerConfigService } from '@/config/swagger/swagger-config.service';
import { SWAGGER_UI_ROOT } from '@/providers/swagger/consts';
import { SWAGGER_DOCUMENT_DEFINITIONS } from '@/providers/swagger/swagger-document.definitions';
import { createSwaggerDocument } from '@/providers/swagger/swagger-document.factory';

type GeneratedSwaggerDocument = {
  readonly definition: (typeof SWAGGER_DOCUMENT_DEFINITIONS)[number];
  readonly document: OpenAPIObject;
};

type SwaggerUrlDefinition = {
  readonly name: string;
  readonly url: string;
};

type SwaggerUiMultiSpecOptions = {
  readonly customSiteTitle: string;
  readonly swaggerUrls: readonly SwaggerUrlDefinition[];
  readonly swaggerOptions: {
    readonly persistAuthorization: boolean;
  };
};

/**
 * Configures a single Swagger UI entry point with multiple audience-specific OpenAPI specs.
 */
export class SwaggerProvider {
  /**
   * Registers Swagger UI and JSON endpoints when the application runs in a documented environment.
   */
  static setupSwagger(app: INestApplication): void {
    const appConfigService = app.get(AppConfigService);
    const swaggerConfigService = app.get(SwaggerConfigService);
    const allowedEnvsForSwagger = [EnvTypes.LOCAL, EnvTypes.DEVELOPMENT];

    if (!allowedEnvsForSwagger.includes(appConfigService.env)) {
      return;
    }

    const generatedDocuments = SWAGGER_DOCUMENT_DEFINITIONS.map(
      (documentDefinition): GeneratedSwaggerDocument => ({
        definition: documentDefinition,
        document: createSwaggerDocument(app, swaggerConfigService, documentDefinition),
      }),
    );

    SwaggerProvider.registerJsonEndpoints(app, generatedDocuments);
    SwaggerProvider.setupSwaggerUi(app, generatedDocuments);
  }

  private static registerJsonEndpoints(
    app: INestApplication,
    generatedDocuments: readonly GeneratedSwaggerDocument[],
  ): void {
    const httpAdapter = app.getHttpAdapter();

    generatedDocuments.forEach(({ definition, document }: GeneratedSwaggerDocument) => {
      httpAdapter.get(`/${definition.jsonPath}`, (_request, response) => {
        response.json(document);
      });
    });
  }

  private static setupSwaggerUi(
    app: INestApplication,
    generatedDocuments: readonly GeneratedSwaggerDocument[],
  ): void {
    if (generatedDocuments.length === 0) {
      return;
    }

    const httpAdapter = app.getHttpAdapter();
    const expressApp = httpAdapter.getInstance();
    const swaggerUrls = generatedDocuments.map(({ definition }: GeneratedSwaggerDocument) => ({
      name: definition.name,
      url: `/${definition.jsonPath}`,
    }));

    const swaggerUiOptions: SwaggerUiMultiSpecOptions = {
      customSiteTitle: 'Event Invitation API Documentation',
      swaggerUrls,
      swaggerOptions: {
        persistAuthorization: true,
      },
    };

    expressApp.use(
      `/${SWAGGER_UI_ROOT}`,
      swaggerUi.serve,
      swaggerUi.setup(undefined, swaggerUiOptions as unknown as SwaggerUiOptions),
    );
  }
}
