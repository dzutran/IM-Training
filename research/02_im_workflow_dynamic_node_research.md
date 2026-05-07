# IM-Workflow Dynamic Node Configuration Research (SSJS)

## 1. Overview
To configure dynamic and horizontal nodes during the `apply` process in Intra-mart IM-Workflow, specific structural objects must be injected. While JSSP injection is possible, the **Frontend (HTML) JSON Injection** is the standard and most robust method for custom screens.

## 2. Structural Requirements (Frontend imwNodeSetting)

### 2.1. Dynamic Node Configuration (zzz_dnm_01)
**Key:** `DCNodeSetting`
- `nodeId`: The ID of the node.
- `displayFlag`: `Boolean` (Set `false` to hide selection UI).
- `enableFlag`: `Boolean`.
- `processTargetConfigs`: `Array<PluginInfo>` (The actual approvers).

### 2.2. Horizontal Node Configuration (zzz_hrz_01)
**Key:** `HVNodeSetting`
- `nodeId`: The ID of the node.
- `matterNodeExpansions`: `Array<MatterNodeExpansionInfo>`.

## 3. Recommended Implementation (Standard Pattern)
The most robust way to set dynamic nodes in a custom screen is to use the `imwNodeSetting` parameter in the HTML form.

**Plugin Configuration:**
- `extensionPointId`: `jp.co.intra_mart.workflow.plugin.authority.node.dynamic`
- `pluginId`: `jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user` (Verified for this environment)

**JSON Structure Example:**
```javascript
{
  "DCNodeSetting": {
    "zzz_dnm_01": {
      "displayFlag": false,
      "enableFlag": true,
      "processTargetConfigs": [{
        "extensionPointId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
        "pluginId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
        "parameter": "user_code"
      }]
    }
  }
}
```

## 4. Troubleshooting
- **Plugin ID**: Ensure the `pluginId` matches the environment (e.g., `node.dynamic.user` vs `standard.user`).
- **Hidden Input**: Ensure `imwNodeSetting` is a hidden input field within the `workflowOpenPageForm`.
- **Timing**: Call the JSON building function (e.g., `setNodeDisplayFlags`) just before `workflowOpenPage()`.

---
*Last Updated: 2026-05-07 by AI Research Agent*
