import { z } from 'zod';

/**
 * 사용자 등록 유효성 검사 스키마
 */
export const userRegistrationSchema = z.object({
  email: z.string().email('유효하지 않은 이메일 형식입니다'),
  password: z.string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .refine(password => {
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
      return hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
    }, '비밀번호는 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다'),
  nickname: z.string().min(2, '닉네임은 최소 2자 이상이어야 합니다'),
});

/**
 * 사용자 로그인 유효성 검사 스키마
 */
export const userLoginSchema = z.object({
  email: z.string().email('유효하지 않은 이메일 형식입니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

/**
 * 사용자 키워드 유효성 검사 스키마
 */
export const userKeywordSchema = z.object({
  keyword: z.string().min(1, '키워드를 입력해주세요'),
  weight: z.number().min(1).max(5).optional().default(1),
});

/**
 * 뉴스 생성 유효성 검사 스키마
 */
export const newsCreateSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(10, '내용은 최소 10자 이상이어야 합니다'),
  sourceUrl: z.string().url('유효하지 않은 URL 형식입니다'),
});

/**
 * API 응답 공통 유효성 검사 함수
 */
export function validateApiRequest<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ')
      };
    }
    return { success: false, error: '유효성 검사 중 오류가 발생했습니다' };
  }
}

export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type UserKeywordInput = z.infer<typeof userKeywordSchema>;
export type NewsCreateInput = z.infer<typeof newsCreateSchema>;