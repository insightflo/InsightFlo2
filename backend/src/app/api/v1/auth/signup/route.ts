import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateTokens } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/response';
import { ErrorCodes } from '@/types/api';
import type { SignupRequest, AuthResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();
    const { email, password, nickname } = body;

    // 입력 검증
    if (!email || !password) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        '이메일과 비밀번호는 필수입니다.',
        { fields: ['email', 'password'] }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        '올바른 이메일 형식이 아닙니다.',
        { field: 'email' }
      );
    }

    // 비밀번호 강도 검증 (Standards Guardian 요구사항)
    if (password.length < 8) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        '비밀번호는 최소 8자 이상이어야 합니다.',
        { field: 'password', minLength: 8 }
      );
    }

    // 이미 존재하는 사용자 확인
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return errorResponse(
        ErrorCodes.RESOURCE_ALREADY_EXISTS,
        '이미 존재하는 이메일입니다.',
        { field: 'email' },
        409
      );
    }

    // 비밀번호 해싱 (bcrypt 12라운드)
    const passwordHash = await hashPassword(password);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        nickname: nickname || null
      }
    });

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

    return successResponse(authResponse, undefined, 201);

  } catch (error) {
    console.error('Signup error:', error);
    
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      '회원가입 처리 중 오류가 발생했습니다.',
      undefined,
      500
    );
  }
}