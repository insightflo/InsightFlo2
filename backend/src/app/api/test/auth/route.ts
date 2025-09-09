import { authService } from '@/lib/services/auth-service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 인증 시스템 통합 테스트 엔드포인트
 * POST /api/test/auth
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType } = body;

    const testResults = [];

    // 회원가입 테스트
    if (testType === 'full' || testType === 'signup') {
      const signupTest = await testSignup();
      testResults.push(signupTest);
    }

    // 로그인 테스트
    if (testType === 'full' || testType === 'signin') {
      const signinTest = await testSignin();
      testResults.push(signinTest);
    }

    // 토큰 테스트
    if (testType === 'full' || testType === 'token') {
      const tokenTest = await testTokens();
      testResults.push(tokenTest);
    }

    // 프로필 조회 테스트
    if (testType === 'full' || testType === 'profile') {
      const profileTest = await testProfile();
      testResults.push(profileTest);
    }

    const passed = testResults.filter(r => r.success).length;
    const failed = testResults.length - passed;

    return NextResponse.json({
      success: failed === 0,
      summary: {
        total: testResults.length,
        passed,
        failed
      },
      results: testResults,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('인증 테스트 오류:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'TEST_ERROR',
        message: '테스트 실행 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}

async function testSignup() {
  try {
    const testData = {
      email: `test-${Date.now()}@insightflo.dev`,
      password: 'SecurePass123!',
      nickname: '테스트유저'
    };

    const result = await authService.signUp(testData);

    if (result.success) {
      const { data } = result;
      if (data.tokens.accessToken && data.tokens.refreshToken) {
        return {
          test: 'signup',
          success: true,
          message: '회원가입 테스트 성공',
          data: {
            userId: data.user.id,
            hasTokens: true
          }
        };
      } else {
        return {
          test: 'signup',
          success: false,
          message: '회원가입 테스트 실패 - 토큰 누락',
          error: 'MISSING_TOKENS'
        };
      }
    } else {
      return {
        test: 'signup',
        success: false,
        message: '회원가입 테스트 실패',
        error: result.error
      };
    }

  } catch (error) {
    return {
      test: 'signup',
      success: false,
      message: '회원가입 테스트 오류',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

async function testSignin() {
  try {
    const testData = {
      email: 'existing-user@insightflo.dev',
      password: 'TestPass123!'
    };

    const result = await authService.signIn(testData);

    if (result.success) {
      const hasTokens = !!(result.data.tokens.accessToken && result.data.tokens.refreshToken);
      if (hasTokens) {
        return {
          test: 'signin',
          success: true,
          message: '로그인 테스트 성공',
          data: {
            userId: result.data.user.id,
            hasTokens: true
          }
        };
      } else {
        return {
          test: 'signin',
          success: false,
          message: '로그인 테스트 실패 - 토큰 누락',
          error: 'MISSING_TOKENS'
        };
      }
    } else {
      return {
        test: 'signin',
        success: false,
        message: '로그인 테스트 실패 (테스트 유저가 없음)',
        error: 'NO_TEST_USER'
      };
    }

  } catch (error) {
    return {
      test: 'signin',
      success: false,
      message: '로그인 테스트 오류',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

async function testTokens() {
  try {
    const testData = {
      email: 'existing-user@insightflo.dev',
      password: 'TestPass123!'
    };

    const loginResult = await authService.signIn(testData);

    if (!loginResult.success) {
      return {
        test: 'token',
        success: false,
        message: '토큰 테스트 실패 (로그인 실패)',
        error: 'NO_TEST_USER'
      };
    }

    // 리프레시 토큰 검증
    const refreshResult = await authService.refreshToken({
      refreshToken: loginResult.data.tokens.refreshToken
    });

    if (refreshResult.success) {
      return {
        test: 'token',
        success: true,
        message: '토큰 갱신 테스트 성공',
        data: {
          accessTokenGenerated: !!refreshResult.data.accessToken,
          refreshTokenGenerated: !!refreshResult.data.refreshToken
        }
      };
    } else {
      return {
        test: 'token',
        success: false,
        message: '토큰 갱신 테스트 실패',
        error: refreshResult.error
      };
    }

  } catch (error) {
    return {
      test: 'token',
      success: false,
      message: '토큰 테스트 오류',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

async function testProfile() {
  try {
    const testData = {
      email: 'existing-user@insightflo.dev',
      password: 'TestPass123!'
    };

    const loginResult = await authService.signIn(testData);

    if (!loginResult.success) {
      return {
        test: 'profile',
        success: false,
        message: '프로필 테스트 실패 (로그인 실패)',
        error: 'NO_TEST_USER'
      };
    }

    const profileResult = await authService.getProfile(loginResult.data.user.id);

    if (profileResult.success) {
      return {
        test: 'profile',
        success: true,
        message: '프로필 조회 테스트 성공',
        data: {
          userId: profileResult.data.id,
          email: profileResult.data.email,
          nickname: profileResult.data.nickname
        }
      };
    } else {
      return {
        test: 'profile',
        success: false,
        message: '프로필 조회 테스트 실패',
        error: profileResult.error
      };
    }

  } catch (error) {
    return {
      test: 'profile',
      success: false,
      message: '프로필 테스트 오류',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}