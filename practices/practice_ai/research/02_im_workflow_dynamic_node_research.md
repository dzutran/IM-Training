# IM-Workflow Dynamic Node Configuration Research (SSJS)

## 1. Overview
To configure dynamic and horizontal nodes during the `apply` process in Intra-mart IM-Workflow, specific structural objects must be injected into the `ApplyParamInfo` (passed as the `parameter` object in `action_process.js`).

## 2. Structural Requirements

### 2.1. ApplyParamInfo (Root Object)
The workflow engine looks for specific arrays within the `parameter` object:
- `DCNodeConfigModels`: `Array<DynamicAndCnfmNodeConfigInfo>` (for Dynamic nodes).
- `HVNodeConfigModels`: `Array<HorizontalAndVerticalNodeConfigInfo>` (for Horizontal/Vertical nodes).

### 2.2. Dynamic Node Configuration (zzz_dnm_01)
**Object Type:** `DynamicAndCnfmNodeConfigInfo`
- `nodeId`: `String` (The ID of the node in the flow definition, e.g., `"zzz_dnm_01"`).
- `processTargetConfigs`: `Array<PluginInfo>` (Array of plugins to set as process targets).

**PluginInfo structure:**
- `extensionPointId`: `"jp.co.intra_mart.workflow.plugin.authority.node.dynamic"`
- `pluginId`: `"jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user"`
- `parameter`: `String` (The User ID of the approver).

### 2.3. Horizontal Node Configuration (zzz_hrz_01)
**Object Type:** `HorizontalAndVerticalNodeConfigInfo`
- `nodeId`: `String` (The ID of the node in the flow definition, e.g., `"zzz_hrz_01"`).
- `matterNodeExpansions`: `Array<MatterNodeExpansionInfo>` (Array of node expansion definitions).

**MatterNodeExpansionInfo structure:**
- `nodeName`: `String` (Display name of the expanded node).
- `processTargetConfigModel`: `Array<PluginInfo>` (**Note:** Singular name `processTargetConfigModel` as per documentation).

### 2.4. Key Differences: JS (Backend) vs HTML (Frontend)
The property names and available flags differ between the SSJS API and the `imwNodeSetting` JSON.

| Feature | Backend (JS: `ApplyParamInfo`) | Frontend (HTML: `imwNodeSetting`) |
| :--- | :--- | :--- |
| **Top-level Keys** | `DCNodeConfigModels`, `HVNodeConfigModels` | `DCNodeSetting`, `HVNodeSetting` |
| **UI Flags** | **N/A** (Engine-only) | `displayFlag`, `enableFlag` |
| **Advanced Flags** | **N/A** | `searchConditionConfigurableFlag`, etc. |
| **HV Expansion** | `matterNodeExpansions` | `matterNodeExpansions` |
| **HV Target Key** | `processTargetConfigModel` (Singular) | `processTargetConfigModel` (Singular) |

## 3. Implementation in action_process.js
Instead of using `new` constructors (which may fail in SSJS if not properly imported), use plain JavaScript object literals to ensure structural compatibility.

### Correct Pattern for Dynamic Node:
```javascript
var dynamicPlugin = {
  extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
  pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
  parameter: "dev08"
};

var dynamicNode = {
  nodeId: "zzz_dnm_01",
  processTargetConfigs: [dynamicPlugin] // NOTE: processTargetConfigs
};

parameter.DCNodeConfigModels = [dynamicNode];
```

### Correct Pattern for Horizontal Node:
```javascript
var hrzPlugin = {
  extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
  pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
  parameter: "dev08"
};

var expansion = {
  nodeName: "Approval (dev08)",
  processTargetConfigModel: [hrzPlugin] // NOTE: processTargetConfigModel (singular)
};

var hrzNode = {
  nodeId: "zzz_hrz_01",
  matterNodeExpansions: [expansion]
};

parameter.HVNodeConfigModels = [hrzNode];
```

## 4. Troubleshooting
- **Property Names:** IM-Workflow APIs are case-sensitive and inconsistent (e.g., `processTargetConfigs` vs `processTargetConfigModel`). Always refer to the specific Info object documentation.
- **Node Configurable:** Ensure the node in the Workflow Designer has "Process Target Configurable" (処理対象者設定可能) checked.
- **Injection Point:** Inject objects into `parameter` within the `apply` function of the action script.

## 5. Workflow Execution (ApplyManager)

To programmatically execute a workflow application, use the `ApplyManager` class.

### 5.1. ApplyManager.apply Method
**Signature:**
```javascript
WorkflowResultInfo apply(ApplyParamInfo applyParam, Object userParam)
```

**Parameters:**
- **`applyParam`**: An `ApplyParamInfo` object containing the workflow configuration.
- **`userParam`**: A plain JavaScript object (key-value pairs) that will be passed to the Action Process scripts.

### 5.2. Page-Side Code Example
```javascript
function applyWorkflow() {
    var applyManager = new ApplyManager();
    
    // 1. Prepare ApplyParamInfo
    var applyParam = {
        flowId: "zzz_flow_01",
        applyExecuteUserCd: "dev01",
        applyAuthUserCd: "dev01",
        applyBaseDate: "2026/05/06",
        matterName: "Custom Applied Matter",
        
        // You can pre-configure dynamic nodes here if needed
        DCNodeConfigModels: [
            {
                nodeId: "zzz_dnm_01",
                processTargetConfigs: [
                    {
                        extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
                        pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
                        parameter: "dev08"
                    }
                ]
            }
        ]
    };

    // 2. Prepare User Data (passed to userParameter in action_process.js)
    var userParam = {
        leave_days: 10,
        leave_reason: "Research"
    };

    // 3. Execute Apply
    var result = applyManager.apply(applyParam, userParam);

    if (!result.error) {
        return "Applied successfully. Matter ID: " + result.data.systemMatterId;
    } else {
        return "Apply failed: " + result.message;
    }
}
```
