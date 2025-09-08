# 🛡️ InsightFlo 보안 가이드라인

**버전**: 1.0  
**최종 업데이트**: 2025-01-21  
**표준 수립자**: Standards Guardian  
**적용 범위**: 전체 개발 팀

---

## 📋 목차

1. [인증 및 권한 관리](#인증-및-권한-관리)
2. [데이터 보호](#데이터-보호)
3. [API 보안](#api-보안)
4. [클라이언트 보안](#클라이언트-보안)
5. [인프라 보안](#인프라-보안)
6. [보안 테스트](#보안-테스트)

---

## 🔐 인증 및 권한 관리

### 1. JWT 토큰 표준

#### 토큰 구조
```typescript
interface JWTPayload {
  sub: string;        // 사용자 ID (UUID)
  email: string;      // 사용자 이메일
  iat: number;        // 발행 시각 (Unix timestamp)
  exp: number;        // 만료 시각 (Unix timestamp)
  type: 'access' | 'refresh';
  jti: string;        // JWT ID (토큰 추적용)
}

// Access Token 설정
{
  "algorithm": "HS256",
  "expiresIn": "1h",        // ✅ 1시간 (보안 강화)
  "issuer": "insightflo",
  "audience": "insightflo-app"
}

// Refresh Token 설정
{
  "algorithm": "HS256", 
  "expiresIn": "30d",       // 30일
  "rotation": true,         // ✅ 토큰 회전 활성화
  "reuseDetection": true    // ✅ 재사용 탐지 활성화
}
```

#### JWT 시크릿 키 관리
```typescript
// ✅ 보안 기준 준수
const JWT_SECRET = process.env.JWT_SECRET; // 최소 32자 랜덤 문자열

// 시크릿 키 검증
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long');
}

// 환경별 다른 키 사용
const secrets = {
  development: process.env.JWT_SECRET_DEV,
  production: process.env.JWT_SECRET_PROD,
  test: process.env.JWT_SECRET_TEST
};

// 🚫 금지된 패턴
const JWT_SECRET = "simple-secret";        // ❌ 너무 단순
const JWT_SECRET = "insightflo-secret";    // ❌ 추측 가능
const JWT_SECRET = "12345678";             // ❌ 짧고 예측 가능
```

#### 토큰 생성 및 검증
```typescript
// lib/auth/jwt.ts
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

export function generateAccessToken(userId: string, email: string): string {
  return jwt.sign(
    {
      sub: userId,
      email,
      type: 'access',
      jti: randomUUID(),
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1h',
      issuer: 'insightflo',
      audience: 'insightflo-app',
    }
  );
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign(
    {
      sub: userId,
      type: 'refresh',
      jti: randomUUID(),
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '30d',
      issuer: 'insightflo',
      audience: 'insightflo-app',
    }
  );
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!, {
      issuer: 'insightflo',
      audience: 'insightflo-app',
    }) as JWTPayload;
    
    // 토큰 블랙리스트 확인
    if (await isTokenBlacklisted(payload.jti)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
```

### 2. 패스워드 보안

#### 해싱 표준
```typescript
import bcrypt from 'bcryptjs';

// ✅ 보안 기준
const SALT_ROUNDS = 12;  // 최소 12라운드

export async function hashPassword(password: string): Promise<string> {
  // 패스워드 복잡도 검사
  if (!isValidPassword(password)) {
    throw new Error('Password does not meet complexity requirements');
  }
  
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// 패스워드 복잡도 규칙
function isValidPassword(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
}
```

### 3. 세션 관리

#### Refresh Token 관리
```typescript
// 데이터베이스 스키마
refresh_tokens (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token_hash TEXT NOT NULL,    // 토큰 해시값 저장
  jti VARCHAR(36) UNIQUE,      // JWT ID
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  revoked_at TIMESTAMP NULL    // 토큰 무효화 시각
);

// 토큰 저장
export async function storeRefreshToken(
  userId: string,
  token: string,
  jti: string
): Promise<void> {
  const tokenHash = await bcrypt.hash(token, 10);
  
  await db.refreshToken.create({
    data: {
      userId,
      tokenHash,
      jti,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일
    }
  });
}

// 토큰 회전
export async function rotateRefreshToken(
  oldToken: string
): Promise<{ accessToken: string; refreshToken: string } | null> {
  const payload = await verifyToken(oldToken);
  if (!payload || payload.type !== 'refresh') {
    return null;
  }
  
  // 기존 토큰 무효화
  await revokeRefreshToken(payload.jti);
  
  // 새 토큰 발급
  const user = await getUserById(payload.sub);
  const newAccessToken = generateAccessToken(user.id, user.email);
  const newRefreshToken = generateRefreshToken(user.id);
  
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}
```

---

## 🔒 데이터 보호

### 1. 민감 데이터 암호화

#### AES-256 암호화
```typescript
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16;  // 128 bits

export class DataEncryption {
  private static getKey(): Buffer {
    const key = process.env.ENCRYPTION_KEY;
    if (!key || key.length < 32) {
      throw new Error('ENCRYPTION_KEY must be at least 32 characters');
    }
    return crypto.scryptSync(key, 'salt', KEY_LENGTH);
  }

  static encrypt(text: string): string {
    const key = this.getKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipher(ALGORITHM, key);
    cipher.setAAD(Buffer.from('InsightFlo'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
  }

  static decrypt(encryptedData: string): string {
    const key = this.getKey();
    const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = crypto.createDecipher(ALGORITHM, key);
    decipher.setAuthTag(authTag);
    decipher.setAAD(Buffer.from('InsightFlo'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

#### 개인정보 처리
```typescript
// 민감 데이터 필드 표시
interface UserEntity {
  id: string;
  email: string;        // 🔒 PII
  name?: string;        // 🔒 PII  
  phone?: string;       // 🔒 PII - 암호화 필요
  createdAt: Date;
  updatedAt: Date;
}

// 데이터 마스킹
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  const maskedLocal = local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);
  return maskedLocal + '@' + domain;
}

export function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
}

// 로그에서 민감 데이터 제거
export function sanitizeForLogging(data: any): any {
  const sensitiveFields = ['password', 'token', 'email', 'phone', 'name'];
  const sanitized = { ...data };
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });
  
  return sanitized;
}
```

### 2. 데이터베이스 보안

#### 연결 보안
```typescript
// Prisma 클라이언트 설정
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?sslmode=require&connection_limit=20'
    }
  },
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
  ]
});

