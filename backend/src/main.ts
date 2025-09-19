import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { InputValidationPipe } from '@/common/pipes/input-validation.pipe';
import { AppConfigService } from '@/config/app/app-config.service';
import { SwaggerProvider } from '@/providers/swagger/swagger.provider';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new InputValidationPipe());

  SwaggerProvider.setupSwagger(app);

  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.port;
  await app.listen(port || 3000);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Swagger documentation available at http://localhost:${port}/docs`, 'Bootstrap');
}
bootstrap();
