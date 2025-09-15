import { Injectable } from '@nestjs/common';
import { BaseConfigService } from '@/config/base-config.service';

@Injectable()
export class SwaggerConfigService extends BaseConfigService {
  get title(): string {
    return this.getValue<string>('swagger.title');
  }

  get version(): string {
    return this.getValue<string>('swagger.version');
  }

  get description(): string {
    return this.getValue<string>('swagger.description');
  }
}