// SQL Injection 방지
export async function getUserByEmail(email: string): Promise<User | null> {
  // ✅ Parameterized query 사용
  return await prisma.user.findUnique({
    where: { email }  // Prisma가 자동으로 이스케이프
  });
  
  // 🚫 Raw query는 피하고, 사용 시 반드시 파라미터화
  // const result = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;
}
```

#### 데이터 접근 제어
```sql
-- 데이터베이스 사용자 권한 분리
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT SELECT, INSERT, UPDATE ON users, news, user_keywords TO app_user;
GRANT DELETE ON user_keywords TO app_user;

-- 관리자 계정 분리
CREATE USER admin_user WITH PASSWORD 'admin_secure_password';
GRANT ALL PRIVILEGES ON ALL TABLES TO admin_user;

-- 읽기 전용 계정
CREATE USER readonly_user WITH PASSWORD 'readonly_password';
GRANT SELECT ON ALL TABLES TO readonly_user;
```

---

## 🌐 API 보안

### 1. HTTPS 강제

#### Next.js 보안 헤더
```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

#### CORS 설정
```typescript
// app/middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // CORS 헤더 설정
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://insightflo.com',
    'https://app.insightflo.com',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
  ].filter(Boolean);
  
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  
  return response;
}
```

### 2. Rate Limiting

#### API 요청 제한
```typescript
// lib/rate-limit.ts
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

interface RateLimitConfig {
  windowMs: number;    // 시간 창 (밀리초)
  maxRequests: number; // 최대 요청 수
  keyGenerator: (req: Request) => string;
}

export class RateLimiter {
  constructor(private config: RateLimitConfig) {}
  
  async check(request: Request): Promise<{ allowed: boolean; remaining: number }> {
    const key = this.config.keyGenerator(request);
    const window = Math.floor(Date.now() / this.config.windowMs);
    const redisKey = `rate_limit:${key}:${window}`;
    
    const current = await redis.incr(redisKey);
    if (current === 1) {
      await redis.expire(redisKey, Math.ceil(this.config.windowMs / 1000));
    }
    
    return {
      allowed: current <= this.config.maxRequests,
      remaining: Math.max(0, this.config.maxRequests - current)
    };
  }
}

// 사용 예시
const authRateLimit = new RateLimiter({
  windowMs: 15 * 60 * 1000,  // 15분
  maxRequests: 5,            // 로그인 시도 5회 제한
  keyGenerator: (req) => getClientIP(req)
});

const apiRateLimit = new RateLimiter({
  windowMs: 60 * 1000,      // 1분
  maxRequests: 100,         // 일반 API 100회 제한
  keyGenerator: (req) => getUserId(req) || getClientIP(req)
});
```

