```yaml
# .claude/contracts/interfaces/api-spec.md
# Backend API Specification
# This document is the source of truth for all API endpoints

version: 1.0.0
base_url: /api
authentication: Bearer JWT

endpoints:
  auth:
    login:
      method: POST
      path: /auth/login
      public: true
      request:
        body:
          email: string
          password: string
      response:
        200:
          body:
            success: true
            data:
              token: string
              refreshToken: string
              user: UserObject
        401:
          body:
            success: false
            error: "Invalid credentials"
    
    refresh:
      method: POST
      path: /auth/refresh
      public: true
      request:
        body:
          refreshToken: string
      response:
        200:
          body:
            success: true
            data:
              token: string
              refreshToken: string

  users:
    list:
      method: GET
      path: /users
      authentication: required
      permissions: [admin]
      query:
        page: number (optional, default: 1)
        limit: number (optional, default: 20)
        search: string (optional)
      response:
        200:
          body:
            success: true
            data: UserObject[]
            pagination:
              total: number
              page: number
              totalPages: number

types:
  UserObject:
    id: string
    email: string
    profile:
      name: string
      avatar: string?
      bio: string?
    createdAt: datetime
    updatedAt: datetime
```