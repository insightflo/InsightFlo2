# Standards Guardian - 추가 표준 정의 요청

**요청자**: PM
**날짜**: 2025-01-12  
**우선순위**: 🔥 긴급
**참조**: 이전 요청 002-task1-architecture-standards-foundation.md

## 추가로 정의해야 할 표준

현재 `communication-protocol.md`와 기본 아키텍처 표준은 완료되었지만, 완전한 협업 시스템을 위해 다음 3가지 표준이 추가로 필요합니다.

### 1. 🤝 Meeting Protocol

**파일**: `.claude/contracts/standards/meeting-protocol.md`

**필요 내용**:
```markdown
## 회의 종류
- 팀 간 동기화 회의
- 아키텍처 결정 회의
- 문제 해결 회의
- 스프린트 계획 회의

## 회의록 템플릿
```
# Meeting: [제목]
Date: [YYYY-MM-DD HH:MM]
Attendees: [참석자 목록]
Type: [회의 종류]

## Agenda
- [안건 1]
- [안건 2]

## Decisions Made
- [결정사항 1]
- [결정사항 2]

## Action Items
- [ ] [담당자] [작업 내용] (Due: YYYY-MM-DD)

## Next Meeting
Date: [다음 회의 일정]
```

**회의 진행 규칙**:
- 모든 회의는 PM이 주관
- 아키텍처 관련 회의는 Standards Guardian 필수 참석
- 결정사항은 즉시 `.claude/decisions/`에 기록
- 회의록은 `.claude/meetings/`에 저장

### 2. ⚖️ Decision Protocol

**파일**: `.claude/contracts/standards/decision-protocol.md`

**필요 내용**:
Architecture Decision Records (ADR) 표준 형식

```markdown
# ADR-[번호]: [결정 제목]

Date: [YYYY-MM-DD]
Status: Proposed | Accepted | Superseded | Deprecated
Deciders: [결정 참여자]
Technical Story: [관련 이슈/요구사항]

## Context
[결정이 필요한 상황과 배경]

## Decision Drivers
- [결정 요인 1]
- [결정 요인 2]

## Considered Options
- [옵션 1] [간단한 설명]
- [옵션 2] [간단한 설명]

## Decision Outcome
Chosen option: [선택된 옵션]

### Consequences
Good:
- [긍정적 결과 1]
- [긍정적 결과 2]

Bad:
- [부정적 결과 1]
- [부정적 결과 2]

Neutral:
- [중립적 결과]

## Implementation
- [구현 방법]
- [마이그레이션 계획]
```

**결정 분류**:
- **CRITICAL**: 아키텍처 변경, 기술 스택 변경
- **MAJOR**: API 설계, 데이터 모델 변경  
- **MINOR**: 코딩 컨벤션, 도구 선택

### 3. 🔐 Permission Matrix

**파일**: `.claude/contracts/standards/permission-matrix.md`

**필요 내용**:
```markdown
# Agent Permission Matrix

## Folder Access Rights

| Agent | .claude/requests | .claude/responses | .claude/meetings | .claude/decisions | .claude/contracts | backend/ | frontend/ | design/ | infrastructure/ | qa/ |
|-------|------------------|-------------------|------------------|-------------------|-------------------|----------|-----------|---------|----------------|-----|
| PM | WRITE (all) | WRITE | WRITE | WRITE | READ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Standards Guardian | READ | WRITE | WRITE | WRITE | WRITE | ❌ | ❌ | ❌ | ❌ | ❌ |
| Backend Lead | READ (to-backend) | WRITE | ❌ | READ | READ | WRITE | ❌ | ❌ | ❌ | ❌ |
| Frontend Lead | READ (to-frontend) | WRITE | ❌ | READ | read | ❌ | WRITE | ❌ | ❌ | ❌ |
| UI/UX Designer | READ (to-ui-ux) | WRITE | ❌ | read | read | ❌ | ❌ | WRITE | ❌ | ❌ |
| DevOps Operator | READ (to-devops) | WRITE | ❌ | read | read | ❌ | ❌ | ❌ | WRITE | ❌ |
| QA Tester | READ (to-qa) | WRITE | ❌ | read | read | READ | READ | READ | READ | WRITE |

## 권한 위반 처리
1. **자동 차단**: `check_permissions.py` 스크립트
2. **로깅**: 모든 권한 위반 기록
3. **에스컬레이션**: 반복 위반 시 PM 알림
4. **수정 요청**: 적절한 팀에 요청 생성

## 특별 권한
- **Standards Guardian**: 모든 코드 VETO 권한
- **PM**: 모든 폴더 READ, 협업 폴더 WRITE
- **QA**: 품질 검증을 위한 모든 코드 READ
```

## 완료 기한
**1월 12일 (오늘) 20:00까지** 

이 3개 표준이 완료되어야 완전한 협업 시스템이 구축됩니다!

## 우선순위
1. **Permission Matrix** (가장 긴급)
2. **Decision Protocol** 
3. **Meeting Protocol**

---

**이 표준들이 완료되면 모든 팀이 명확한 규칙 하에 협업할 수 있습니다!**
