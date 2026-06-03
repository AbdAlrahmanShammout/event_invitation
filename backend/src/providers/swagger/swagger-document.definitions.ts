import { Type } from '@nestjs/common';

import { AdminApiModule } from '@/modules/admin-api.module';
import { HallManagerApiModule } from '@/modules/hall-manager-api.module';
import { MobileApiModule } from '@/modules/mobile-api.module';
import { SWAGGER_DOCUMENT_NAMES, SWAGGER_JSON_PATHS } from '@/providers/swagger/consts';

export type SwaggerDocumentDefinition = {
  readonly name: string;
  readonly titleSuffix: string;
  readonly description: string;
  readonly jsonPath: string;
  readonly include: readonly Type<unknown>[];
  readonly hasBearerAuth: boolean;
};

export const SWAGGER_DOCUMENT_DEFINITIONS: readonly SwaggerDocumentDefinition[] = [
  {
    name: SWAGGER_DOCUMENT_NAMES.admin,
    titleSuffix: SWAGGER_DOCUMENT_NAMES.admin,
    description: 'Administrative endpoints for platform operators.',
    jsonPath: SWAGGER_JSON_PATHS.admin,
    include: [AdminApiModule],
    hasBearerAuth: true,
  },
  {
    name: SWAGGER_DOCUMENT_NAMES.hallManager,
    titleSuffix: SWAGGER_DOCUMENT_NAMES.hallManager,
    description:
      'Endpoints for hall managers to operate halls, invitations, and WhatsApp sessions.',
    jsonPath: SWAGGER_JSON_PATHS.hallManager,
    include: [HallManagerApiModule],
    hasBearerAuth: true,
  },
  {
    name: SWAGGER_DOCUMENT_NAMES.mobile,
    titleSuffix: SWAGGER_DOCUMENT_NAMES.mobile,
    description: 'Mobile app endpoints authenticated with invitation QR tokens.',
    jsonPath: SWAGGER_JSON_PATHS.mobile,
    include: [MobileApiModule],
    hasBearerAuth: false,
  },
] as const;
