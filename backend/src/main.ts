import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AppConfigService} from "@/config/app/app-config.service";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.port;
  await app.listen(port || 3000);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
