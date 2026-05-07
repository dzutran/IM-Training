# IM-Workflow Programming Best Practices

## Overview
Based on the V7.2 Programming Guide, this document outlines practical rules and patterns for robust workflow implementation in the Intra-mart Accel Platform.

**Full Documentation**: [IM-Workflow Programming Guide V7.2 (PDF)](https://download.intra-mart.jp/product/v72_doc/im_workflow_en/development/im_workflow_prog_guide_v72_en.pdf)

## 1. Parameter Handling Rules
- **DO NOT** modify parameters prefixed with `imw` inside your handlers. These are reserved for the system.
- **Use for Routing**: Leverage `imwNodeId` to implement conditional business logic (e.g., specific validation only at the "Department Manager" node).
- **Return Paths**: Always include `imwCallOriginalPagePath` when navigating between lists and workflow screens to ensure a smooth user experience. (Format: `folder/subfolder/file_name` without `view/` or extension).
  - *Example*: `training/dzu/practices/practice_wf/wf_02/wf_zzz_02`

## 2. Data Synchronization (Action Handlers)
- **Primary Rule**: Critical application data updates must happen during the **Action Processing** phase.
- **Why**: This ensures the data is saved *before* the matter moves to the next node or completes.
- **Standard Pattern**:
  ```javascript
  function approve(parameter, userParameter) {
    // 1. Update your custom application table using parameter.imwUserDataId
    // 2. Perform any side effects (e.g., logging, status updates)
    // 3. Return { resultFlag: true } to proceed
  }
  ```

## 3. UI and Redirection
- **Standard Linkage**: Use `<imart type="workflowOpenPage">` when building custom lists to ensure all necessary `imw` parameters are correctly passed to the target screen.
- **Direct Reference**: For non-actionable links (e.g., in emails), use the path:
  `im_workflow/user/reference/reference_direct/[systemMatterId]`

## 4. Querying and Performance
- **Active Task Checks**: When building dashboards, query `imw_t_actv_task` to identify who is currently responsible for a matter.
- **Indexing**: Ensure your application table has an index on the `user_data_id` column for fast lookups during workflow processing.

## 5. Security and Permissions
- **Authorization**: Always verify that the `imwAuthUserCode` matches the expected permissions for the current `imwNodeId` if you are implementing custom security checks within your logic.
- **System Tasks**: Be aware of "System Nodes" or "Auto-passes" where logic might be executed without a manual user action.

## 6. Testing Checklist
- [ ] Verify `userDataId` mapping is consistent.
- [ ] Test "Back" button behavior (Return Path).
- [ ] Validate data rollback in case of an approval failure.
- [ ] Check if email links correctly open the Reference Screen.

## 7. Dynamic Node Routing (Custom Screens)
- **Primary Mechanism**: Use `imwNodeSetting` (JSON string) in the HTML form to override workflow routing dynamically.
- **Why**: It is the only standard way to hide the node selection UI and assign approvers programmatically without using unstable Java-level thread injection.
- **Plugin Recommendation**:
  - **User**: `jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user` (Parameter: `user_cd`)
  - **Organization**: `jp.co.intra_mart.workflow.plugin.authority.node.dynamic.organization` (Parameter: `company_cd|org_cd`)
  - **Role**: `jp.co.intra_mart.workflow.plugin.authority.node.dynamic.role` (Parameter: `role_id`)
- **Example Pattern**:
  ```javascript
  var nodeSetting = {
    "DCNodeSetting": {
      "node_id": {
        "displayFlag": false, 
        "processTargetConfigs": [{
          "extensionPointId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
          "pluginId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
          "parameter": "target_user"
        }]
      }
    }
  };
  ```

## 8. Standardized Workflow Validation
To ensure custom "zzz" error messages are correctly displayed and to avoid collision with system-default validation, follow this architecture:

### 8.1. Validator Configuration (SSJS)
- **Rules Only**: The validator file should only export a `rules` object. DO NOT include a `messages` property here, as the system tends to overwrite it with defaults.
- **Path**: `training/dzu/practices/practice_wf/wf_01/wf_zzz_01_validator`
- **Example**:
  ```javascript
  var rules = {
    'leave_days': { required: true, numeric: true, maxThirty: true }
  };
  ```

### 8.2. Custom Rule Registration (CSJS/HTML)
- **Direct Registration**: Register custom rules using `imuiAddValidationRule` directly inside the `<script>` tag of your HTML file. This avoids extra file requests and keeps logic localized.
- **Prefixing**: Always use a unique prefix (e.g., `zzz`) for custom error messages to differentiate them from system defaults.
- **Example**:
  ```javascript
  imuiAddValidationRule('maxThirty', function(val, el, param) {
    if (val === '') return true;
    return parseFloat(val) <= 30;
  }, 'zzz You cannot apply for more than 30 days!');
  ```

### 8.3. Tag Mapping (HTML)
- **Variable Isolation**: Use distinct variable names for `rulesName` and `messagesName` within the `<imart type="imuiValidationRule">` tag.
- **Call Pattern**: Pass these variables directly to `imuiValidate`.
- **Example**:
  ```html
  <imart type="imuiValidationRule" rule="path/to/validator#rules" 
         rulesName="rules" messagesName="messages" />
  <script>
    function validateStandard() {
      return imuiValidate('#formId', rules, messages);
    }
  </script>
  ```

## 9. Node Expansion (HV)
Based on the documentation, the `HVNodeSetting` key handles both **Horizontal** and **Vertical** expansion.

### 9.1. Usage Patterns
- **Horizontal Expansion**: Adding multiple parallel approvers to the current node.
- **Vertical Expansion**: Adding additional sequential nodes after the current node.
- **Structure**: Use `HVNodeSetting` and define `matterNodeExpansions` for either scenario.
- **Extension Point**: `jp.co.intra_mart.workflow.plugin.authority.node.dynamic` (Unified for all process targets).

### 9.2. Plugin Parameter Formats (Standard)
| Plugin Type | Plugin ID suffix | Parameter Format |
| :--- | :--- | :--- |
| **User** | `.user` | `user_cd` |
| **Organization** | `.organization` | `company_cd\|org_cd` |
| **Public Group** | `.public_group` | `group_set_cd\|group_cd` |
| **Role** | `.role` | `role_id` |

### 9.3. Summary of Configuration Keys
| Setting Type | JSON Key | Extension Point ID (Unified) |
| :--- | :--- | :--- |
| **Dynamic** | `DCNodeSetting` | `...node.dynamic` |
| **Expansion (HV/VV)** | `HVNodeSetting` | `...node.dynamic` |

---
*Last Updated: 2026-05-07 by AI Research Agent*
