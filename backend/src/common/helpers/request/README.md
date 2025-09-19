# Request Helper Modules

This directory contains modular request helper utilities that can work with or without GraphQL dependencies.

## Files Overview

- **`request-base.helper.ts`** - Core HTTP-only functionality (no GraphQL dependencies)
- **`request-graphql.helper.ts`** - GraphQL extension that includes all base functionality plus GraphQL support
- **`request.helper.ts`** - Legacy file (deprecated but kept for backward compatibility)
- **`index.ts`** - Smart exports with automatic GraphQL detection

## Usage Scenarios

### 1. HTTP-Only Projects (No GraphQL)

```typescript
// Import HTTP-only version (no GraphQL dependencies required)
import {
  getHttpRequestFromContext,
  getHttpRequestFromHost,
  getUserFromHttpRequestUseContext,
  RequestInfo,
  RequestType
} from '@/common/helpers/request-base.helper';

// Usage example
@Controller()
export class MyController {
  @Get()
  async getData(@Req() req: Request, @ExecutionContext() context: ExecutionContext) {
    const request = getHttpRequestFromContext(context);
    const user = getUserFromHttpRequestUseContext(context);
    const info = new RequestInfo(context);
    
    return {
      ip: info.getIp(),
      userAgent: info.getUserAgent(),
      user: user
    };
  }
}
```

### 2. Projects with GraphQL Support

```typescript
// Import GraphQL-enabled version (requires @nestjs/graphql)
import {
  getRequestFromContext,
  getRequestFromHost,
  getUserFromRequestUseContext,
  RequestInfo,
  RequestType
} from '@/common/helpers/request-graphql.helper';

// Usage example - works with both HTTP and GraphQL
@Resolver()
export class MyResolver {
  @Query()
  async getData(@Context() context: ExecutionContext) {
    const request = getRequestFromContext(context); // Works for both HTTP and GraphQL
    const user = getUserFromRequestUseContext(context);
    const info = new RequestInfo(context);
    
    return {
      ip: info.getIp(),
      userAgent: info.getUserAgent(),
      user: user
    };
  }
}
```

### 3. Auto-Detection (Recommended)

```typescript
// Automatically uses GraphQL version if @nestjs/graphql is available,
// otherwise falls back to HTTP-only version
import {
  getRequestFromContext,
  getUserFromRequestUseContext,
  RequestInfo
} from '@/common/helpers';

// This will work regardless of whether GraphQL is installed
```

### 4. Backward Compatibility

```typescript
// Existing imports will continue to work (but require @nestjs/graphql)
import {
  getRequestFromContext,
  getUserFromRequestUseContext,
  RequestInfo
} from '@/common/helpers/request.helper';
```

## Function Mapping

| Base Helper (HTTP-only) | GraphQL Helper | Description |
|-------------------------|----------------|-------------|
| `getHttpRequestFromContext` | `getRequestFromContext` | Get request from ExecutionContext |
| `getHttpRequestFromHost` | `getRequestFromHost` | Get request from ArgumentsHost |
| `getUserFromHttpRequestUseContext` | `getUserFromRequestUseContext` | Get user from request via context |
| `getUserFromHttpRequestUseHost` | `getUserFromRequestUseHost` | Get user from request via host |

## RequestInfo Class Features

The `RequestInfo` class provides additional methods in both versions:

```typescript
const info = new RequestInfo(context);

// Available in both versions
info.getIp()          // Get client IP
info.getUserAgent()   // Get user agent
info.getMethod()      // Get HTTP method
info.getUrl()         // Get request URL
info.getHeaders()     // Get all headers
info.getUser()        // Get authenticated user
```

## Installation Requirements

- **Base Helper**: Only requires `@nestjs/common` and `express`
- **GraphQL Helper**: Additionally requires `@nestjs/graphql`

## Migration Guide

### From Legacy Helper

If you're currently using the original `request.helper.ts`:

1. **No GraphQL in your project?**
   ```typescript
   // Change from:
   import { ... } from '@/common/helpers/request.helper';
   
   // To:
   import { ... } from '@/common/helpers/request-base.helper';
   // Update function names (add 'Http' prefix for clarity)
   ```

2. **Using GraphQL?**
   ```typescript
   // Keep existing imports, they'll work as before:
   import { ... } from '@/common/helpers/request.helper';
   
   // Or switch to explicit GraphQL import:
   import { ... } from '@/common/helpers/request-graphql.helper';
   ```

3. **Want auto-detection?**
   ```typescript
   // Change from:
   import { ... } from '@/common/helpers/request.helper';
   
   // To:
   import { ... } from '@/common/helpers';
   ```

## Benefits

1. **No Forced Dependencies**: Use HTTP-only version without installing GraphQL packages
2. **Gradual Migration**: Add GraphQL support when needed without breaking existing code
3. **Better Performance**: Smaller bundle size when GraphQL is not needed
4. **Type Safety**: Full TypeScript support in all versions
5. **Backward Compatibility**: Existing code continues to work
