# Meeting Protocol - 회의 진행 표준

**파일 위치**: `management/contracts/standards/meeting-protocol.md`  
**작성자**: Standards Guardian  
**작성일**: 2025-01-21  
**버전**: 1.0

---

## 🎯 회의 종류 및 목적

### 1. **팀 간 동기화 회의** (Cross-Team Sync)
- **목적**: 팀 간 진행 상황 공유 및 블로커 해결
- **주기**: 주 2회 (월/목)
- **소요시간**: 30분
- **참석자**: 각 팀 Lead + PM
- **주관**: PM

### 2. **아키텍처 결정 회의** (Architecture Decision Meeting)
- **목적**: 중요한 기술적 결정 사항 논의 및 승인
- **주기**: 필요시 (월 1-2회)
- **소요시간**: 60분
- **참석자**: Standards Guardian + 관련 Team Leads + PM
- **주관**: Standards Guardian

### 3. **문제 해결 회의** (Problem Resolution Meeting)
- **목적**: 블로킹 이슈 및 긴급 문제 해결
- **주기**: 필요시 (즉시 소집)
- **소요시간**: 45분
- **참석자**: 관련 팀원 + PM + (필요시) Standards Guardian
- **주관**: PM

### 4. **스프린트 계획 회의** (Sprint Planning)
- **목적**: 스프린트 목표 설정 및 작업 할당
- **주기**: 스프린트 시작 시 (격주)
- **소요시간**: 90분
- **참석자**: 전체 팀
- **주관**: PM

### 5. **코드 리뷰 회의** (Code Review Session)
- **목적**: 중요한 코드 변경사항 집단 검토
- **주기**: 필요시 (주 1회)
- **소요시간**: 60분
- **참석자**: Standards Guardian + 관련 개발자들
- **주관**: Standards Guardian

---

## 📝 회의록 표준 템플릿

### 기본 회의록 형식

```markdown
# Meeting: [회의 제목]

**Date**: [YYYY-MM-DD HH:MM]  
**Type**: [회의 종류]  
**Duration**: [소요시간]  
**Chair**: [주관자]  
**Attendees**: [참석자 목록]  
**Location**: [회의 장소/링크]

---

## Agenda
- [안건 1]: [설명]
- [안건 2]: [설명]
- [안건 3]: [설명]

## Discussion Summary
### [안건 1 제목]
- **Discussion**: [논의 내용 요약]
- **Concerns**: [우려사항 또는 반대 의견]
- **Resolution**: [해결 방안]

### [안건 2 제목]
- **Discussion**: [논의 내용 요약]
- **Concerns**: [우려사항 또는 반대 의견]
- **Resolution**: [해결 방안]

## Decisions Made
- [결정사항 1]: [세부 내용] - **Responsible**: [담당자]
- [결정사항 2]: [세부 내용] - **Responsible**: [담당자]

## Action Items
- [ ] **[담당자]**: [작업 내용] (Due: YYYY-MM-DD) - Priority: [High/Medium/Low]
- [ ] **[담당자]**: [작업 내용] (Due: YYYY-MM-DD) - Priority: [High/Medium/Low]

## Blockers & Issues
- **[이슈 제목]**: [설명] - **Owner**: [담당자] - **Target Resolution**: [날짜]

## Next Meeting
- **Date**: [다음 회의 일정]
- **Agenda Items**: [미리 알려진 안건들]

---
*Meeting notes by*: [작성자]  
*Reviewed by*: [검토자]
```

---

## 🎪 회의 진행 규칙

### 회의 준비 (Pre-Meeting)
1. **24시간 전**: 회의 안건 및 자료 공유
2. **사전 검토**: 참석자는 안건 사전 검토 필수
3. **자료 준비**: 발표자는 스크린 공유 자료 준비

### 회의 진행 (During Meeting)
1. **시간 엄수**: 정시 시작, 정시 종료
2. **안건 순서**: 우선순위 순으로 진행
3. **발언 규칙**: 
   - 한 번에 한 사람만 발언
   - 안건과 무관한 논의 금지
   - 건설적 비판과 대안 제시
4. **결정 방식**:
   - 합의 우선
   - 필요시 다수결
   - Standards Guardian 최종 결정권 (기술 사항)

### 회의 후 처리 (Post-Meeting)
1. **24시간 내**: 회의록 작성 및 공유
2. **48시간 내**: Action Items 확인 및 일정 등록
3. **즉시**: ADR 필요 결정사항 문서화

---

## 📊 회의별 세부 가이드라인

### Cross-Team Sync Meeting
```markdown
## 표준 안건
1. **Team Status Updates** (각 팀 5분)
   - 지난 회의 이후 완료 작업
   - 현재 진행 중인 작업
   - 다음 회의까지 계획

2. **Blockers & Dependencies** (10분)
   - 팀 간 의존성 이슈
   - 외부 블로커 사항
   - 지원 요청 사항

3. **Upcoming Milestones** (5분)
   - 다가오는 마일스톤 현황
   - 리스크 요소 점검

## 성공 기준
- 모든 블로커 이슈 식별 및 해결책 도출
- 팀 간 의존성 명확화
- 다음 주 우선순위 정렬
```

