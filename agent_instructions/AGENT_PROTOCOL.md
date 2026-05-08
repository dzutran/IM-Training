# Intra-mart Agent Interaction & Standardization Protocol (v2.0)

This protocol defines the mandatory workflow, checklists, and interaction rules for all AI Agents. It distinguishes between Small and Large tasks to ensure scalability and quality.

## 🚀 1. Task Type Determination
Before starting, the Agent must determine the task type:
-   **SMALL TASK**: Single feature, single screen, or bug fix (Estimated < 1 day).
-   **LARGE TASK**: Multiple features, workflow architecture, or system-wide changes (Estimated > 1 day).

---

## 🔄 2. Small Task Workflow (The Sprint Flow)
Every small task must pass through these hands:

1.  **RESEARCHER**: Search official docs, `INTRA_MART_WF_SKILL.md`, and `practices/`.
2.  **ARCHITECT**: Build the core idea and a lightweight execution plan.
3.  **DEVELOPER**: 
    - Execute based on the plan.
    - Continuously check standards (SQL spacing, DbParameter, etc.).
    - Maintain clean, encapsulated code.
4.  **REVIEWER**:
    - **Audit**: Verify logic and compliance with standardization checklists.
    - **Minor Fixes**: Report directly to Developer for immediate corrections.
    - **Major Changes**: Stop work and report to the **USER** for decision.
5.  **QA (Quality Assurance)**: 
    - Perform final functional testing.
    - Generate a detailed **Completion Report** covering features and validation results.

---

## 🏗️ 3. Large Task Workflow (The Epic Flow)
For complex requirements that span multiple days or modules:

1.  **LEAD ARCHITECT**:
    - Create a comprehensive **High-Level Implementation Plan**.
    - Break down the Large Task into a sequence of **Small Tasks**.
    - Organize work into **dedicated folders** (e.g., `dzu/practices/feature_name/`) for future maintenance.
2.  **EXECUTION**: Each sub-task follows the **Small Task Workflow** defined above.
3.  **SYNCHRONIZATION**: Regular updates to the main `implementation_plan.md` after each sub-task completion.

---

## ✅ 4. Pre-Flight Standardization Checklist
Mandatory checks for Developer and Reviewer:

### 🗄️ Database & SQL
- [ ] **DbParameter**: All variables wrapped in `DbParameter`.
- [ ] **SQL Spacing**: Space at the beginning AND end of every string line.
- [ ] **Result Object**: Access data via `.data` (Intra-mart v8 standard).
- [ ] **Locale**: Filter by `locale_id` and use `.toString()` on context locale.

### 💻 Backend (SSJS) & Frontend (UI)
- [ ] **Transaction Safety**: `try-catch` for non-core logic (Mail, Log).
- [ ] **Naming**: CamelCase for Workflow params, snake_case for DB columns.
- [ ] **imui Tags**: Use official tags. Buttons follow `imui_button_standard.md`.

---

## 🤝 5. Agent Interaction & Reporting
-   **Handover**: Use `@agent [Persona]` for transitions.
-   **QA Report**: Every task MUST end with a QA report artifact summarizing what was built and what was tested.

---
*Updated: 2026-05-08 | Version: 2.0 (The Agency Standard) | Standardized for dzutran/IM-Training*
