import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BaseConfigService {
  constructor(private configService: ConfigService) {}

  getValue<T>(key: string): T {
    return this.configService.get<T>(key);
  }
}
