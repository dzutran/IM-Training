# IM-Workflow Scripting & Customization Guide

This guide covers advanced techniques for controlling Intra-mart workflows through Server-side JavaScript (JSSP).

---

## 1. Dynamic Operator Setting Patterns

### A. Dynamic Node (Who approves)
*   **Purpose**: To specify the approver for a node that is marked as "Dynamic" in the Designer.
*   **Key Class**: `ConfigDynamicNodeToProcessInfo`
*   **Docs**: [ConfigDynamicNodeToProcessInfo API](https://api.intra-mart.jp/iap/apilist-ssjs/doc/im_workflow/ConfigDynamicNodeToProcessInfo/index.html)
*   **Example**:
```javascript
var dynamicNode = new ConfigDynamicNodeToProcessInfo();
dynamicNode.nodeId = "node_id";
dynamicNode.setProcessTargetConfigs([{ pluginId: "...", parameter: "user_001" }]);
```

### B. Expansion Node (Horizontal/Vertical)
*   **Purpose**: To multiply 1 node into many (Parallel/Sequential).
*   **Key Class**: `HorizontalAndVerticalNodeConfigInfo`
*   **Docs**: [HorizontalAndVerticalNodeConfigInfo API](https://api.intra-mart.jp/iap/apilist-ssjs/doc/im_workflow/HorizontalAndVerticalNodeConfigInfo/index.html)
*   **Example**:
```javascript
var nodeConfig = new HorizontalAndVerticalNodeConfigInfo();
nodeConfig.nodeId = "expansion_node";
nodeConfig.setOperatorType("0"); // 0: Horizontal
nodeConfig.setProcessTargetConfigs([...]);
```

### C. Confirmation Node (FYI)
*   **Purpose**: To specify who receives a notification after a step.
*   **Key Class**: `ConfigConfirmNodeToProcessInfo`
*   **Docs**: [ConfigConfirmNodeToProcessInfo API](https://api.intra-mart.jp/iap/apilist-ssjs/doc/im_workflow/ConfigConfirmNodeToProcessInfo/index.html)

---

## 2. Dynamic Logic via Plugins (The practice_wf Pattern)

### A. Dynamic Branching (Rule Condition)
Implemented via `execute(parameter)` in a Rule script. Returns `result.data = true` to take the branch.

### B. Authority Plugins
Implemented via `WorkflowAuthorityExecEventListener.js`. Dynamically calculates the approver list at runtime.

---

## 3. IM Plugin Development (Standardizing)

To register your JSSP scripts as official selectable plugins, use a `plugin.xml` file.

### Common Extension Points
*   **Authority**: `jp.co.intra_mart.workflow.plugin.authority.item`
*   **Action**: `jp.co.intra_mart.workflow.plugin.action.process`

### Sample `plugin.xml`
```xml
<plugin>
  <extension point="jp.co.intra_mart.workflow.plugin.authority.item">
    <item id="my_plugin" script="path/to/script" name="My Plugin" />
  </extension>
</plugin>
```

---

## 4. Setting Dynamic Nodes during Approval (Cookbook 110547)

In many business cases, a middle approver (not the applier) decides who the *next* dynamic node operator will be. This is handled during the **Approve** action.

### Implementation Pattern:
```javascript
var workflowManager = new WorkflowManager();

// 1. Define the next operator
var nextDynamicNode = new ConfigDynamicNodeToProcessInfo();
nextDynamicNode.nodeId = "next_dynamic_node_id";
nextDynamicNode.setProcessTargetConfigs([{ 
    pluginId: "jp.co.intra_mart.workflow.plugin.authority.user", 
    parameter: "manager_002" 
}]);

// 2. Approve and set the next person
var processParam = {
    systemMatterId: "...",
    userCode: "current_approver_code",
    nodeId: "current_node_id",
    status: "approve",
    // Set the dynamic node for the NEXT step
    dynamicNodeParameter: [nextDynamicNode]
};

var result = workflowManager.approve(processParam);
```
*   **Cookbook Reference**: [Cookbook 110547: Setting Dynamic Nodes via JS API](https://dev-portal.intra-mart.jp/cookbook/cookbook110547/)

---

## 5. Declarative Setting via User Data (`DCNodeSetting`)

Instead of calling Java/JS APIs, you can pass a specific JSON structure within your workflow user data. The system automatically parses these based on the key:

| Key Name | Target Node Type |
|:--- |:--- |
| **`DCNodeSetting`** | Dynamic Node |
| **`HVNodeSetting`** | Horizontal/Vertical Expansion Node |
| **`CSNodeSetting`** | Confirmation Node |

### JSON Examples:

#### 1. Dynamic Node (`DCNodeSetting`)
```json
{
  "DCNodeSetting": {
    "node_id": {
      "displayFlag": true,
      "processTargetConfigs": [{
        "extensionPointId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
        "pluginId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
        "parameter": "user_code"
      }]
    }
  }
}
```

#### 2. Expansion Node (`HVNodeSetting`)
```json
{
  "HVNodeSetting": {
    "node_id": {
      "displayFlag": true,
      "matterNodeExpansions": [
        {
          "nodeName": "Node Name 001",
          "processTargetConfigModel": [{
            "extensionPointId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
            "pluginId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
            "parameter": "user_01"
          }]
        },
        {
          "nodeName": "Node Name 002",
          "processTargetConfigModel": [{
            "extensionPointId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
            "pluginId": "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
            "parameter": "user_02"
          }]
        }
      ]
    }
  }
}
```

### Client-side (CSJS) Implementation:
You can dynamically inject these configurations into the standard Intra-mart workflow form by setting the `imwNodeSetting` hidden input:

```javascript
var nodeSetting = {
    DCNodeSetting: { /* ... */ },
    HVNodeSetting: { /* ... */ }
};
var nodeSettingJson = ImJson.toJSONString(nodeSetting);

if ($('input[name=imwNodeSetting]').length === 0) {
    $("#workflowOpenPageForm").append('<input type="hidden" name="imwNodeSetting" />');
}
$('input[name=imwNodeSetting]').val(nodeSettingJson);
```
*   **Reference**: [Customize Guide 24: User Data Parameters](https://document.intra-mart.jp/library/iap/public/im_workflow/im_workflow_programming_guide/texts/customize/dynamic_operator_setting/customize_guide_24.html)

---
## 4. Useful Links
*   [Overall Guide: Dynamic Operator Setting](https://document.intra-mart.jp/library/iap/public/im_workflow/im_workflow_programming_guide/texts/customize/dynamic_operator_setting/customize_guide_26.html)
*   [API List: WorkflowManager](https://api.intra-mart.jp/iap/apilist-ssjs/doc/im_workflow/WorkflowManager/index.html)

---
*Last Updated: 2026-05-05 by AI Research Agent*
