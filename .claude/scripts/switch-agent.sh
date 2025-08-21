#!/bin/bash
# .claude/scripts/switch-agent.sh

echo "🤖 AI Team Agent Switcher"
echo "========================"
echo ""
echo "에이전트 역할을 교체하겠습니다:"
echo "1) PM (Project Manager)"
echo "2) UI/UX Designer"
echo "3) Frontend Lead"
echo "4) Backend Lead"
echo "5) Standards Guardian"
echo "6) QA/Tester"
echo "7) DevOps/Operator"
echo ""
read -p "(1-7) 번호를 입력하세요: " choice

case $choice in
  1) export CURRENT_AGENT="pm"
     echo "✅ Switched to PM"
     echo "You can now manage project requirements and coordinate teams"
     ;;
  2) export CURRENT_AGENT="ui-ux-designer"
     echo "✅ Switched to UI/UX Designer"
     echo "You can now create designs and specifications"
     ;;
  3) export CURRENT_AGENT="frontend-lead"
     echo "✅ Switched to Frontend Lead"
     echo "You can now develop Flutter application"
     ;;
  4) export CURRENT_AGENT="backend-lead"
     echo "✅ Switched to Backend Lead"
     echo "You can now develop Next.js APIs"
     ;;
  5) export CURRENT_AGENT="standards-guardian"
     echo "✅ Switched to Standards Guardian"
     echo "You can now review and enforce standards"
     ;;
  6) export CURRENT_AGENT="qa-tester"
     echo "✅ Switched to QA/Tester"
     echo "You can now write tests and ensure quality"
     ;;
  7) export CURRENT_AGENT="devops-operator"
     echo "✅ Switched to DevOps/Operator"
     echo "You can now manage infrastructure and deployments"
     ;;
  *) echo "❌ Invalid choice"
     ;;
esac

echo ""
echo "Current agent: $CURRENT_AGENT"