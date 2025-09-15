import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from '@/config/app/app-config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import {SwaggerProvider} from "@/providers/swagger/swagger.provider";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  SwaggerProvider.setupSwagger(app);



  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.port;
  await app.listen(port || 3000);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Swagger documentation available at http://localhost:${port}/docs`, 'Bootstrap');
}
bootstrap();
