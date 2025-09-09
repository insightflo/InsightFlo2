# InsightFlo API Interface Specification

**Standards Guardian Approved**  
**Version**: 2.0.0  
**Last Updated**: 2025-01-08  
**Authority**: Standards Guardian  
**Status**: PRODUCTION STANDARD

---

## 🎯 Overview

This document serves as the **single source of truth** for all API interfaces between Frontend and Backend teams. All implementations must strictly adhere to this specification.

### Base Configuration
```yaml
version: 2.0.0
base_url: /api
environment:
  development: http://localhost:3000
  production: https://api.insightflo.app
authentication: Bearer JWT
content_type: application/json
encoding: UTF-8
```

---

## 🔐 Authentication APIs

### 1. User Registration
```yaml
endpoint: /api/auth/signup
method: POST
authentication: none (public)
description: Register new user account with email/password

request:
  headers:
    Content-Type: application/json
  body:
    email: string (required, valid email format)
    password: string (required, min 8 chars, complexity required)
    nickname: string (optional, max 50 chars)

responses:
  201:
    description: User created successfully
    body:
      success: boolean (true)
      message: string
      user: UserObject
      tokens: TokensObject
  400:
    description: Validation failed
    body:
      success: boolean (false)
      error: ErrorObject
  409:
    description: Email already exists
    body:
      success: boolean (false)
      error: ErrorObject

security_requirements:
  - Email format validation (RFC 5322)
  - Password complexity: 8+ chars, uppercase, lowercase, digit, special char
  - Email uniqueness check
  - Rate limiting: 5 attempts per IP per hour
```

### 2. User Authentication (Sign In)
```yaml
endpoint: /api/auth/signin  
method: POST
authentication: none (public)
description: Authenticate user and issue JWT tokens

request:
  headers:
    Content-Type: application/json
  body:
    email: string (required, valid email)
    password: string (required)

responses:
  200:
    description: Authentication successful
    body:
      success: boolean (true)
      message: string
      tokens: TokensObject
      user: UserObject
  401:
    description: Invalid credentials
    body:
      success: boolean (false)
      error: ErrorObject
  429:
    description: Rate limit exceeded
    body:
      success: boolean (false)
      error: ErrorObject

security_requirements:
  - bcrypt password verification
  - Account lockout: 5 failed attempts per 15 minutes
  - Rate limiting: 10 attempts per IP per hour
  - Secure token generation (HS256, 32+ char secret)
```

### 3. Token Refresh
```yaml
endpoint: /api/auth/refresh
method: POST  
authentication: none (uses refresh token)
description: Refresh expired access token using refresh token

request:
  headers:
    Content-Type: application/json
  body:
    refreshToken: string (required, valid JWT)

responses:
  200:
    description: Tokens refreshed successfully
    body:
      success: boolean (true)
      tokens: TokensObject
  401:
    description: Invalid or expired refresh token
    body:
      success: boolean (false)
      error: ErrorObject

security_requirements:
  - Refresh token rotation (new tokens issued)
  - Token blacklisting for used refresh tokens
  - Refresh token max age: 30 days
```

### 4. User Profile
```yaml
endpoint: /api/auth/profile
method: GET
authentication: Bearer JWT (required)
description: Get current authenticated user profile

request:
  headers:
    Authorization: Bearer {accessToken}

responses:
  200:
    description: Profile retrieved successfully
    body:
      success: boolean (true)
      user: UserObject
  401:
    description: Authentication required
    body:
      success: boolean (false)
      error: ErrorObject

security_requirements:
  - Valid JWT access token required
  - Token expiry validation (max 1 hour)
  - User ID extraction from JWT payload
```

### 5. Authentication Test Suite
```yaml
endpoint: /api/test/auth
method: POST
authentication: none (development/testing only)
description: Run comprehensive authentication system tests

request:
  headers:
    Content-Type: application/json
  body:
    testType: string (optional, enum: full, signup, signin, token, profile, default: full)

responses:
  200:
    description: Test results successfully generated
    body:
      success: boolean (true if all tests passed)
      summary: TestSummaryObject
      results: TestResultObject[]
      timestamp: string (ISO 8601 format)

security_requirements:
  - Development environment only
  - Rate limiting: 10 requests per hour
  - Does not expose sensitive authentication data

usage_guidelines:
  - For integration testing and CI/CD pipelines
  - Provides comprehensive test coverage for auth system
  - Individual test isolation (signup, signin, token, profile)
  - Full suite execution with detailed reporting

### TestSummaryObject
```yaml
TestSummaryObject:
  type: object
  required: [total, passed, failed]
  properties:
    total:
      type: integer
      minimum: 0
      description: Total number of tests executed
    passed:
      type: integer
      minimum: 0
      description: Number of tests that passed
    failed:
      type: integer
      minimum: 0
      description: Number of tests that failed
