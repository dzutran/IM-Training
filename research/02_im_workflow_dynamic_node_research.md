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
- `nodeId`: `String` (The ID of the node in the flow definition).
- `processTargetConfigs`: `Array<PluginInfo>` (Array of plugins to set as process targets).

### 2.3. Horizontal Node Configuration (zzz_hrz_01)
**Object Type:** `HorizontalAndVerticalNodeConfigInfo`
- `nodeId`: `String` (The ID of the node in the flow definition).
- `matterNodeExpansions`: `Array<MatterNodeExpansionInfo>` (Array of node expansion definitions).

### 2.4. Key Differences: JS (Backend) vs HTML (Frontend)
| Feature | Backend (JS: `ApplyParamInfo`) | Frontend (HTML: `imwNodeSetting`) |
| :--- | :--- | :--- |
| **Top-level Keys** | `DCNodeConfigModels`, `HVNodeConfigModels` | `DCNodeSetting`, `HVNodeSetting` |
| **UI Flags** | **N/A** (Engine-only) | `displayFlag`, `enableFlag` |
| **HV Target Key** | `processTargetConfigModel` (Singular) | `processTargetConfigModel` (Singular) |

### 2.5. Robust Hybrid Structure (Recommended)
Due to inconsistencies across Intra-mart versions and SSJS/Java API interpretations, it is recommended to use a **Hybrid Structure** that includes both nested and flat properties.

**Node Object Properties:**
- `processTargetConfigs`: Array of `PluginInfo` (Standard IAP).
- `pluginId`: Flat property on node (Older/SSJS fallback).
- `extensionPointId`: Flat property on node.
- `parameter`: Flat property on node.
- `pluginParameter`: Alias for `parameter`.

**ApplyParamInfo Top-level Keys:**
- `DCNodeConfigModels`: Official camelCase key.
- `dynamicAndCnfmNodeConfigModels`: Lowercase alias used in some SSJS environments.

## 3. Implementation in action_process.js (Robust Version)
```javascript
  var dynamicNode = {
    nodeId: "zzz_dnm_01",
    // Nested (Newer API)
    processTargetConfigs: [{
      extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
      pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
      parameter: "dev08"
    }],
    // Flat (Older/SSJS API fallback)
    extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
    pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
    parameter: "dev08",
    pluginParameter: "dev08"
  };

  // Set both variants for safety
  parameter.DCNodeConfigModels = [dynamicNode];
  parameter.dynamicAndCnfmNodeConfigModels = [dynamicNode];
```

## 4. Troubleshooting
- **Property Names:** IM-Workflow APIs are case-sensitive and inconsistent. Always refer to the specific Info object documentation.
- **Node Configurable:** Ensure the node in the Workflow Designer has "Process Target Configurable" checked.
- **Injection Point:** Inject objects into `parameter` within the `apply` function of the action script.

---
*Last Updated: 2026-05-06 by AI Research Agent*
