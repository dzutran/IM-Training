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
- **Plugin Recommendation**: Use the verified plugin `jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user` for dynamic authority.
- **Example Pattern**:
  ```javascript
  var nodeSetting = {
    "DCNodeSetting": {
      "node_id": {
        "displayFlag": false, 
        "processTargetConfigs": [{
          "extensionPointId": "...",
          "pluginId": "...",
          "parameter": "target_user"
        }]
      }
    }
  };
  ```

---
*Last Updated: 2026-05-07 by AI Research Agent*
