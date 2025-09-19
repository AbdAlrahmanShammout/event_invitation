/**
 * Request Helper Module Exports
 *
 * Choose the appropriate import based on your needs:
 *
 * 1. For HTTP-only projects (no GraphQL):
 *    import { ... } from '@/common/helpers/request/request-base.helper';
 *
 * 2. For projects with GraphQL support:
 *    import { ... } from '@/common/helpers/request/request-graphql.helper';
 *
 * 3. Auto-detection (this file):
 *    import { ... } from '@/common/helpers/request';
 *
 *    This will automatically work with or without GraphQL installed.
 *    When GraphQL is not available, it falls back to HTTP-only behavior.
 */

// Export the GraphQL-enhanced version which includes fallbacks to HTTP-only
// This works whether GraphQL is installed or not
export * from './request-graphql.helper';