### Architecture Decision Meeting
```markdown
## 표준 안건
1. **Architecture Review** (20분)
   - 현재 아키텍처 현황
   - 새로운 요구사항 검토

2. **Decision Items** (30분)
   - 각 결정 사항별 토론
   - 옵션 비교 및 평가
   - 결정 및 근거 문서화

3. **Implementation Planning** (10분)
   - 구현 계획 검토
   - 마이그레이션 전략

## 결정 기준
- 기술적 타당성
- 비용 효율성
- 유지보수성
- 확장성
- 보안성
```

### Problem Resolution Meeting
```markdown
## 표준 안건
1. **Problem Statement** (10분)
   - 문제 현황 정확한 파악
   - 영향 범위 분석

2. **Root Cause Analysis** (15분)
   - 근본 원인 분석
   - 재발 방지 방안

3. **Solution Options** (15분)
   - 가능한 해결책들
   - 장단점 비교

4. **Action Plan** (5분)
   - 실행 계획 수립
   - 책임자 지정

## 긴급도별 대응
- **Critical**: 4시간 내 해결
- **High**: 24시간 내 해결
- **Medium**: 3일 내 해결
```

---

## 🎭 역할별 회의 책임

### PM (Project Manager)
- 회의 일정 조율 및 공지
- 안건 수집 및 우선순위 설정
- 회의 진행 및 시간 관리
- Action Items 추적 및 관리

### Standards Guardian
- 기술 관련 회의 주관
- 아키텍처 결정 최종 승인
- 코드 리뷰 세션 진행
- 품질 기준 준수 감독

### Team Leads
- 팀 현황 정확한 보고
- 기술적 의견 제시
- 팀원 대표 역할
- 결정사항 팀 내 전파

### Team Members
- 적극적 참여 및 의견 제시
- 정확한 정보 공유
- 결정사항 준수
- 후속 조치 이행

---

## 📱 회의 도구 및 환경

### 필수 도구
- **화상 회의**: Google Meet / Zoom
- **문서 공유**: Google Docs / Notion
- **일정 관리**: Google Calendar
- **액션 아이템**: Jira / GitHub Issues

### 회의실 환경
- 안정적인 인터넷 연결
- 스크린 공유 가능
- 마이크/카메라 테스트 완료
- 백그라운드 노이즈 차단

---

## 📈 회의 효율성 측정

### 회의 품질 지표
- **준시성**: 정시 시작/종료 비율
- **참석률**: 필수 참석자 참석 비율
- **실행률**: Action Items 완료 비율
- **만족도**: 참석자 만족도 점수

### 월간 회의 리포트
```markdown
## Monthly Meeting Report

### Meeting Statistics
- Total Meetings: [수]
- Average Duration: [시간]
- Action Items Completed: [%]
- Decision Items Resolved: [수]

### Key Achievements
- [주요 성과 1]
- [주요 성과 2]

### Areas for Improvement
- [개선 필요 사항 1]
- [개선 필요 사항 2]
```

---

## 🚨 특별 회의 프로세스

### 긴급 회의 (Emergency Meeting)
- **소집 기준**: Production 장애, 보안 이슈, 심각한 블로커
- **소집 방법**: Slack/Teams 즉시 알림
- **대응 시간**: 2시간 내 소집
- **참석자**: 필수 인원만 (최대 5명)

### 분쟁 해결 회의 (Conflict Resolution)
- **중재자**: PM 또는 상급 관리자
- **진행 방식**: 각자 입장 청취 → 합의점 도출
- **결과 처리**: 결정사항 문서화 및 후속 모니터링

---

## 🔄 회의 프로세스 개선

### 회의 피드백 시스템
- 회의 종료 시 5분 피드백 세션
- 월간 회의 효율성 설문조사
- 분기별 회의 프로세스 검토

### 지속적 개선
- 비효율적 회의 패턴 식별
- 시간 단축 방안 모색
- 참여도 향상 방법 개발

---

## 📋 회의록 보관 및 관리

### 파일 저장 구조
```
management/meetings/
├── active/
│   ├── 2025-01-15-cross-team-sync.md
│   ├── 2025-01-18-architecture-decision.md
│   └── 2025-01-22-sprint-planning.md
└── completed/
```

### 검색 및 참조
- 회의록 제목에 키워드 포함
- 중요 결정사항 태그 시스템
- 월간 인덱스 파일 생성

---

**Standards Guardian Authority**: 🛡️ 회의 품질 및 효율성 보장  
**Implementation Status**: ✅ 즉시 시행  
**Review Cycle**: 분기별 (3개월)  
**Next Update**: 2025-04-21