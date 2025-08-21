#!/usr/bin/env python3
# .claude/hooks/identify_agent.py

import json
import sys
import os

def identify_agent_from_prompt(prompt):
    """프롬프트에서 에이전트 역할을 식별"""
    
    agent_keywords = {
        "pm": ["project manager", "PM", "coordinate", "requirements", "timeline"],
        "ui-ux-designer": ["design", "UI", "UX", "mockup", "wireframe", "user experience"],
        "frontend-lead": ["frontend", "flutter", "widget", "UI implementation"],
        "backend-lead": ["backend", "API", "database", "Next.js", "endpoint"],
        "standards-guardian": ["review", "standards", "architecture", "compliance"],
        "qa-tester": ["test", "QA", "quality", "bug", "testing"],
        "devops-operator": ["deploy", "DevOps", "infrastructure", "CI/CD", "docker"]
    }
    
    prompt_lower = prompt.lower()
    
    for agent, keywords in agent_keywords.items():
        if any(keyword.lower() in prompt_lower for keyword in keywords):
            return agent
    
    return "unknown"

def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)
    
    prompt = input_data.get("prompt", "")
    
    # 프롬프트에서 에이전트 식별
    identified_agent = identify_agent_from_prompt(prompt)
    
    # 환경 변수 설정 (자식 프로세스용)
    os.environ["CURRENT_AGENT"] = identified_agent
    
    # 컨텍스트 추가
    context = f"""
Current Role: {identified_agent}

You are now acting as the {identified_agent} agent.
Please follow your role's responsibilities and access restrictions.
"""
    
    print(context)
    sys.exit(0)

if __name__ == "__main__":
    main()