```

### TestResultObject
```yaml
TestResultObject:
  type: object
  required: [test, success, message]
  properties:
    test:
      type: string
      enum: [signup, signin, token, profile]
      description: Name of the test executed
    success:
      type: boolean
      description: Whether the test passed
    message:
      type: string
      description: Human-readable test result description
    data:
      type: object
      nullable: true
      description: Additional test data (user ID, token status, etc.)
    error:
      type: string
      nullable: true
      description: Error details if test failed
```
```

---

## 📰 News APIs

### 1. Personalized News Feed
```yaml
endpoint: /api/v1/news/personalized
method: GET
authentication: Bearer JWT (required)
description: Get personalized news feed based on user preferences

request:
  headers:
    Authorization: Bearer {accessToken}
  query_parameters:
    page: integer (optional, default: 1, min: 1)
    limit: integer (optional, default: 20, min: 1, max: 100)  
    keywords: string (optional, comma-separated keywords)

responses:
  200:
    description: Personalized news retrieved
    body:
      success: boolean (true)
      data: NewsObject[]
      meta: PaginationMeta
  401:
    description: Authentication required
    body:
      success: boolean (false)
      error: ErrorObject

business_logic:
  - Relevance scoring based on user preferences
  - Personalized keyword filtering
  - Chronological ordering (newest first)
```

### 2. News Article Detail
```yaml
endpoint: /api/v1/news/{id}
method: GET
authentication: Bearer JWT (optional)
description: Get detailed news article by ID

path_parameters:
  id: string (required, UUID format)

request:
  headers:
    Authorization: Bearer {accessToken} (optional)

responses:
  200:
    description: News article retrieved
    body:
      success: boolean (true)
      data: NewsObject
  404:
    description: News article not found
    body:
      success: boolean (false)
      error: ErrorObject

business_logic:
  - Authenticated users get bookmark status and relevance score
  - Unauthenticated users get basic article info only
  - View count tracking for analytics
```

### 3. News Search
```yaml
endpoint: /api/v1/news/search
method: GET
authentication: Bearer JWT (optional)
description: Search news articles with filters

request:
  headers:
    Authorization: Bearer {accessToken} (optional)
  query_parameters:
    query: string (required, min 1 char, max 200 chars)
    page: integer (optional, default: 1, min: 1)
    limit: integer (optional, default: 20, min: 1, max: 100)
    sentiment: string (optional, enum: POSITIVE|NEGATIVE|NEUTRAL)
    dateFrom: string (optional, format: YYYY-MM-DD)
    dateTo: string (optional, format: YYYY-MM-DD)

responses:
  200:
    description: Search results retrieved
    body:
      success: boolean (true)
      data: NewsObject[]
      meta: PaginationMeta
  400:
    description: Invalid search parameters
    body:
      success: boolean (false)
      error: ErrorObject

business_logic:
  - Full-text search on title and content
  - Keyword highlighting in results
  - Relevance-based ranking
  - Date range validation (dateFrom <= dateTo)
```

---

## 📊 Data Type Definitions

### UserObject
```yaml
UserObject:
  type: object
  required: [id, email, createdAt, updatedAt]
  properties:
    id:
      type: string
      format: UUID
      description: Unique user identifier
    email:
      type: string
      format: email
      description: User email address
    nickname:
      type: string
      nullable: true
      maxLength: 50
      description: User display name
    profileImageUrl:
      type: string
      format: uri
      nullable: true
      description: User profile image URL
    createdAt:
      type: string
      format: date-time (ISO 8601)
      description: Account creation timestamp
    updatedAt:
      type: string
      format: date-time (ISO 8601)
      description: Last profile update timestamp
```

### NewsObject
```yaml
NewsObject:
  type: object
  required: [id, title, content, sentiment, publishedAt, sourceUrl, createdAt]
  properties:
    id:
      type: string
      format: UUID
      description: Unique news article identifier
    title:
      type: string
      maxLength: 200
      description: Article headline
    content:
      type: string
      description: Full article content
    summary:
      type: string
      nullable: true
      maxLength: 500
      description: AI-generated 3-line summary
    sentiment:
      type: string
      enum: [POSITIVE, NEGATIVE, NEUTRAL]
      description: AI-analyzed sentiment
    keywords:
      type: array
      items:
        type: string
        maxLength: 50
      nullable: true
      description: Extracted keywords
    publishedAt:
      type: string
      format: date-time (ISO 8601)
      description: Original publication date
    sourceUrl:
      type: string
      format: uri
      description: Original article URL
    createdAt:
      type: string
      format: date-time (ISO 8601)
      description: System ingestion timestamp
    isBookmarked:
      type: boolean
      nullable: true
      description: User bookmark status (authenticated only)
    relevanceScore:
      type: number
      format: float
      minimum: 0.0
      maximum: 1.0
      nullable: true
      description: Personalization score (authenticated only)
```

