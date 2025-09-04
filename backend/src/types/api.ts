// Standards Guardian 준수: 표준 API 응답 형식

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

// 표준 에러 코드
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_REQUIRED: 'AUTHENTICATION_REQUIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  ACCESS_DENIED: 'ACCESS_DENIED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

// 사용자 관련 타입
export interface UserResponse {
  id: string;
  email: string;
  nickname: string | null;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname?: string;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

// 뉴스 관련 타입
export interface NewsResponse {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  keywords: string[] | null;
  publishedAt: string;
  sourceUrl: string;
  createdAt: string;
  isBookmarked?: boolean;
  relevanceScore?: number;
}

export interface PersonalizedFeedRequest {
  page?: number;
  limit?: number;
  keywords?: string[];
}

export interface NewsSearchRequest {
  query: string;
  page?: number;
  limit?: number;
  sentiment?: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  dateFrom?: string;
  dateTo?: string;
}