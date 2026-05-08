# Intra-mart Workflow Implementation Skill (Advanced)
This skill file is a distilled guide for AI Agents to implement workflow features within this repository using the established professional standards.

---

## 1. Research & Context Skill
Before any implementation, the agent MUST synchronize with these sources:
- **Reference**: `dzu/docs/workflow_plugin_reference.md` (For Plugin IDs & Params).
- **Standards**: `dzu/docs/workflow_programming_best_practices.md` (For Architectural patterns).
- **Rules**: `dzu/agent_instructions/RULES.md` (For Mandatory constraints).

---

## 2. Validation Implementation Skill
**Pattern**: "Thin Client, Secure Server".
- **Client-side**: Use `imuiAddValidationRule` for real-time feedback. 
- **Error Messages**: MUST be prefixed with `zzz` for project consistency (e.g., `zzz This field is required`).
- **JSSP Pairing**: HTML and Server JS MUST stay in the same directory.
- **Server-side**: Use `imuiValidationRule` tag pointing to `.../validator/screen_name#rules`.
- **Advanced Override Pattern**: To achieve total control over error messages (including standard rules like `required`), define `customRules` and `customMessages` objects locally in the JSSP script and pass them to `imuiValidate(formId, customRules, customMessages)`.
- **Action-Specific Validation**: Create different validation functions (e.g., `validateStandard`, `validateTempSave`) with different rule sets for different workflow buttons.

---

## 3. Dynamic Routing Skill (JSSP RPC)
**Pattern**: Use `imwNodeSetting` JSON injection via JSSP RPC.
- **RPC Service**: Place in `api/node_service.js`.
- **Logic**: Use `DCNodeSetting` for overrides and `HVNodeSetting` for expansions.
- **Extension Point**: Always use `jp.co.intra_mart.workflow.plugin.authority.node.dynamic`.
- **Plugin Format**: Consult `workflow_plugin_reference.md` for exact pipe (`|`) delimited strings.

---

## 4. Action & Arrive Process Skill
**Pattern**: Separate business logic from workflow events.
- **Arrive Process**: Used for notifications. Use status-based professional labels.
- **Action Process**: Used for data persistence (INSERT/UPDATE).
- **Mail System**: 
  - Use `MailUtils.sendNotification` for HTML emails.
  - For approvers, provide `process_direct` URLs.
  - For observers/applicants, provide `reference_direct` URLs.

---

## 5. Coding Aesthetic Skill
- **Premium UI**: Use standard `imui` tags. No custom CSS.
- **Logic Separation**: Keep SQL in `.sql` files, business logic in `common.js`, and screen logic in JSSP.
- **Documentation**: If a new "Gotcha" is found, create a report in `dzu/research/`.

## 6. Advanced imWorkflow Client API Skill
**Pattern**: Use `imWorkflow` JavaScript object for framework-integrated control.
- **Dependency**: MUST include `<script src="im_workflow/js/api_base.js" defer></script>` in the `<imart type="head">` section.
- **Navigation**: Use `imWorkflow.transition.returnTo()` for intelligent "Back" functionality that respects workflow history.
- **Processing**: Use `imWorkflow.transition.afterProcess()` after a successful transaction to handle standard redirects.
- **Modals**: Use `imWorkflow.modal.showApply()` or `showTemporarySave()` for modal-based workflows, passing `processParameter` and `optionalParameter`.
- **Data Passing**: Always use `optionalParameter.userParameter` to pass custom form data to the workflow engine.

---
*Created: 2026-05-08 | Version: 1.2 | Standardized for dzutran/IM-Training*
