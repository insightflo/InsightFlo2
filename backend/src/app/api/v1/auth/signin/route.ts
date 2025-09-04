import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, generateTokens } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/response';
import { ErrorCodes } from '@/types/api';
import type { LoginRequest, AuthResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // 입력 검증
    if (!email || !password) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        '이메일과 비밀번호는 필수입니다.',
        { fields: ['email', 'password'] }
      );
    }

    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return errorResponse(
        ErrorCodes.INVALID_CREDENTIALS,
        '이메일 또는 비밀번호가 올바르지 않습니다.',
        undefined,
        401
      );
    }

    // 비밀번호 검증
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return errorResponse(
        ErrorCodes.INVALID_CREDENTIALS,
        '이메일 또는 비밀번호가 올바르지 않습니다.',
        undefined,
        401
      );
    }

    // JWT 토큰 생성
    const tokens = generateTokens(user.id, user.email);

    // 응답 데이터 구성
    const authResponse: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        profileImageUrl: user.profileImageUrl,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };

    return successResponse(authResponse);

  } catch (error) {
    console.error('Signin error:', error);
    
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      '로그인 처리 중 오류가 발생했습니다.',
      undefined,
      500
    );
  }
}