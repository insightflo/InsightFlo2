
# .claude/contracts/standards/communication-protocol.md

## Request Format
All requests must follow this structure:

```markdown
# Request: [Clear Title]
Date: [ISO 8601 DateTime]
From: [Requesting Team]
To: [Target Team]
Priority: Critical | High | Medium | Low
Deadline: [ISO 8601 Date]
Blocking: [Yes/No - List what's blocked]

## Context
[Why this request is needed]

## Requirements
[Specific details of what's needed]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Dependencies
[What this depends on]

## Response Format Needed
[How the response should be structured]
```

## Response Format
All responses must follow this structure:

```markdown
# Response: [Original Request Title]
Date: [ISO 8601 DateTime]
From: [Responding Team]
To: [Requesting Team]
Request-ID: [Original request file name]
Status: Completed | Partial | Blocked | Rejected

## Summary
[Brief summary of what was done]

## Deliverables
[What was delivered and where to find it]

## Implementation Details
[Relevant technical details]

## Testing Instructions
[How to test/verify the implementation]

## Notes
[Any additional information]

## Next Steps
[What the requesting team should do next]
```
