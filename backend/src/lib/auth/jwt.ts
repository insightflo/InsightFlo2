import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

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