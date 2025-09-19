/**
 * Legacy Request Helper
 *
 * DEPRECATED: This file is kept for backward compatibility.
 * For new projects, use one of the following instead:
 *
 * 1. HTTP-only projects:
 *    import { ... } from '@/common/helpers/request/request-base.helper';
 *
 * 2. Projects with GraphQL:
 *    import { ... } from '@/common/helpers/request/request-graphql.helper';
 *
 * 3. Auto-detection (recommended):
 *    import { ... } from '@/common/helpers/request';
 */

// Re-export from the GraphQL-enabled version for backward compatibility
// Note: This will require @nestjs/graphql to be installed
export * from './request/request-graphql.helper';
