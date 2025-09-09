import { authService } from '@/lib/services/auth-service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 토큰 갱신 API
 * POST /api/auth/refresh
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: '리프레시 토큰이 제공되지 않았습니다.'
        }
      }, { status: 400 });
    }

    const result = await authService.refreshToken({ refreshToken });

    if (result.success) {
      return NextResponse.json({
        success: true,
        tokens: result.data
      });
    } else {
      return NextResponse.json({
        success: false,
        error: {
          code: result.error.code,
          message: result.error.message
        }
      }, { status: 401 });
    }

  } catch (error) {
    console.error('토큰 갱신 API 오류:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '토큰 갱신 처리 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}