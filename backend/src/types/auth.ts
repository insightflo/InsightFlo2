/**
 * 인증 관련 타입 정의
 */

export interface AuthRequest {
  email: string;
  password: string;
}

export interface SignUpRequest extends AuthRequest {
  nickname: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: UserProfile;
  tokens?: TokenPair;
  error?: AuthError;
}

export interface TokenResponse {
  success: boolean;
  tokens: TokenPair;
  error?: AuthError;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  nickname: string | null;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  type: 'access' | 'refresh';
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string;
}

export interface JWTWithJTI extends JWTPayload {
  jti: string;
}

export interface PasswordValidationResult {
  isValid: boolean;
  error?: string;
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_ALREADY_EXISTS'
  | 'WEAK_PASSWORD'
  | 'INVALID_TOKEN'
  | 'EXPIRED_TOKEN'
  | 'AUTHENTICATION_REQUIRED'
  | 'VALIDATION_FAILED'
  | 'INTERNAL_ERROR';

export type AuthServiceResult<T = any> =
  | { success: true; data: T }
  | { success: false; error: AuthError };