#### Rate Limiting 미들웨어
```typescript
// app/api/v1/auth/login/route.ts
export async function POST(request: Request) {
  // Rate limiting 검사
  const rateCheck = await authRateLimit.check(request);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: '너무 많은 로그인 시도입니다. 잠시 후 다시 시도해주세요.',
          retryAfter: 900 // 15분 후 재시도
        },
        timestamp: new Date().toISOString(),
        version: 'v1'
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': rateCheck.remaining.toString(),
          'Retry-After': '900'
        }
      }
    );
  }
  
  // 로그인 로직 계속
}
```

### 3. 입력 검증

#### Zod를 사용한 입력 검증
```typescript
import { z } from 'zod';

// 사용자 등록 스키마
export const registerSchema = z.object({
  email: z
    .string()
    .email('올바른 이메일 형식이 아닙니다.')
    .max(255, '이메일은 255자를 초과할 수 없습니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(128, '비밀번호는 128자를 초과할 수 없습니다.')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           '비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다.'),
  name: z
    .string()
    .min(1, '이름은 필수입니다.')
    .max(50, '이름은 50자를 초과할 수 없습니다.')
    .regex(/^[가-힣a-zA-Z\s]+$/, '이름은 한글, 영문, 공백만 허용됩니다.')
});

// 뉴스 검색 스키마
export const newsSearchSchema = z.object({
  query: z
    .string()
    .min(1, '검색어는 필수입니다.')
    .max(100, '검색어는 100자를 초과할 수 없습니다.')
    .regex(/^[가-힣a-zA-Z0-9\s]+$/, '검색어에 특수문자는 사용할 수 없습니다.'),
  page: z
    .number()
    .int()
    .min(1, '페이지는 1 이상이어야 합니다.')
    .max(100, '페이지는 100을 초과할 수 없습니다.')
    .default(1),
  limit: z
    .number()
    .int()
    .min(1, 'limit은 1 이상이어야 합니다.')
    .max(50, 'limit은 50을 초과할 수 없습니다.')
    .default(20)
});

// 검증 미들웨어
export function validateRequest<T>(schema: z.ZodSchema<T>) {
  return async (request: Request): Promise<T | Response> => {
    try {
      const body = await request.json();
      return schema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: '입력값이 올바르지 않습니다.',
              details: error.errors
            },
            timestamp: new Date().toISOString(),
            version: 'v1'
          },
          { status: 400 }
        );
      }
      throw error;
    }
  };
}
```

---

## 📱 클라이언트 보안

### 1. Flutter 앱 보안

#### 토큰 보안 저장
```dart
// lib/core/secure_storage.dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
      sharedPreferencesName: 'insightflo_secure_prefs',
      preferencesKeyPrefix: 'insightflo_',
    ),
    iOptions: IOSOptions(
      groupId: 'group.com.insightflo.app',
      accountName: 'InsightFlo',
      accessibility: IOSAccessibility.first_unlock_this_device,
    ),
  );

  static Future<void> storeAccessToken(String token) async {
    await _storage.write(key: 'access_token', value: token);
  }

  static Future<void> storeRefreshToken(String token) async {
    await _storage.write(key: 'refresh_token', value: token);
  }

  static Future<String?> getAccessToken() async {
    return await _storage.read(key: 'access_token');
  }

  static Future<String?> getRefreshToken() async {
    return await _storage.read(key: 'refresh_token');
  }

  static Future<void> clearTokens() async {
    await _storage.delete(key: 'access_token');
    await _storage.delete(key: 'refresh_token');
  }
}
```

#### 네트워크 보안
```dart
// lib/core/network/dio_client.dart
import 'package:dio/dio.dart';
import 'package:dio_certificate_pinning/dio_certificate_pinning.dart';

class DioClient {
  late final Dio _dio;

  DioClient() {
    _dio = Dio();
    
    // Certificate Pinning
    _dio.interceptors.add(
      CertificatePinningInterceptor(
        allowedSHAFingerprints: [
          'SHA_FINGERPRINT_OF_YOUR_SERVER_CERTIFICATE'
        ],
      ),
    );
    
    // 인증 인터셉터
    _dio.interceptors.add(AuthInterceptor());
    
    // 로깅 인터셉터 (프로덕션에서는 민감정보 제외)
    if (kDebugMode) {
      _dio.interceptors.add(LogInterceptor(
        requestBody: false,  // 요청 본문 로그 제외
        responseBody: false, // 응답 본문 로그 제외
      ));
    }
  }
}

class AuthInterceptor extends Interceptor {
  @override
  Future<void> onRequest(
    RequestOptions options, 
    RequestInterceptorHandler handler
  ) async {
    final token = await SecureStorage.getAccessToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  @override
  Future<void> onError(
    DioException err, 
    ErrorInterceptorHandler handler
  ) async {
    if (err.response?.statusCode == 401) {
      // 토큰 갱신 시도
      final refreshed = await _refreshToken();
      if (refreshed) {
        // 원래 요청 재시도
        final newToken = await SecureStorage.getAccessToken();
        err.requestOptions.headers['Authorization'] = 'Bearer $newToken';
        final response = await _dio.fetch(err.requestOptions);
        handler.resolve(response);
        return;
      }
      
      // 토큰 갱신 실패 시 로그아웃
      await _logout();
    }
    handler.next(err);
  }
}
```

