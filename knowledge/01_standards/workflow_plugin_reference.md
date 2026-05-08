# IM-Workflow Plugin Quick Reference
This document provides a structured reference for standard Intra-mart Workflow plugins, categorized by Node Types and Extension Points.

---

## 1. Node Types & Extension Points
Each type of node in a workflow uses a specific Extension Point to determine its "Process Targets" (who can act on it).

| Node Category | Extension Point ID | Main Purpose |
| :--- | :--- | :--- |
| **Application Node** | `jp.co.intra_mart.workflow.plugin.authority.node.apply` | Defines who has permission to **start** the workflow. |
| **Approval Node** | `jp.co.intra_mart.workflow.plugin.authority.node.approve.static` | Standard approver settings defined in the Flow Designer. |
| **Dynamic Node** | `jp.co.intra_mart.workflow.plugin.authority.node.dynamic` | Approver settings that can be **overridden** at runtime (via code). |
| **Expansion Node** | `jp.co.intra_mart.workflow.plugin.authority.node.dynamic` | Used for Horizontal (HV) and Vertical (VV) expansion. |

---

## 2. Common Plugin IDs (Across all Nodes)
While Extension Points differ, the Plugin IDs often follow a consistent naming convention.

| Target Type | Plugin ID suffix | Description |
| :--- | :--- | :--- |
| **User** | `.user` | A specific individual. |
| **Organization** | `.organization` | All members of a department. |
| **Org & Post** | `.org_post` | Members of a department holding a specific post. |
| **Public Group** | `.public_group` | Members of a specific public group. |
| **Role** | `.role` | All users assigned to a specific system role. |
| **User Group** | `.user_group` | Users belonging to a specific user group. |
| **Superior** | `.superior` | Direct manager(s) of the applier or previous approver. |

---

## 3. Plugin Parameter Formats
Precise formatting is required for the `parameter` field. **Pipe (`|`)** is the standard delimiter.

| Plugin Type | Parameter Format (`parameter`) | Example |
| :--- | :--- | :--- |
| **User** | `user_cd` | `aoyagi` |
| **Organization** | `company_cd|org_cd` | `comp_sample_01|dept_sample_10` |
| **Org & Post** | `company_cd|org_cd|post_cd` | `comp_sample_01|dept_sample_10|ps001` |
| **Public Group** | `group_set_cd|group_cd` | `sample_group_set|sample_group` |
| **Role** | `role_id` | `im_workflow_user` |
| **User Group** | `user_group_cd` | `sample_user_group` |
| **Superior** | `offset` (Optional) | `1` (Direct manager) |

---

## 4. JSON Configuration Snippets (DC/HV)
When overriding via `imwNodeSetting` (JSSP RPC), use these structures:

### 4.1. DCNodeSetting (Override existing node)
```json
"DCNodeSetting": {
  "node_id": {
    "displayFlag": false,
    "processTargetConfigs": [{
      "extensionPointId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
      "pluginId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
      "parameter": "user_cd"
    }]
  }
}
```

### 4.2. HVNodeSetting (Expansion Node)
```json
"HVNodeSetting": {
  "node_id": {
    "matterNodeExpansions": [{
      "nodeName": "Dynamic Approver",
      "processTargetConfigModel": [{
        "extensionPointId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
        "pluginId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
        "parameter": "user_cd"
      }]
    }]
  }
}
```

---
*Last Updated: 2026-05-07 by AI Research Agent based on Official Specification V8.0+*
