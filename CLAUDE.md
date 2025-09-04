# Flutter + Next.js 프로젝트 팀 협업 가이드

## 🎯 프로젝트 개요
Flutter 모바일 앱과 Next.js 백엔드 API를 개발하는 프로젝트입니다.

## 👥 팀 구성과 역할
- **PM**: 프로젝트 총괄, 요구사항 분석, 일정 관리
- **UI/UX Designer**: 디자인 시스템, 화면 설계, 사용자 경험
- **Frontend Lead**: Flutter 앱 개발, UI 구현
- **Backend Lead**: Next.js API 개발, 데이터베이스
- **Standards Guardian**: 아키텍처 표준 검토, 거부권 행사
- **QA/Tester**: 테스트 작성, 품질 보증
- **DevOps**: 인프라, CI/CD, 배포

## 📐 기술 스택 (불변)
- **Frontend**: Flutter 3.x, Riverpod, Clean Architecture
- **Backend**: Next.js 14 App Router, TypeScript, Prisma
- **Database**: PostgreSQL (Supabase)
- **Infrastructure**: Docker, GitHub Actions
- **Testing**: Jest, Flutter Test, Cypress

## 🤝 협업 프로토콜

### 1. 작업 요청 프로세스
1. 요청자가 `.claude/requests/to-{team}/` 디렉토리에 요청 파일 생성
2. 대상 팀이 요청 검토 후 작업 수행
3. 결과를 `.claude/contracts/interfaces/`에 문서화
4. 완료 응답을 `.claude/responses/`에 작성
5. 처리된 요청 파일의 확장자를 .md.done 으로 수정 

### 2. 인터페이스 우선 개발
- Backend는 API 스펙을 먼저 문서화
- Frontend는 목업 데이터로 개발 시작
- Designer는 컴포넌트 스펙을 먼저 정의

### 3. 권한 규칙
- 각 팀은 자신의 디렉토리만 수정 가능
- contracts와 docs는 읽기 전용 (Guardian만 수정 가능)
- 크로스 도메인 작업은 반드시 요청을 통해 진행

## 📊 현재 상태
- 프로젝트 단계: 초기 설정
- 활성 스프린트: Sprint 0 - 아키텍처 설계
- 다음 마일스톤: 인증 시스템 구현

## 🔄 일일 스탠드업 체크리스트
- [ ] 각 팀의 pending requests 확인
- [ ] 블로커 이슈 확인
- [ ] 오늘의 목표 설정
- [ ] 인터페이스 문서 업데이트 확인

## Language and Communication Guidelines
**모든 대화는 한국어가 기본**

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
