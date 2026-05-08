# Task Execution Checklist (Template)
Copy these items into your `task.md` for every task.

## 🔍 Phase 1: Research & Plan
- [ ] Research IM documentation and `dzu/knowledge`.
- [ ] Create/Update `implementation_plan.md`.
- [ ] Obtain User Approval.

## 💻 Phase 2: Execution
### Database & SQL
- [ ] All parameters wrapped in `DbParameter`.
- [ ] SQL strings have spaces at start and end.
- [ ] Using `.data` for result objects (IM v8).
- [ ] `locale_id` filtered in SQL.

### Backend & Frontend
- [ ] `try-catch` for non-core logic.
- [ ] Naming: CamelCase for WF, snake_case for DB.
- [ ] Standard `imui` tags and `imui_design_system.md` buttons.
- [ ] `imuiValidate` implemented.

## 🛡️ Phase 3: Audit & QA
- [ ] Self-audit against `AGENT_PROTOCOL.md`.
- [ ] Handover to Reviewer Agent (if applicable).
- [ ] Final functional verification.
- [ ] Create/Update `walkthrough.md`.
- [ ] Push to Git (only if requested).
