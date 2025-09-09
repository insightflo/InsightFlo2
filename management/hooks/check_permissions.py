#!/usr/bin/env python3
# management/hooks/check_permissions.py

import json
import sys
import os
from pathlib import Path

# 각 에이전트의 쓰기 권한 정의
PERMISSIONS = {
    "pm": [
        "management/requests/",
        "management/meetings/",
        "management/decisions/"
    ],
    "ui-ux-designer": [
        "design/",
        "management/contracts/interfaces/design-system.md",
        "management/contracts/interfaces/component-specs.md"
    ],
    "frontend-lead": [
        "frontend/",
        "management/contracts/interfaces/frontend-api-requirements.md"
    ],
    "backend-lead": [
        "backend/",
        "management/contracts/interfaces/api-spec.md",
        "management/contracts/interfaces/database-schema.md"
    ],
    "standards-guardian": [
        "management/contracts/standards/"
    ],
    "qa-tester": [
        "qa/",
        "backend/tests/",
        "frontend/test/"
    ],
    "devops-operator": [
        "infrastructure/",
        ".github/workflows/",
        "management/contracts/interfaces/deployment-spec.md"
    ]
}

def main():
    # stdin에서 입력 받기
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError as e:
        print(f"Error parsing input: {e}", file=sys.stderr)
        sys.exit(1)
    
    # 현재 에이전트 확인
    current_agent = os.environ.get("CURRENT_AGENT", "unknown")
    
    # 파일 경로 추출
    tool_input = input_data.get("tool_input", {})
    file_path = tool_input.get("file_path", "")
    
    # 권한 확인
    if current_agent == "unknown":
        print("⚠️  Warning: Agent not identified. Please set CURRENT_AGENT.", file=sys.stderr)
        sys.exit(0)  # 경고만 하고 진행
    
    if current_agent not in PERMISSIONS:
        print(f"❌ Unknown agent: {current_agent}", file=sys.stderr)
        sys.exit(2)
    
    # 에이전트의 허용된 경로 확인
    allowed_paths = PERMISSIONS[current_agent]
    is_allowed = any(
        file_path.startswith(path) or 
        file_path == path 
        for path in allowed_paths
    )
    
    if not is_allowed:
        error_message = f"""
❌ Permission Denied!

Agent: {current_agent}
Attempted to modify: {file_path}

This agent is only allowed to modify:
{chr(10).join('  • ' + path for path in allowed_paths)}

To modify {file_path}, please:
1. Create a request in management/requests/to-[appropriate-team]/
2. Wait for the responsible team to implement
3. Check the response in management/responses/
"""
        print(error_message, file=sys.stderr)
        sys.exit(2)  # 차단
    
    # 허용
    print(f"✅ Permission granted for {current_agent} to modify {file_path}")
    sys.exit(0)

if __name__ == "__main__":
    main()