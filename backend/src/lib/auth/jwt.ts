import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

/**
 * 비밀번호 강도 검증
 * - 최소 8자 이상
 * - 영문 대소문자, 숫자, 특수문자 포함
 * - 일반적인 패스워드 패턴 거부
 */
export function validatePasswordStrength(password: string): { isValid: boolean; error?: string } {
  // 길이 검증
  if (password.length < 8) {
    return { isValid: false, error: '비밀번호는 최소 8자 이상이어야 합니다' };
  }

  // 영문 대소문자 포함 검증
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);

  // 숫자 포함 검증
  const hasNumber = /\d/.test(password);

  // 특수문자 포함 검증
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  // 일반적인 패스워드 패턴 검증
  const commonPatterns = [
    /^password/i,
    /^qwerty/i,
    /^123456/i,
    /^admin/i,
    /^user/i,
    /^test/i
  ];

  const hasCommonPattern = commonPatterns.some(pattern => pattern.test(password));

  if (!hasLowerCase || !hasUpperCase) {
    return { isValid: false, error: '비밀번호에는 영문 대소문자가 모두 포함되어야 합니다' };
  }

  if (!hasNumber) {
    return { isValid: false, error: '비밀번호에는 숫자가 포함되어야 합니다' };
  }

  if (!hasSpecialChar) {
    return { isValid: false, error: '비밀번호에는 특수문자가 포함되어야 합니다' };
  }

  if (hasCommonPattern) {
    return { isValid: false, error: '일반적인 패스워드 패턴은 사용할 수 없습니다' };
  }

  return { isValid: true };
}

export interface JWTPayload {
  userId: string;
  email: string;
  type: 'access' | 'refresh';
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * JWT 토큰 생성
 */
export function generateTokens(userId: string, email: string): TokenPair {
  const accessToken = jwt.sign(
    { userId, email, type: 'access' } as JWTPayload,
    JWT_SECRET,
    {
      expiresIn: '1h',
      issuer: 'insightflo-api',
      audience: 'insightflo-app'
    }
  );

  const refreshToken = jwt.sign(
    { userId, email, type: 'refresh', jti: uuidv4() } as JWTPayload & { jti: string },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '30d',
      issuer: 'insightflo-api',
      audience: 'insightflo-app'
    }
  );

  return { accessToken, refreshToken };
}

/**
 * Access Token 검증
 */
export function verifyAccessToken(token: string): JWTPayload {
  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      issuer: 'insightflo-api',
      audience: 'insightflo-app'
    }) as JWTPayload;

    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }

    return payload;
  } catch (error) {
    throw new Error('Invalid access token');
  }
}

/**
 * Refresh Token 검증
 */
export function verifyRefreshToken(token: string): JWTPayload & { jti: string } {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: 'insightflo-api',
      audience: 'insightflo-app'
    }) as JWTPayload & { jti: string };

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    return payload;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}

/**
 * 비밀번호 해싱
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12; // Standards Guardian 요구사항: bcrypt 12라운드
  return bcrypt.hash(password, saltRounds);
}

/**
 * 비밀번호 검증
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * JWT 토큰에서 Bearer 제거
 */
export function extractTokenFromHeader(authHeader: string): string {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Invalid authorization header');
  }

  return authHeader.substring(7); // "Bearer " 제거
}