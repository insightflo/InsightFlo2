import { authService } from '@/lib/services/auth-service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 사용자 회원가입 API
 * POST /api/auth/signup
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await authService.signUp({
      email: body.email,
      password: body.password,
      nickname: body.nickname
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: '회원가입이 완료되었습니다.',
        user: result.data.user,
        tokens: result.data.tokens
      }, { status: 201 });
    } else {
      const statusCode = result.error.code === 'EMAIL_ALREADY_EXISTS' ? 409 :
        result.error.code === 'WEAK_PASSWORD' ? 400 : 400;

      return NextResponse.json({
        success: false,
        error: {
          code: result.error.code,
          message: result.error.message
        }
      }, { status: statusCode });
    }

  } catch (error) {
    console.error('회원가입 API 오류:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '회원가입 처리 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}