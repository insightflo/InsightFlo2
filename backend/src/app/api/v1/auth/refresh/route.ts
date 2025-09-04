import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyRefreshToken, generateTokens } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/response';
import { ErrorCodes } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Refresh token이 필요합니다.',
        { field: 'refreshToken' },
        400
      );
    }

    // Refresh Token 검증
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      return errorResponse(
        ErrorCodes.AUTHENTICATION_REQUIRED,
        '유효하지 않은 refresh token입니다.',
        undefined,
        401
      );
    }

    // 사용자 존재 확인
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });

    if (!user) {
      return errorResponse(
        ErrorCodes.AUTHENTICATION_REQUIRED,
        '사용자를 찾을 수 없습니다.',
        undefined,
        401
      );
    }

    // 새로운 토큰 쌍 생성 (Token Rotation)
    const tokens = generateTokens(user.id, user.email);

    const tokenResponse = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken // 새로운 refresh token 발급
    };

    return successResponse(tokenResponse);

  } catch (error) {
    console.error('Token refresh error:', error);
    
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      '토큰 갱신 중 오류가 발생했습니다.',
      undefined,
      500
    );
  }
}