import { Injectable } from '@nestjs/common';

import { EnvTypes } from '@/config/enviroment';

import { BaseConfigService } from '../base-config.service';

@Injectable()
export class AppConfigService extends BaseConfigService {
  get url(): string {
    return this.getValue<string>('app.url');
  }

  get port(): number {
    return this.getValue<number>('app.port');
  }

  get clientUrl(): string {
    return this.getValue<string>('app.clientUrl');
  }

  get env(): EnvTypes {
    return this.getValue<EnvTypes>('app.env');
  }

  get name(): string {
    return this.getValue<string>('app.name');
  }
}