### TokensObject
```yaml
TokensObject:
  type: object
  required: [accessToken, refreshToken]
  properties:
    accessToken:
      type: string
      format: JWT
      description: Short-lived access token (1 hour expiry)
    refreshToken:
      type: string  
      format: JWT
      description: Long-lived refresh token (30 day expiry)
```

### PaginationMeta
```yaml
PaginationMeta:
  type: object
  required: [page, limit, total, totalPages]
  properties:
    page:
      type: integer
      minimum: 1
      description: Current page number
    limit:
      type: integer
      minimum: 1
      maximum: 100
      description: Items per page
    total:
      type: integer
      minimum: 0
      description: Total number of items
    totalPages:
      type: integer
      minimum: 0
      description: Total number of pages
```

### ErrorObject
```yaml
ErrorObject:
  type: object
  required: [code, message]
  properties:
    code:
      type: string
      enum: [VALIDATION_ERROR, AUTHENTICATION_REQUIRED, INVALID_CREDENTIALS, ACCESS_DENIED, RESOURCE_NOT_FOUND, RESOURCE_ALREADY_EXISTS, RATE_LIMIT_EXCEEDED, INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE]
      description: Machine-readable error code
    message:
      type: string
      description: Human-readable error message
    details:
      type: object
      nullable: true
      description: Additional error context
      properties:
        field:
          type: string
          description: Field name causing validation error
        reason:
          type: string
          description: Specific validation failure reason
```

---

## ❌ Error Handling Standards

### Standard Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error description",
    "details": {
      "field": "fieldName",
      "reason": "Specific reason for failure"
    }
  }
}
```

### Error Code Standards
```yaml
error_codes:
  VALIDATION_ERROR:
    http_status: 400
    description: Request validation failed
    usage: Invalid input data, missing required fields
    
  AUTHENTICATION_REQUIRED:
    http_status: 401
    description: Valid authentication token required
    usage: Missing or malformed Authorization header
    
  INVALID_CREDENTIALS:
    http_status: 401
    description: Authentication credentials are invalid
    usage: Wrong email/password combination
    
  ACCESS_DENIED:
    http_status: 403
    description: Insufficient permissions for resource
    usage: Valid token but unauthorized for specific action
    
  RESOURCE_NOT_FOUND:
    http_status: 404
    description: Requested resource does not exist
    usage: Invalid user ID, news article ID, etc.
    
  RESOURCE_ALREADY_EXISTS:
    http_status: 409
    description: Resource conflicts with existing data
    usage: Email already registered, duplicate entries
    
  RATE_LIMIT_EXCEEDED:
    http_status: 429
    description: Too many requests in time window
    usage: API rate limiting, login attempt limits
    
  INTERNAL_SERVER_ERROR:
    http_status: 500
    description: Unexpected server-side error
    usage: Database failures, service unavailable
    
  SERVICE_UNAVAILABLE:
    http_status: 503
    description: Service temporarily unavailable
    usage: Maintenance mode, service overload
```

---

## 🛡️ Security Standards

### Authentication & Authorization
```yaml
jwt_configuration:
  algorithm: HS256
  secret_key_length: 32+ characters
  access_token:
    expiry: 1 hour
    payload: [user_id, email, iat, exp]
  refresh_token:
    expiry: 30 days
    rotation: true (new tokens on refresh)
    storage: secure HTTP-only cookie (production)

