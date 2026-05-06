# Intra-mart Workflow Scripting Guide

This guide covers advanced scripting for IM-Workflow, focusing on dynamic node control and server-side logic hooks.

## 1. Action Process Hooks
Action processes are SSJS files that execute during workflow events (apply, approve, etc.).

### 1.1. Key Functions
- `apply(parameter, userParameter)`: Executed during application.
- `approve(parameter, userParameter)`: Executed during approval.
- `tempSaveCreate(parameter, userParameter)`: Executed during temporary save creation.

### 1.2. The `parameter` (ApplyParamInfo)
The `parameter` object is the most critical argument. Modifying it allows you to control the workflow engine's behavior.

**Robust Node Configuration Pattern:**
Always set both the standard IAP (nested) and the SSJS fallback (flat) properties to ensure cross-version compatibility.

```javascript
function apply(parameter, userParameter) {
    var dynamicNode = {
        nodeId: "zzz_dnm_01",
        // Nested structure
        processTargetConfigs: [{
            extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
            pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
            parameter: "dev08"
        }],
        // Flat structure fallback
        pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
        parameter: "dev08"
    };
    
    parameter.DCNodeConfigModels = [dynamicNode];
    return { resultFlag: true };
}
```

## 2. UI-Side Node Control (imwNodeSetting)
If server-side logic fails or is restricted, use the `imwNodeSetting` JSON in the HTML form.

### 2.1. Structural Rules
- **DCNodeSetting**: For dynamic nodes.
- **HVNodeSetting**: For horizontal/vertical nodes.

### 2.2. Configuration Flags
| Flag | Description |
| :--- | :--- |
| `displayFlag` | `false` to hide the node from the user in the "Flow Settings" tab. |
| `enableFlag` | `true` to enable the dynamic setting. |

```javascript
var nodeSetting = {
    "DCNodeSetting": {
        "node_id": {
            "displayFlag": false,
            "enableFlag": true,
            "processTargetConfigs": [ { "pluginId": "...", "parameter": "..." } ]
        }
    }
};
```

## 3. Best Practices
1.  **Atomicity**: Always perform business data saving (DB operations) inside the workflow hooks to ensure data consistency with the workflow state.
2.  **Validation**: Perform UI-side validation before calling `workflowOpenPage`.
3.  **Logging**: Use `Debug.console()` to inspect the `parameter` object during development.

---
*Last Updated: 2026-05-06 by AI Research Agent*
