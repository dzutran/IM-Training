# AI Agent Implementation Rules (Intra-mart)

You are an AI agent working on an Intra-mart Accel Platform project. To ensure consistency and reliability, you MUST follow these rules for EVERY task.

## 1. Mandatory Research Phase
Before writing any code or proposing a plan:
- **[ ]** Read `dzu/knowledge/01_standards/coding_rules.md`.
- **[ ]** Read `dzu/knowledge/01_standards/workflow_programming_best_practices.md` (if the task involves workflow).
- **[ ]** Read `dzu/agent_instructions/INTRA_MART_WF_SKILL.md` for mandatory SQL and Locale standards.
- **[ ]** Follow `dzu/agent_instructions/AGENT_PROTOCOL.md` for workflow stages and mandatory self-audit.
- **[ ]** Consult `dzu/practices/` for project-specific patterns.
- **[ ]** **EXTERNAL SAMPLES**: You may research official patterns at `external/WEB-INF/jssp/src/sample`. **ABSOLUTELY NO EDITING** is allowed in this folder.
- **[ ]** **NEVER** reinvent a pattern that already exists in practices or official samples.

## 2. Implementation Standards
- **UI**: Use standard `imui` tags and layout. Do NOT use custom CSS unless strictly necessary.
- **Backend (SSJS)**: 
  - Follow the JSSP RPC pattern. Keep business logic in `common` and database calls in SQL templates.
  - **JSSP PAIRING RULE**: JSSP files (.html and .js) are "a pair born in heaven". They MUST stay in the same directory and have the same name. The .js file contains the `init` function required for page rendering. NEVER separate them during restructuring.
- **Workflow**: 
  - Use `imwNodeSetting` (JSON) in the frontend for dynamic routing.
  - Data persistence must happen in the Action Handler (`apply`, `approve`, etc.).
- **SQL**: Use `2waySQL` syntax and bind parameters via `DbParameter`.

## 3. Documentation Rule
- If you find a bug or a specific "gotcha" in the Intra-mart platform, you **MUST** create a new research report in `dzu/knowledge/03_research/`.
- All significant architectural decisions must be documented.

## 4. Git & Workflow Rule
- **NO SILENT PUSH**: Do NOT push code to Git unless the user explicitly asks you to. Only use local file modifications by default.
- **Commit Messages**: If asked to push, use clear, descriptive commit messages following the project's history pattern.

## 5. Database & MCP Safety Rule
- **SYSTEM TABLES**: Tables starting with `im` (e.g., `imw_`, `im_`, `im_workflow`) are core Intra-mart system tables.
- **READ-ONLY BY DEFAULT**: You are NOT allowed to perform `INSERT`, `UPDATE`, or `DELETE` on these system tables unless the user explicitly provides a specific requirement to do so.
- **Custom Tables**: Modification is allowed on custom application tables (usually not starting with `im`).

## 6. Verification Rule
- Test your implementation in a browser using the `browser_subagent` if possible.
- Verify that your changes do not break existing functionality by checking the relevant `practices` files.

---
*Failure to follow these rules will result in an inconsistent codebase and potential system failure.*