password_policy:
  minimum_length: 8 characters
  complexity_requirements:
    - At least one uppercase letter (A-Z)
    - At least one lowercase letter (a-z)  
    - At least one digit (0-9)
    - At least one special character (!@#$%^&*)
  hashing:
    algorithm: bcrypt
    rounds: 12
    
rate_limiting:
  global: 1000 requests per hour per IP
  authentication: 10 requests per hour per IP
  registration: 5 requests per hour per IP
  password_reset: 3 requests per hour per email
```

### Input Validation & Sanitization
```yaml
validation_rules:
  email:
    format: RFC 5322 compliant
    max_length: 254 characters
    normalization: lowercase
  
  password:
    min_length: 8 characters
    max_length: 128 characters
    encoding: UTF-8
  
  nickname:
    min_length: 1 character
    max_length: 50 characters
    allowed_characters: alphanumeric, spaces, basic punctuation
    sanitization: HTML entity encoding
  
  search_query:
    min_length: 1 character
    max_length: 200 characters
    sanitization: SQL injection prevention, XSS prevention

sql_injection_prevention:
  - Parameterized queries only
  - No dynamic SQL construction
  - Input sanitization for all user inputs
  - ORM usage (Prisma) for query building

xss_prevention:  
  - HTML entity encoding for all user-generated content
  - Content Security Policy (CSP) headers
  - Input validation and sanitization
  - Output encoding in responses
```

### Network Security
```yaml
https_requirements:
  development: HTTP allowed (localhost only)
  production: HTTPS mandatory (TLS 1.2+)
  certificate: Valid SSL certificate required
  
cors_configuration:
  development:
    allowed_origins: [http://localhost:3000, http://127.0.0.1:3000]
    allowed_methods: [GET, POST, PUT, DELETE, OPTIONS]
    allowed_headers: [Content-Type, Authorization]
    credentials: true
  production:
    allowed_origins: [https://app.insightflo.com]
    allowed_methods: [GET, POST, PUT, DELETE, OPTIONS]
    allowed_headers: [Content-Type, Authorization]  
    credentials: true

security_headers:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Strict-Transport-Security: max-age=31536000; includeSubDomains
  - Content-Security-Policy: default-src 'self'
```

---

## 📏 Implementation Standards

### Response Format Consistency
```yaml
success_response:
  required_fields: [success]
  success: boolean (always true)
  data: object|array (for content responses)
  message: string (for action confirmations)
  meta: object (for paginated responses)

error_response:
  required_fields: [success, error]
  success: boolean (always false)
  error: ErrorObject

http_status_usage:
  200: Successful GET, PUT operations
  201: Successful POST operations (resource created)
  400: Client error (validation, malformed request)
  401: Authentication required or failed
  403: Authorization failed (valid user, insufficient permissions)
  404: Resource not found
  409: Resource conflict (duplicate data)
  429: Rate limit exceeded
  500: Server error
  503: Service unavailable
```

### API Versioning Strategy
```yaml
versioning_approach: URL path versioning
current_version: v1
version_format: /api/v{major}
backward_compatibility: Maintain previous major versions for 1 year
deprecation_notice: 6 months advance notice for breaking changes

breaking_change_definition:
  - Removing endpoints or parameters
  - Changing response data structure
  - Modifying authentication requirements
  - Changing error codes or HTTP status codes

non_breaking_change_definition:
  - Adding new endpoints
  - Adding optional parameters
  - Adding fields to responses
  - Performance improvements
```

---

## 🔄 Change Management Process

### API Modification Protocol
```yaml
change_request_process:
  1. Standards Guardian approval required for all changes
  2. Interface contract updates precede implementation
  3. Breaking changes require new version number
  4. Non-breaking changes update patch version
  5. All teams notified of changes via standard communication channels

documentation_updates:
  sequence:
    1. Update this interface specification first
    2. Backend implements according to specification
    3. Frontend develops against interface specification
    4. Integration testing validates compliance
    5. Deployment only after specification compliance confirmed

testing_requirements:
  - All endpoints must have automated tests
  - Contract testing between Frontend and Backend
  - Security testing for authentication flows
  - Performance testing for all endpoints
  - Error handling verification for all error codes
```

### Quality Gates
```yaml
pre_deployment_checklist:
  interface_compliance: All endpoints match this specification exactly
  security_validation: All security requirements implemented and tested
  error_handling: All error scenarios properly handled and tested
  documentation_sync: Backend docs updated to reflect interface changes
  integration_testing: Frontend-Backend integration tests passing
  performance_validation: Response times meet SLA requirements (< 500ms)
```

---

## 📈 Monitoring & Observability

### Required Metrics
```yaml
performance_metrics:
  response_time: 95th percentile < 500ms
  throughput: requests per second
  error_rate: < 1% for non-authentication endpoints
  availability: 99.9% uptime

security_metrics:
  failed_authentication_attempts: by IP and user
  rate_limiting_triggers: by endpoint and IP
  suspicious_activity_patterns: automated detection
  token_usage_patterns: for fraud detection

business_metrics:
  api_usage_by_endpoint: for capacity planning
  user_engagement_patterns: for product insights
  search_query_analytics: for feature improvements
  error_frequency_by_type: for quality improvements
```

---

**Document Authority**: Standards Guardian  
**Approval Date**: 2025-01-08  
**Next Review**: 2025-02-08  
**Compliance**: MANDATORY for all Frontend and Backend implementations  

**⚠️ BREAKING CHANGE POLICY**: Any deviation from this specification requires Standards Guardian approval and follows the change management process outlined above.