#### 루팅/탈옥 탐지
```dart
// lib/core/security/root_detection.dart
import 'package:flutter_jailbreak_detection/flutter_jailbreak_detection.dart';
import 'package:device_info_plus/device_info_plus.dart';

class SecurityChecker {
  static Future<bool> isDeviceSecure() async {
    try {
      // 루팅/탈옥 탐지
      final isJailbroken = await FlutterJailbreakDetection.jailbroken;
      if (isJailbroken) {
        return false;
      }

      // 개발자 모드 탐지 (Android)
      final deviceInfo = DeviceInfoPlugin();
      if (Platform.isAndroid) {
        final androidInfo = await deviceInfo.androidInfo;
        if (androidInfo.isPhysicalDevice == false) {
          return false; // 에뮬레이터
        }
      }

      return true;
    } catch (e) {
      // 탐지 실패 시 안전하게 통과
      return true;
    }
  }

  static Future<void> handleInsecureDevice() async {
    await showDialog(
      context: navigatorKey.currentContext!,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text('보안 경고'),
        content: Text('보안상의 이유로 이 기기에서는 앱을 사용할 수 없습니다.'),
        actions: [
          TextButton(
            onPressed: () => SystemNavigator.pop(),
            child: Text('확인'),
          ),
        ],
      ),
    );
  }
}
```

---

## 🏗️ 인프라 보안

### 1. Docker 보안

#### 보안 강화된 Dockerfile
```dockerfile
# Backend Dockerfile
FROM node:20-alpine AS builder

# 보안: non-root 사용자 생성
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# 종속성 설치
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 앱 빌드
COPY . .
RUN npm run build

# 프로덕션 이미지
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 보안: non-root 사용자로 실행
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 필요한 파일만 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["node", "server.js"]
```

#### Docker Compose 보안
```yaml
# infrastructure/docker/docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: insightflo_db
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "127.0.0.1:5432:5432"  # localhost에만 바인딩
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - insightflo_network
    restart: unless-stopped
    # 보안 설정
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - DAC_OVERRIDE
      - FOWNER
      - FSETID
      - KILL
      - SETGID
      - SETUID

  backend:
    build:
      context: ../../backend
      dockerfile: ../infrastructure/docker/backend.Dockerfile
    container_name: insightflo_backend
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
      ENCRYPTION_KEY: ${ENCRYPTION_KEY}
    ports:
      - "127.0.0.1:3000:3000"  # localhost에만 바인딩
    depends_on:
      - postgres
    networks:
      - insightflo_network
    restart: unless-stopped
    # 보안 설정
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    read_only: true
    tmpfs:
      - /tmp
      - /var/cache
```

### 2. 환경 변수 보안

#### Secrets 관리
```bash
# .env.example - 보안 강화된 템플릿
# Database
DB_USER=insightflo
DB_PASSWORD=CHANGE_ME_COMPLEX_PASSWORD_MIN_16_CHARS
DB_NAME=insightflo_prod
DATABASE_URL=postgresql://user:password@localhost:5432/database

# JWT
JWT_SECRET=CHANGE_ME_RANDOM_32_CHAR_SECRET_KEY
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=30d

# Encryption
ENCRYPTION_KEY=CHANGE_ME_AES_256_ENCRYPTION_KEY_32_CHARS

# API Keys (외부 서비스)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info

# Rate Limiting
REDIS_URL=redis://localhost:6379
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_ATTEMPTS=5
```

---

## 🧪 보안 테스트

### 1. 자동화된 보안 스캔

