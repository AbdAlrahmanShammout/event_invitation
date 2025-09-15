import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as YAML from 'js-yaml';
import { SwaggerConfigService } from '@/config/swagger/swagger-config.service';
import { SWAGGER_API_ROOT } from '@/providers/swagger/consts';
import { AppConfigService } from '@/config/app/app-config.service';
import { EnvTypes } from '@/config/enviroment';

export class SwaggerProvider {
  static setupSwagger(app: INestApplication): void {
    const appConfigService = app.get(AppConfigService);
    const swaggerConfigService = app.get(SwaggerConfigService);

    // Skip adding swagger docs in production and staging
    const allowedEnvsForSwagger = [EnvTypes.LOCAL, EnvTypes.DEVELOPMENT];
    if (!allowedEnvsForSwagger.includes(appConfigService.env)) {
      return;
    }

    const config = new DocumentBuilder()
      .setTitle(swaggerConfigService.title)
      .setDescription(swaggerConfigService.description)
      .setVersion(swaggerConfigService.version)
      .addBearerAuth()
      .addServer('')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    // Convert JSON to YAML
    // const yamlDocument = YAML.dump(document);

    // Write YAML to file
    // fs.writeFileSync('./swagger-spec.yaml', yamlDocument);
    SwaggerModule.setup(SWAGGER_API_ROOT, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}
