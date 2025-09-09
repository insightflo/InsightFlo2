import { PrismaClient } from '@prisma/client';
import {
  AuthError,
  AuthRequest,
  AuthServiceResult,
  RefreshTokenRequest,
  SignUpRequest,
  TokenPair,
  UserProfile
} from '../../types/auth';
import { generateTokens, hashPassword, validatePasswordStrength, verifyPassword, verifyRefreshToken } from '../auth/jwt';
import prisma from '../db';
import { userLoginSchema, userRegistrationSchema, validateApiRequest } from '../utils/validators';

export class AuthService {
  constructor(private db: PrismaClient = prisma) { }

  /**
   * 사용자 회원가입
   */
  async signUp(request: SignUpRequest): Promise<AuthServiceResult<{ user: UserProfile; tokens: TokenPair }>> {
    try {
      // 입력 검증
      const validation = validateApiRequest(request, userRegistrationSchema);
      if (!validation.success) {
        return {
          success: false,
          error: {
            code: 'VALIDATION_FAILED',
            message: validation.error
          } as AuthError
        };
      }

      // 추가 비밀번호 강도 검증
      const passwordStrength = validatePasswordStrength(request.password);
      if (!passwordStrength.isValid) {
        return {
          success: false,
          error: {
            code: 'WEAK_PASSWORD' as const,
            message: passwordStrength.error!
          }
        };
      }

      // 이메일 중복 확인
      const existingUser = await this.db.user.findUnique({
        where: { email: request.email },
        select: { id: true }
      });

      if (existingUser) {
        return {
          success: false,
          error: {
            code: 'EMAIL_ALREADY_EXISTS' as const,
            message: '이미 등록된 이메일입니다.'
          }
        };
      }

      // 비밀번호 해싱
      const passwordHash = await hashPassword(request.password);

      // 사용자 생성
      const newUser = await this.db.user.create({
        data: {
          email: request.email,
          passwordHash,
          nickname: request.nickname
        },
        select: {
          id: true,
          email: true,
          nickname: true,
          profileImageUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });

      // JWT 토큰 생성
      const tokens = generateTokens(newUser.id, newUser.email);

      // 사용자 프로필 포맷팅
      const userProfile: UserProfile = {
        ...newUser,
        createdAt: newUser.createdAt.toISOString(),
        updatedAt: newUser.updatedAt.toISOString()
      };

      return {
        success: true,
        data: {
          user: userProfile,
          tokens
        }
      };

    } catch (error) {
      console.error('회원가입 오류:', error);
      return {
        success: false,
        error: {
          code: 'INTERNAL_ERROR' as const,
          message: '회원가입 처리 중 오류가 발생했습니다.'
        }
      };
    }
  }

  /**
   * 사용자 로그인
   */
  async signIn(request: AuthRequest): Promise<AuthServiceResult<{ user: UserProfile; tokens: TokenPair }>> {
    try {
      // 입력 검증
      const validation = validateApiRequest(request, userLoginSchema);
      if (!validation.success) {
        return {
          success: false,
          error: {
            code: 'VALIDATION_FAILED',
            message: validation.error
          } as AuthError
        };
      }

      // 사용자 조회
      const user = await this.db.user.findUnique({
        where: { email: request.email },
        select: {
          id: true,
          email: true,
          passwordHash: true,
          nickname: true,
          profileImageUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        return {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS' as const,
            message: '이메일 또는 패스워드가 올바르지 않습니다.'
          }
        };
      }

      // 비밀번호 검증
      const isPasswordValid = await verifyPassword(request.password, user.passwordHash);
      if (!isPasswordValid) {
        return {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS' as const,
            message: '이메일 또는 패스워드가 올바르지 않습니다.'
          }
        };
      }

      // JWT 토큰 생성
      const { passwordHash, ...userWithoutPassword } = user;
      const tokens = generateTokens(user.id, user.email);

      // 사용자 프로필 포맷팅
      const userProfile: UserProfile = {
        ...userWithoutPassword,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      };

      return {
        success: true,
        data: {
          user: userProfile,
          tokens
        }
      };

    } catch (error) {
      console.error('로그인 오류:', error);
      return {
        success: false,
        error: {
          code: 'INTERNAL_ERROR' as const,
          message: '로그인 처리 중 오류가 발생했습니다.'
        }
      };
    }
  }

  /**
   * 토큰 갱신
   */
  async refreshToken(request: RefreshTokenRequest): Promise<AuthServiceResult<TokenPair>> {
    try {
      // Refresh Token 검증
      const payload = verifyRefreshToken(request.refreshToken);

      // 사용자 존재 확인
      const user = await this.db.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true }
      });

      if (!user) {
        return {
          success: false,
          error: {
            code: 'INVALID_TOKEN' as const,
            message: '유효하지 않은 토큰입니다.'
          }
        };
      }

      // 새로운 토큰 생성
      const tokens = generateTokens(user.id, user.email);

      return {
        success: true,
        data: tokens
      };

    } catch (error) {
      console.error('토큰 갱신 오류:', error);
      return {
        success: false,
        error: {
          code: 'INVALID_TOKEN' as const,
          message: '유효하지 않은 토큰입니다.'
        }
      };
    }
  }

  /**
   * 사용자 프로필 조회
   */
  async getProfile(userId: string): Promise<AuthServiceResult<UserProfile>> {
    try {
      const user = await this.db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          nickname: true,
          profileImageUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        return {
          success: false,
          error: {
            code: 'INVALID_TOKEN' as const,
            message: '사용자를 찾을 수 없습니다.'
          }
        };
      }

      // 사용자 프로필 포맷팅
      const userProfile: UserProfile = {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      };

      return {
        success: true,
        data: userProfile
      };

    } catch (error) {
      console.error('프로필 조회 오류:', error);
      return {
        success: false,
        error: {
          code: 'INTERNAL_ERROR' as const,
          message: '프로필 조회 중 오류가 발생했습니다.'
        }
      };
    }
  }
}

// 싱글톤 인스턴스
export const authService = new AuthService();