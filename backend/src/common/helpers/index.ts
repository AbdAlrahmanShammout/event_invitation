/**
 * Common Helpers Module Exports
 *
 * This is the main index file for all helper modules.
 * Import specific helpers based on your needs.
 */

// Request helpers - auto-detection of GraphQL support
export * from './request';

// Other helper modules (add more as needed)
export * from './bcrypt.helper';
export * from './code-generator.helper';

// Re-export request helpers for convenience
// These will automatically work with or without GraphQL installed
export {
  getRequestFromContext,
  getRequestFromHost,
  getRequestInfo,
  getUserFromRequestUseContext,
  getUserFromRequestUseHost,
  RequestInfo,
  RequestType,
} from './request';