#### GitHub Actions 보안 워크플로우
```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      # Dependency vulnerability scan
      - name: Run npm audit
        run: |
          cd backend
          npm audit --audit-level moderate
          
      - name: Run Flutter security scan
        run: |
          cd frontend
          flutter pub deps
          dart pub global activate pana
          pana --no-warning
          
      # SAST (Static Application Security Testing)
      - name: CodeQL Analysis
        uses: github/codeql-action/init@v2
        with:
          languages: javascript, dart
          
      - name: Autobuild
        uses: github/codeql-action/autobuild@v2
        
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
        
      # Secrets scan
      - name: GitLeaks Scan
        uses: zricethezav/gitleaks-action@master
        
      # Docker security scan
      - name: Docker security scan
        uses: aquasec/trivy-action@master
        with:
          image-ref: 'insightflo-backend:latest'
          format: 'sarif'
          output: 'trivy-results.sarif'
```

### 2. 침투 테스트 체크리스트

```markdown
## API 보안 테스트

### 인증 테스트
- [ ] 유효하지 않은 JWT 토큰으로 접근 시도
- [ ] 만료된 JWT 토큰으로 접근 시도
- [ ] JWT 토큰 없이 보호된 엔드포인트 접근
- [ ] 다른 사용자의 JWT 토큰으로 접근 시도
- [ ] JWT 시크릿 키 추측 시도

### 입력 검증 테스트
- [ ] SQL Injection 공격 시도
- [ ] XSS (Cross-Site Scripting) 공격 시도
- [ ] Command Injection 공격 시도
- [ ] Path Traversal 공격 시도
- [ ] 과도하게 큰 페이로드 전송

### Rate Limiting 테스트
- [ ] 로그인 API 무차별 공격
- [ ] API 요청 한도 초과 테스트
- [ ] DDoS 공격 시뮬레이션

### 데이터 보호 테스트
- [ ] 민감 정보 로그 노출 확인
- [ ] 에러 메시지에서 시스템 정보 노출 확인
- [ ] HTTPS 강제 적용 확인
- [ ] 보안 헤더 설정 확인
```

### 3. 보안 모니터링

#### 로그 기반 보안 모니터링
```typescript
// lib/security/monitoring.ts
import { createLogger, transports, format } from 'winston';

export const securityLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: 'insightflo-security' },
  transports: [
    new transports.File({ filename: 'logs/security.log' }),
    new transports.Console()
  ]
});

export function logSecurityEvent(
  type: 'AUTH_FAILURE' | 'RATE_LIMIT_EXCEEDED' | 'SUSPICIOUS_ACTIVITY',
  details: any,
  request: Request
) {
  securityLogger.warn('Security Event', {
    type,
    details: sanitizeForLogging(details),
    ip: getClientIP(request),
    userAgent: request.headers.get('user-agent'),
    timestamp: new Date().toISOString()
  });
}

// 사용 예시
export async function POST(request: Request) {
  try {
    // 로그인 로직
  } catch (error) {
    logSecurityEvent('AUTH_FAILURE', {
      email: request.body?.email,
      error: error.message
    }, request);
    
    return createErrorResponse('AUTHENTICATION_FAILED', '로그인에 실패했습니다.');
  }
}
```

---

## 🚨 Standards Guardian 보안 강제 규칙

### ✅ 필수 준수 사항

1. **JWT 토큰 만료 시간 1시간 이하**
2. **비밀번호 bcrypt 해싱 (12라운드 이상)**
3. **HTTPS 강제 적용**
4. **입력값 검증 100% 적용**
5. **Rate Limiting 모든 API 적용**

### 🚫 즉시 거부 대상

1. 평문 비밀번호 저장
2. JWT 시크릿 키 하드코딩
3. HTTP 통신 허용
4. SQL 쿼리 직접 작성 (Parameterized Query 미사용)
5. 민감 정보 로그 출력

### 📊 보안 검사 자동화

```yaml
Pull Request 보안 체크:
  - 의존성 취약점 스캔 통과
  - SAST 도구 검사 통과
  - Secrets 스캔 통과
  - Docker 이미지 보안 스캔 통과
  - Standards Guardian 보안 승인
```

### ⚠️ 보안 인시던트 대응

```yaml
심각도별 대응:
  Critical: 즉시 패치, 서비스 일시 중단 고려
  High: 24시간 내 패치
  Medium: 1주일 내 패치
  Low: 다음 정기 업데이트에 포함

에스컬레이션:
  - Standards Guardian → PM → CTO
  - 모든 보안 인시던트는 문서화 필수
```

---

**Standards Guardian**: 🛡️ 보안 표준 수호  
**Authority**: ⚠️ 거부권 보유 - 보안 기준 미달 시 배포 차단  
**Contact**: Standards Guardian 응답 파일로 긴급 문의