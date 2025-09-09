import { authService } from '@/lib/services/auth-service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 사용자 로그인 API
 * POST /api/auth/signin
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await authService.signIn({
      email: body.email,
      password: body.password
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: '로그인 성공',
        tokens: result.data.tokens,
        user: result.data.user
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
    console.error('로그인 API 오류:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '로그인 처리 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}