# Intra-mart Workflow Implementation Skill (Advanced)
This skill file is a distilled guide for AI Agents to implement workflow features within this repository using the established professional standards.

---

## 1. Research & Context Skill
Before any implementation, the agent MUST synchronize with these sources:
- **Reference**: `dzu/knowledge/01_standards/workflow_plugin_reference.md` (For Plugin IDs & Params).
- **Standards**: `dzu/knowledge/01_standards/workflow_programming_best_practices.md` (For Architectural patterns).
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
- **Documentation**: If a new "Gotcha" is found, create a report in `dzu/knowledge/03_research/`.

## 6. Advanced imWorkflow Client API Skill
**Pattern**: Use `imWorkflow` JavaScript object for framework-integrated control.
- **Dependency**: MUST include `<script src="im_workflow/js/api_base.js" defer></script>` in the `<imart type="head">` section.
- **Navigation**: Use `imWorkflow.transition.returnTo()` for intelligent "Back" functionality that respects workflow history.
- **Processing**: Use `imWorkflow.transition.afterProcess()` after a successful transaction to handle standard redirects.
- **Modals**: Use `imWorkflow.modal.showApply()` or `showTemporarySave()` for modal-based workflows, passing `processParameter` and `optionalParameter`.
- **Data Passing**: Always use `optionalParameter.userParameter` to pass custom form data to the workflow engine.

## 7. RESTful Navigation (Cookbook 176038)
Instead of using legacy `switch_content` with complex query parameters, use the officially recommended RESTful URL patterns for cleaner and more performant navigation.

| Target Screen | RESTful URL Pattern |
| :--- | :--- |
| **Apply (Nộp đơn)** | `im_workflow/flows/{flow-ID}/apply` |
| **Process (Xử lý)** | `im_workflow/user/process/process_direct/{system-matter-ID}` |
| **Confirmation (Xác nhận)** | `im_workflow/matters/{system-matter-ID}/confirmation-info` |
| **History (Lịch sử)** | `im_workflow/matters/{system-matter-ID}/history-info` |
| **Flow Info (Sơ đồ luồng)** | `im_workflow/matters/{system-matter-ID}/flow-info` |
| **Temp Save (Lưu tạm)** | `im_workflow/matters/{system-matter-ID}/temporary-save` |

> [!TIP]
> Use these patterns in your `jqGrid` cell renders or link buttons to ensure future-proof compatibility with Intra-mart Accel Platform.

