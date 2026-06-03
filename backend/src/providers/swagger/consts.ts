export const SWAGGER_UI_ROOT = 'docs';

export const SWAGGER_JSON_PATHS = {
  admin: 'docs-json/admin',
  hallManager: 'docs-json/hall-manager',
  mobile: 'docs-json/mobile',
} as const;

export const SWAGGER_DOCUMENT_NAMES = {
  admin: 'Admin API',
  hallManager: 'Hall Manager API',
  mobile: 'Mobile App API',
} as const;
