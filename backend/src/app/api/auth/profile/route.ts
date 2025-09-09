import { extractTokenFromHeader, verifyAccessToken } from '@/lib/auth/jwt';
import { authService } from '@/lib/services/auth-service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 사용자 프로필 조회 API
 * GET /api/auth/profile
 */
export async function GET(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'AUTHENTICATION_REQUIRED',
          message: '인증이 필요합니다.'
        }
      }, { status: 401 });
    }

    // 토큰 추출 및 검증
    const token = extractTokenFromHeader(authHeader);
    const payload = verifyAccessToken(token);

    // 사용자 프로필 조회
    const result = await authService.getProfile(payload.userId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        user: result.data
      });
    } else {
      return NextResponse.json({
        success: false,
        error: {
          code: result.error.code,
          message: result.error.message
        }
      }, { status: 404 });
    }

  } catch (error) {
    console.error('프로필 조회 API 오류:', error);

    // JWT 검증 오류인 경우
    if (error instanceof Error && (error.message.includes('Invalid access token') || error.message.includes('Invalid authorization header'))) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: '유효하지 않은 토큰입니다.'
        }
      }, { status: 401 });
    }

    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '프로필 조회 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}