## 8. Standard UI Icons (CSS Sprite)
Always use native Intra-mart icons from the [CSS Sprite Image List](https://api.intra-mart.jp/iap/imui-image-doc/pc_index.html) to ensure visual consistency and performance.

### **Naming Convention**
- **Pattern**: `im-ui-icon-[category]-[size]-[name]`
- **Prefix**: `im-ui-icon-` (PC) or `im-smart-icon-` (Smartphone/Universal)
- **Common Sizes**: `16`, `24`, `32`, `48`, `64`, `128` (px)

### **Commonly Used Classes**
| Category | Class Name (16px) | Usage |
| :--- | :--- | :--- |
| **Workflow** | `im-ui-icon-common-16-workflow` | Flow maps, status diagrams |
| **Actions** | `im-ui-icon-common-16-edit` | Apply, modify, edit |
| **Actions** | `im-ui-icon-common-16-refresh` | Reload, reset |
| **Navigation** | `im-ui-icon-common-16-back` | Return to previous page |
| **Status** | `im-smart-icon-common-16-tick` | Success, complete |
| **Status** | `im-smart-icon-common-16-error` | Validation error, failure |
| **Utilities** | `im-smart-icon-common-16-attachment`| File attachments |

## 9. Gold Standard Architecture (Tiered Design)
**Pattern**: Strict separation of concerns to ensure scalability and AI-readability.
- **UI Layer (`screen/`)**: Focus only on display and client validation. No business logic here.
- **Coordination Layer (`action/`)**: Use `ActionProcess.js` to handle workflow events. This is the only place authorized to call data persistence functions.
- **Data Access Layer (`common/` or `common.js`)**: All `tdb.insert/update/delete` MUST reside here.

## 10. Transaction Safety Rules (CRITICAL)
**Rule**: NEVER use manual `tdb.commit()` or `tdb.rollback()` inside `ActionProcess`.
- **Reason**: The IM Workflow Engine manages the global transaction. Manual commits break the engine's ability to rollback on failure, leading to "Ghost Matters" (data saved but workflow failed).
- **Verification**: Always check if `ActionProcess` is returning a proper `result` object with `resultFlag`.

## 11. Advanced Plugin Development Pattern
**Pattern**: Use `WorkflowAuthorityExecEventListener` for dynamic routing.
- **Logic**: Calculate routing values (like `item_total`) and compare against thresholds to inject dynamic nodes.
- **UI**: Keep plugin configuration screens (`config.html`) lightweight and consistent with `imui` styles.

## 12. List Table Best Practices (imuiListTable)
**Pattern**: "Visual Styling without Data Corruption".

### **Clean Data Pattern (Zero-HTML)**
- **Rule**: NEVER use `$grid.setCell()` to inject `<a>` tags or HTML links into IDs that need to be retrieved later. Overwriting cells with HTML "pollutes" the data array.
- **Solution**: Use **`onCellAttr`** in the `<col>` tag to apply styles (color, underline, cursor) during rendering. This makes the cell look like a link while keeping the data as a raw string.
- **Tag Implementation**:
  ```html
  <col name="system_matter_id" ... onCellAttr="cellAttrProvider" />
  ```
- **Script Implementation**:
  ```javascript
  function cellAttrProvider(rowId, val, rawObject, cm, rdata) {
      return 'style="color: #0066cc; text-decoration: underline; cursor: pointer;"';
  }
  ```

### **Native Interaction Handling**
- **Pattern**: Centralized Event Management.
- **Action**: Use the **`onCellSelect`** event of `imuiListTable` to handle all clicks.
- **Reliable Retrieval**: Use **`getRowData(rowid)`** inside the handler. Since we used `onCellAttr` (not `setCell`), the returned ID will be a clean string, perfect for building RESTful URLs.

### **Modern RESTful Navigation (Review)**
| Target | RESTful URL Pattern |
| :--- | :--- |
| **Direct Process** | `im_workflow/user/process/process_direct/{ID}/{NodeId}` |
| **Flow Info** | `im_workflow/matters/{ID}/flow-info` |

## 13. Workflow Database Reference (System Tables)
**Pattern**: "Data-Driven Workflow Control".

### **Core Transaction Tables**
| Table Name | Role | Key Column |
| :--- | :--- | :--- |
| **`imw_t_actv_matter`** | Main table for active matters. | `system_matter_id` |
| **`imw_t_cpl_matter`** | Main table for completed matters. | `system_matter_id` |
| **`imw_t_actv_task`** | Current nodes/tasks waiting for process. | `node_id`, `task_id` |
| **`imw_t_actv_executable_user`** | Users authorized to process current task. | `auth_user_code` |

### **Matter Properties (imw_t_user_data)**
- **Purpose**: Stores key-value pairs for a specific matter. Used primarily for **Branching Rules** and quick data access without joining heavy business tables.
- **Key Columns**:
    - `user_data_id`: Links to the matter's user data ID.
    - `matter_property_key`: The identifier (e.g., `item_total`, `dept_code`).
    - `matter_property_value`: The actual value used by the workflow engine.
- **Agent Usage**: When designing dynamic routing, check this table to see which properties are available for rule evaluation.

### **History & Tracking**
- **`imw_t_actv_matter_his`**: Processing history for active matters.
- **`imw_t_cpl_matter_his`**: Full processing history for completed matters.
- **`imw_t_actv_matter_his_detail`**: Detailed history including user comments.

## 14. Advanced Notifications (Arrive Process)
**Pattern**: "Automated Node-Specific Communication".

### **Targeting Executable Users**
- **Trigger**: Implement logic within the `execute(parameter)` function of an `ArriveProcess.js`.
- **Query**: Use the `imw_t_actv_executable_user` table to identify who is currently authorized to process the matter at the current `node_id`.
  ```sql
  SELECT user_code FROM imw_t_actv_executable_user 
  WHERE system_matter_id = ? AND node_id = ?
  ```

### **Master Data Retrieval (SQL JOIN Pattern)**
High-performance alternative to Manager APIs. Join workflow transaction tables directly with master tables.
- **Table**: `imm_user` (Master User table).
- **Key Columns**: `user_name`, `email_address1`.
- **Implementation (SQL)**:
  ```sql
  SELECT t.auth_user_code, t.auth_user_name, u.email_address1
  FROM imw_t_actv_executable_user t
  LEFT JOIN imm_user u ON t.auth_user_code = u.user_cd
  WHERE t.system_matter_id = ? AND t.node_id = ?
  ```
- **CRITICAL RULE 1: SQL Security & API**: 
  - Always use **`DbParameter`** for query parameters: **`DbParameter.string(value)`**, **`DbParameter.number(value)`**.
  - **`TenantDatabase.select`**: Returns a **Result Object**. Access the array via **`.data`** and check row count via **`.countRow`**.
    - Example: `var res = db.select(sql, params); var data = res.data;`
- **CRITICAL RULE 2: SQL Concatenation**: Always include a **space** at both the **beginning and end** of each SQL string line to prevent keywords from sticking together.
  - Example: `" SELECT name " + " FROM table "` (Correct) vs `"SELECT name" + "FROM table"` (Incorrect).
- **CRITICAL RULE 3: Locale Filtering**: For tables with a `locale_id` column (e.g., `imm_user`, `imw_t_actv_executable_user`), always filter by **`locale_id`** to avoid duplicate results. 
  - **Dynamic Locale**: Use `Contexts.getAccountContext().locale.toString()` to get the language string (e.g., "ja"). *Note: Always call `.toString()` because the context returns a Java object.*
  - **Default**: Use **'ja'** as fallback if the context is unavailable.
- **CRITICAL RULE 4: Email Fallback (Test Environment)**: When retrieving emails from master data, always implement a fallback for empty values to ensure notifications are processed.
  - Example: `var email = row.email || (userCd + "@intra-mart.local");`
- **CRITICAL RULE 5: Transaction Safety**: Always wrap notification or non-core logic (like sending mail) in a **`try-catch`** block.
  - Reason: Errors in notification must NOT rollback the main workflow transaction (Apply/Approve).
- **CRITICAL RULE 6: Naming Convention Awareness**:
  - **Workflow Parameters**: Usually **CamelCase** (e.g., `systemMatterId`, `nodeId`).
  - **Database Columns**: Usually **snake_case** (e.g., `auth_user_code`, `locale_id`).
  - *Action: Always double-check before mapping!*
- **CRITICAL RULE 7: Project Cross-Reference**: Before using core APIs (Database, Session), check existing project files like **`common.js`** to ensure alignment with the current project's implementation style.

### **Mail Delivery Standards**
- **API**: Use `MailUtils.sendNotification(userCd, subject, details, forcedEmail)`.
- **Content**: Always include a direct link to the processing screen:
  `im_workflow/user/process/process_direct/{systemMatterId}/{nodeId}`

---
*Created: 2026-05-08 | Version: 4.0 (The Professional Agent Edition) | Standardized for dzutran/IM-Training*
