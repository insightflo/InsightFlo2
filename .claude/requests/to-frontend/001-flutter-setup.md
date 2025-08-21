# Frontend Team 초기 요청사항

**요청자**: PM
**날짜**: 2025-01-12
**우선순위**: 긴급

## 요청 내용

### 1. Flutter 프로젝트 초기 설정 (Task #4)
- Flutter 3.x 프로젝트 생성
- Clean Architecture 폴더 구조 설정
  ```
  lib/
  ├── core/
  │   ├── constants/
  │   ├── errors/
  │   ├── utils/
  │   └── widgets/
  ├── data/
  │   ├── datasources/
  │   ├── models/
  │   └── repositories/
  ├── domain/
  │   ├── entities/
  │   ├── repositories/
  │   └── usecases/
  └── presentation/
      ├── pages/
      ├── providers/
      └── widgets/
  ```

### 2. 필수 패키지 설정
```yaml
dependencies:
  # State Management
  flutter_riverpod: ^2.4.0
  riverpod_annotation: ^2.3.0
  
  # Network
  dio: ^5.4.0
  
  # Local Database
  drift: ^2.14.0
  
  # UI
  flutter_native_splash: ^2.3.0
  
  # Utils
  go_router: ^13.0.0
  json_annotation: ^4.8.1
```

### 3. HTTP 클라이언트 구성 (Task #5)
- Dio 기반 API 클라이언트
- JWT 토큰 인터셉터
- 에러 핸들링
- 재시도 로직

### 4. 인증 UI 구현 (Task #6)
- 로그인 화면
- 회원가입 화면
- 비밀번호 재설정 화면
- Material 3 디자인 가이드라인 준수

### 5. 뉴스 피드 UI (Task #8)
- NewsCard 위젯 구현
  - 제목 (최대 2줄)
  - AI 3줄 요약
  - 감정 아이콘
  - 키워드 칩
  - 시간 표시
  - 북마크/공유 버튼
- ListView.builder 무한 스크롤
- Pull-to-Refresh

### 6. 로컬 데이터베이스 설정 (Task #12)
- Drift 스키마 정의
- 오프라인 캐싱 전략
- 동기화 로직

## 완료 기한
- 프로젝트 설정: 1월 13일
- 인증 UI: 1월 14일
- 뉴스 피드: 1월 15일
- 로컬 DB: 1월 16일

## 산출물
- Flutter 프로젝트 구조
- 재사용 가능한 위젯 라이브러리
- API 클라이언트 모듈
- 로컬 DB 스키마

## 성능 목표
- 앱 콜드 스타트: < 3초 (Android), < 2초 (iOS)
- 60 FPS 스크롤 성능
- 메모리 사용량 < 200MB

## 참고사항
- Backend API는 1월 14일부터 사용 가능
- FCM 설정은 Phase 2에서 진행
- 다크 테마 지원 필수