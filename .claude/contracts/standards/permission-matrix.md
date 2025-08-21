# 🔐 InsightFlo 권한 매트릭스

**버전**: 1.0  
**최종 업데이트**: 2025-01-21  
**표준 수립자**: Standards Guardian  
**적용 범위**: 전체 팀 에이전트

---

## 📋 목차

1. [에이전트별 폴더 접근 권한](#에이전트별-폴더-접근-권한)
2. [권한 위반 처리 방안](#권한-위반-처리-방안)
3. [특별 권한 및 예외 사항](#특별-권한-및-예외-사항)
4. [권한 검증 자동화](#권한-검증-자동화)
5. [권한 변경 절차](#권한-변경-절차)

---

## 🗂️ 에이전트별 폴더 접근 권한

### 1. 전체 권한 매트릭스

| Agent | .claude/requests | .claude/responses | .claude/meetings | .claude/decisions | .claude/contracts | backend/ | frontend/ | design/ | infrastructure/ | qa/ | docs/ |
|-------|------------------|-------------------|------------------|-------------------|-------------------|----------|-----------|---------|----------------|-----|-------|
| **PM** | ✅ WRITE (all) | ✅ WRITE | ✅ WRITE | ✅ WRITE | 📖 READ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ WRITE |
| **Standards Guardian** | 📖 READ (all) | ✅ WRITE | ✅ WRITE | ✅ WRITE | ✅ WRITE | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ WRITE |
| **Backend Lead** | 📖 READ (to-backend) | ✅ WRITE | 📖 READ | 📖 READ | 📖 READ | ✅ WRITE | ❌ | ❌ | ❌ | ❌ | 📖 READ |
| **Frontend Lead** | 📖 READ (to-frontend) | ✅ WRITE | 📖 READ | 📖 READ | 📖 READ | ❌ | ✅ WRITE | 📖 READ | ❌ | ❌ | 📖 READ |
| **UI/UX Designer** | 📖 READ (to-ui-ux) | ✅ WRITE | 📖 READ | 📖 READ | 📖 READ | ❌ | 📖 READ | ✅ WRITE | ❌ | ❌ | ✅ WRITE |
| **DevOps Operator** | 📖 READ (to-devops) | ✅ WRITE | 📖 READ | 📖 READ | 📖 READ | 📖 READ | 📖 READ | ❌ | ✅ WRITE | 📖 READ | 📖 READ |
| **QA Tester** | 📖 READ (to-qa) | ✅ WRITE | 📖 READ | 📖 READ | 📖 READ | 📖 READ | 📖 READ | 📖 READ | 📖 READ | ✅ WRITE | 📖 READ |

### 2. 권한 레벨 설명

#### ✅ WRITE (쓰기)
- 파일 생성, 수정, 삭제 가능
- 폴더 생성 및 구조 변경 가능
- 모든 작업에 대한 완전한 제어

#### 📖 READ (읽기)
- 파일 및 폴더 내용 조회만 가능
- 파일 다운로드 및 참조 가능
- 수정, 삭제, 생성 불가

#### ❌ NO ACCESS (접근 불가)
- 해당 폴더/파일에 접근 불가
- 읽기, 쓰기 모두 차단
- 권한 위반 시 자동 차단

### 3. 세부 권한 규칙

#### PM (Project Manager)
```yaml
권한 범위:
  - 모든 요청 파일 생성 및 관리
  - 회의록 및 결정사항 기록
  - 프로젝트 문서화 총괄
  - 팀 간 협업 조율

제한 사항:
  - 직접적인 코드 수정 불가
  - 기술적 구현 파일 작성 불가
  - 표준 문서는 Standards Guardian 승인 필요

특별 권한:
  - 긴급 상황 시 모든 폴더 임시 접근 가능
  - 권한 변경 요청 승인 권한
```

#### Standards Guardian
```yaml
권한 범위:
  - 모든 표준 문서 작성 및 수정
  - 아키텍처 결정 기록
  - 코드 리뷰 체크리스트 관리
  - 권한 매트릭스 업데이트

제한 사항:
  - 직접적인 코드 구현 불가
  - 비즈니스 로직 결정 참여 제한

특별 권한:
  - 🚫 VETO 권한: 표준 위반 시 모든 작업 차단
  - 모든 코드에 대한 품질 검증 권한
  - 긴급 표준 업데이트 권한
```

#### Backend Lead Developer
```yaml
권한 범위:
  - backend/ 폴더 모든 파일 관리
  - API 설계 및 구현
  - 데이터베이스 스키마 관리
  - Backend 관련 요청/응답 처리

제한 사항:
  - Frontend 코드 직접 수정 불가
  - Infrastructure 설정 직접 변경 불가
  - UI/UX 관련 파일 수정 불가

협업 권한:
  - API 문서 공동 작성 (docs/api/)
  - Frontend와의 인터페이스 협의
```

#### Frontend Lead Developer
```yaml
권한 범위:
  - frontend/ 폴더 모든 파일 관리
  - Flutter 앱 구현
  - UI 컴포넌트 개발
  - 클라이언트 로직 구현

제한 사항:
  - Backend 코드 직접 수정 불가
  - Infrastructure 설정 변경 불가
  - 디자인 파일 직접 수정 불가 (협의 필요)

협업 권한:
  - 디자인 파일 읽기 및 피드백
  - API 문서 참조 및 피드백
```

#### UI/UX Designer
```yaml
권한 범위:
  - design/ 폴더 모든 파일 관리
  - 디자인 시스템 정의
  - UI/UX 가이드라인 작성
  - 사용자 경험 문서화

제한 사항:
  - 코드 파일 직접 수정 불가
  - Infrastructure 설정 접근 불가

협업 권한:
  - Frontend 코드 읽기 (UI 구현 확인)
  - 디자인 가이드 문서 작성 (docs/design/)
```

#### DevOps Operator
```yaml
권한 범위:
  - infrastructure/ 폴더 모든 파일 관리
  - Docker, CI/CD 설정
  - 배포 및 운영 환경 관리
  - 모니터링 설정

제한 사항:
  - 비즈니스 로직 코드 수정 불가
  - 디자인 파일 수정 불가

협업 권한:
  - 모든 코드 읽기 (배포 및 모니터링 목적)
  - 환경 설정 문서 작성
```

#### QA Tester
```yaml
권한 범위:
  - qa/ 폴더 모든 파일 관리
  - 테스트 케이스 작성 및 관리
  - 품질 검증 문서화
  - 버그 리포트 작성

제한 사항:
  - 프로덕션 코드 직접 수정 불가
  - Infrastructure 설정 변경 불가
  - 디자인 파일 수정 불가

협업 권한:
  - 모든 코드 읽기 (테스트 작성 목적)
  - 품질 관련 문서 피드백
```

---

## 🚨 권한 위반 처리 방안

### 1. 자동 차단 시스템

#### 권한 검증 스크립트
```python
# .claude/hooks/check_permissions.py
import os
import sys
import json
from pathlib import Path

class PermissionChecker:
    def __init__(self):
        self.permission_matrix = {
            'pm': {
                'read': ['.claude/requests', '.claude/responses', '.claude/meetings', '.claude/decisions', '.claude/contracts', 'docs/'],
                'write': ['.claude/requests', '.claude/responses', '.claude/meetings', '.claude/decisions', 'docs/']
            },
            'standards-guardian': {
                'read': ['.claude/requests', '.claude/responses', '.claude/meetings', '.claude/decisions'],
                'write': ['.claude/responses', '.claude/meetings', '.claude/decisions', '.claude/contracts', 'docs/']
            },
            'backend-lead': {
                'read': ['.claude/requests/to-backend/', '.claude/responses', '.claude/meetings', '.claude/decisions', '.claude/contracts', 'docs/'],
                'write': ['backend/', '.claude/responses']
            },
            'frontend-lead': {
                'read': ['.claude/requests/to-frontend/', '.claude/responses', '.claude/meetings', '.claude/decisions', '.claude/contracts', 'design/', 'docs/'],
                'write': ['frontend/', '.claude/responses']
            },
            'ui-ux-designer': {
                'read': ['.claude/requests/to-ui-ux/', '.claude/responses', '.claude/meetings', '.claude/decisions', '.claude/contracts', 'frontend/', 'docs/'],
                'write': ['design/', '.claude/responses', 'docs/design/']
            },
            'devops-operator': {
                'read': ['.claude/requests/to-devops/', '.claude/responses', '.claude/meetings', '.claude/decisions', '.claude/contracts', 'backend/', 'frontend/', 'qa/', 'docs/'],
                'write': ['infrastructure/', '.claude/responses']
            },
            'qa-tester': {
                'read': ['.claude/requests/to-qa/', '.claude/responses', '.claude/meetings', '.claude/decisions', '.claude/contracts', 'backend/', 'frontend/', 'design/', 'infrastructure/', 'docs/'],
                'write': ['qa/', '.claude/responses']
            }
        }
    
    def check_permission(self, agent_type, file_path, operation):
        """
        권한 검사
        agent_type: 에이전트 유형
        file_path: 접근하려는 파일 경로  
        operation: 'read' or 'write'
        """
        if agent_type not in self.permission_matrix:
            return False, f"Unknown agent type: {agent_type}"
        
        permissions = self.permission_matrix[agent_type]
        allowed_paths = permissions.get(operation, [])
        
        for allowed_path in allowed_paths:
            if file_path.startswith(allowed_path):
                return True, "Permission granted"
        
        return False, f"Permission denied: {agent_type} cannot {operation} {file_path}"
    
    def log_violation(self, agent_type, file_path, operation):
        """권한 위반 로깅"""
        violation = {
            'timestamp': datetime.now().isoformat(),
            'agent': agent_type,
            'file_path': file_path,
            'operation': operation,
            'action': 'BLOCKED'
        }
        
        log_file = '.claude/logs/permission_violations.json'
        os.makedirs(os.path.dirname(log_file), exist_ok=True)
        
        violations = []
        if os.path.exists(log_file):
            with open(log_file, 'r') as f:
                violations = json.load(f)
        
        violations.append(violation)
        
        with open(log_file, 'w') as f:
            json.dump(violations, f, indent=2)
        
        # 3회 이상 위반 시 PM에게 알림
        agent_violations = [v for v in violations if v['agent'] == agent_type]
        if len(agent_violations) >= 3:
            self.notify_pm(agent_type, len(agent_violations))
    
    def notify_pm(self, agent_type, violation_count):
        """PM에게 권한 위반 알림"""
        alert_file = f'.claude/alerts/permission-violation-{agent_type}.md'
        os.makedirs(os.path.dirname(alert_file), exist_ok=True)
        
        content = f"""# 🚨 권한 위반 알림

**에이전트**: {agent_type}
**위반 횟수**: {violation_count}회
**일시**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## 조치 필요
해당 에이전트의 권한 이해도 확인 및 재교육이 필요합니다.

## 상세 로그
`.claude/logs/permission_violations.json` 파일을 확인하세요.
"""
        
        with open(alert_file, 'w', encoding='utf-8') as f:
            f.write(content)

# 사용 예시
def main():
    checker = PermissionChecker()
    
    # 현재 에이전트 식별 (환경변수 또는 컨텍스트에서)
    current_agent = os.getenv('CURRENT_AGENT', 'unknown')
    target_file = sys.argv[1] if len(sys.argv) > 1 else ''
    operation = sys.argv[2] if len(sys.argv) > 2 else 'read'
    
    allowed, message = checker.check_permission(current_agent, target_file, operation)
    
    if not allowed:
        checker.log_violation(current_agent, target_file, operation)
        print(f"❌ {message}")
        sys.exit(1)
    else:
        print(f"✅ {message}")
        sys.exit(0)

if __name__ == '__main__':
    main()
```

### 2. 위반 처리 절차

#### Level 1: 자동 경고
```yaml
조건: 첫 번째 권한 위반
처리:
  - 자동 차단 및 경고 메시지 표시
  - 로그에 위반 내용 기록
  - 올바른 권한 요청 방법 안내

메시지 예시:
  "❌ 권한이 없습니다. backend/ 폴더는 Backend Lead만 수정 가능합니다.
   요청이 필요하시면 .claude/requests/to-backend/에 요청 파일을 작성해주세요."
```

#### Level 2: PM 알림
```yaml
조건: 동일 에이전트 3회 위반
처리:
  - PM에게 자동 알림 생성
  - 에이전트 재교육 필요 표시
  - 권한 이해도 점검 요청

알림 파일: .claude/alerts/permission-violation-{agent}.md
```

#### Level 3: 임시 제재
```yaml
조건: 동일 에이전트 5회 위반
처리:
  - 24시간 임시 접근 제한
  - PM과 Standards Guardian에게 긴급 알림
  - 권한 재설정 절차 필요

제재 해제: PM의 명시적 승인 필요
```

### 3. 예외 처리 상황

#### 긴급 상황 임시 권한
```yaml
적용 상황:
  - 프로덕션 장애 발생
  - 보안 취약점 긴급 패치
  - 고객 영향 Critical 이슈

절차:
  1. PM이 긴급 권한 요청서 작성
  2. Standards Guardian 승인
  3. 임시 권한 부여 (최대 24시간)
  4. 작업 완료 후 즉시 권한 회수
  5. 작업 내용 및 사유 문서화

임시 권한 파일: .claude/temp-permissions/{agent}-{timestamp}.json
```

---

## 🔑 특별 권한 및 예외 사항

### 1. Standards Guardian VETO 권한

#### 거부권 행사 조건
```yaml
즉시 차단 대상:
  - 아키텍처 표준 위반
  - 보안 가이드라인 무시
  - 코딩 스타일 가이드 위반
  - API 설계 표준 미준수
  - 테스트 커버리지 기준 미달

거부권 행사 절차:
  1. 위반 내용 감지 및 즉시 차단
  2. 위반 사유 상세 문서화
  3. 해당 팀에게 수정 요청 생성
  4. PM에게 거부권 행사 알림
  5. 수정 완료까지 작업 차단 유지

거부권 해제: 표준 준수 확인 후 Standards Guardian이 직접 해제
```

### 2. PM 전체 접근 권한

#### 사용 조건
```yaml
일반적 사용:
  - 프로젝트 전체 현황 파악
  - 팀 간 협업 조율
  - 문서화 및 의사결정 기록
  - 회의 주관 및 일정 관리

제한 사항:
  - 직접적인 코드 수정 불가
  - 기술적 구현 결정 불가
  - 표준 문서는 Standards Guardian 승인 필요

긴급 상황 권한:
  - 모든 폴더 임시 접근 가능
  - 팀 간 분쟁 중재
  - 권한 재조정 결정
```

### 3. QA 전체 읽기 권한

#### 목적 및 활용
```yaml
품질 검증 목적:
  - 모든 코드 테스트 케이스 작성
  - 통합 테스트 시나리오 개발
  - 품질 기준 준수 여부 확인
  - 크로스 플랫폼 테스트 계획

보고 의무:
  - 발견한 품질 이슈는 해당 팀에 요청서로 전달
  - 심각한 문제는 PM과 Standards Guardian에게 즉시 알림
  - 주간 품질 리포트 작성 및 공유
```

---

## 🔄 권한 변경 절차

### 1. 권한 변경 요청 프로세스

#### 요청서 작성
```markdown
# 권한 변경 요청

**요청자**: [에이전트명]
**요청일**: [YYYY-MM-DD]
**변경 유형**: 권한 추가 | 권한 제거 | 권한 수정

## 변경 요청 내용
- **현재 권한**: [현재 상태]
- **요청 권한**: [요청하는 권한]
- **대상 폴더/파일**: [구체적인 경로]

## 변경 사유
[권한 변경이 필요한 구체적인 이유]

## 비즈니스 근거
[프로젝트에 미치는 긍정적 영향]

## 보안 영향 분석
[권한 변경으로 인한 보안 위험 분석]

## 대안 검토
[다른 해결 방법 검토 결과]

## 임시/영구 구분
- [ ] 임시 권한 (기간: [시작일] ~ [종료일])
- [ ] 영구 권한 변경

## 승인자 확인
- [ ] PM 승인
- [ ] Standards Guardian 승인 (보안/아키텍처 관련)
```

### 2. 승인 프로세스

#### 일반 권한 변경
```yaml
승인 단계:
  1. 요청서 검토 (PM)
  2. 보안 영향 평가 (Standards Guardian)
  3. 기술적 타당성 검토 (해당 Lead)
  4. 최종 승인 및 적용 (PM + Standards Guardian)

처리 기간: 영업일 기준 3일 이내
```

#### 긴급 권한 변경
```yaml
적용 상황:
  - Critical 프로덕션 이슈
  - 보안 취약점 대응
  - 고객 영향 긴급 사안

승인 단계:
  1. 긴급 승인 요청 (구두/슬랙)
  2. PM + Standards Guardian 동시 승인
  3. 즉시 권한 적용
  4. 사후 문서화 (24시간 이내)

처리 기간: 1시간 이내
```

### 3. 권한 적용 및 검증

#### 권한 업데이트
```python
# 권한 매트릭스 업데이트 스크립트
def update_permission_matrix(agent, folder, permission_type, action):
    """
    agent: 대상 에이전트
    folder: 대상 폴더
    permission_type: 'read' | 'write'
    action: 'add' | 'remove'
    """
    config_file = '.claude/config/permission-matrix.json'
    
    with open(config_file, 'r') as f:
        matrix = json.load(f)
    
    if action == 'add':
        if folder not in matrix[agent][permission_type]:
            matrix[agent][permission_type].append(folder)
    elif action == 'remove':
        if folder in matrix[agent][permission_type]:
            matrix[agent][permission_type].remove(folder)
    
    with open(config_file, 'w') as f:
        json.dump(matrix, f, indent=2)
    
    # 권한 변경 로그 기록
    log_permission_change(agent, folder, permission_type, action)

def log_permission_change(agent, folder, permission_type, action):
    """권한 변경 이력 로깅"""
    change_log = {
        'timestamp': datetime.now().isoformat(),
        'agent': agent,
        'folder': folder,
        'permission_type': permission_type,
        'action': action,
        'approved_by': get_current_user()
    }
    
    log_file = '.claude/logs/permission_changes.json'
    
    changes = []
    if os.path.exists(log_file):
        with open(log_file, 'r') as f:
            changes = json.load(f)
    
    changes.append(change_log)
    
    with open(log_file, 'w') as f:
        json.dump(changes, f, indent=2)
```

---

## 📊 권한 모니터링 및 리포팅

### 1. 일일 권한 사용 현황

```yaml
모니터링 항목:
  - 에이전트별 파일 접근 빈도
  - 권한 위반 발생 건수
  - 긴급 권한 사용 현황
  - 크로스 팀 협업 빈도

리포트 생성: 매일 자동 생성
저장 위치: .claude/reports/daily-permissions-{date}.json
```

### 2. 주간 권한 분석 리포트

```markdown
# 주간 권한 분석 리포트

**기간**: 2025-01-15 ~ 2025-01-21
**생성일**: 2025-01-21

## 📊 권한 사용 통계
- 총 파일 접근 횟수: 1,247회
- 권한 위반 발생: 3건
- 긴급 권한 사용: 1건
- 권한 변경 요청: 2건

## 🔍 에이전트별 활동
| 에이전트 | 접근 횟수 | 위반 | 주요 활동 |
|----------|-----------|------|----------|
| Backend Lead | 324 | 0 | API 개발, 데이터베이스 설계 |
| Frontend Lead | 298 | 1 | UI 컴포넌트 개발 |
| Standards Guardian | 156 | 0 | 표준 검토, 품질 관리 |

## ⚠️ 주의사항
- Frontend Lead: design/ 폴더 직접 수정 시도 (1회)
- 권한 교육 필요 에이전트: Frontend Lead

## 📈 개선 제안
- 크로스 팀 협업 프로세스 개선
- 권한 가이드 문서 업데이트
```

---

## 🚨 Standards Guardian 권한 강제 규칙

### ✅ 필수 준수 사항

1. **모든 에이전트는 지정된 폴더에서만 작업**
2. **크로스 팀 작업은 반드시 요청서 작성**
3. **권한 위반 시 즉시 작업 중단**
4. **긴급 권한 사용 시 24시간 내 문서화**

### 🚫 즉시 차단 대상

1. 할당되지 않은 폴더 직접 수정
2. 권한 검증 스크립트 우회 시도
3. 다른 에이전트 권한으로 작업
4. 권한 없는 파일 삭제 또는 이동

### 📊 권한 감사

```yaml
정기 감사: 월 1회
감사 항목:
  - 권한 사용 패턴 분석
  - 위반 사례 및 재발 방지 대책
  - 권한 매트릭스 최적화
  - 보안 취약점 점검

보고서: PM 및 경영진에게 제출
```

---

**Standards Guardian**: 🛡️ 권한 매트릭스 수호  
**Authority**: 🚫 VETO 권한 보유 - 권한 위반 시 즉시 차단  
**Monitoring**: 24/7 실시간 권한 사용 모니터링  
**Contact**: 권한 관련 문의는 Standards Guardian 응답 파일로