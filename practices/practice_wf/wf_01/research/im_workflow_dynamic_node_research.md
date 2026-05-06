# IM-Workflow Dynamic Node Research Findings

This document summarizes the research on refactoring dynamic workflow node logic using standard Intra-mart SSJS APIs.

## 1. Core API Classes for Node Configuration

Instead of using plain JavaScript objects (JSON), Intra-mart provides structured classes to define node configurations.

### A. Dynamic & Confirm Nodes
- **Class**: `DynamicAndCnfmNodeConfigInfo`
- **Purpose**: Defines configuration for a single Dynamic Node or Confirmation Node.
- **Properties**:
    - `nodeId`: The ID of the node defined in the workflow designer.
    - `processTargetConfigs`: An array of `PluginInfo` objects defining the operators.

### B. Horizontal & Vertical Expansion Nodes
- **Class**: `HorizontalAndVerticalNodeConfigInfo`
- **Purpose**: Defines expansion configuration for Horizontal or Vertical nodes.
- **Properties**:
    - `nodeId`: The ID of the expansion node.
    - `matterNodeExpansions`: An array of `MatterNodeExpansionInfo` objects. Each element in the array represents one expanded node instance.

### C. Expanded Node Detail
- **Class**: `MatterNodeExpansionInfo`
- **Purpose**: Defines the details of a single node instance within an expansion.
- **Properties**:
    - `nodeName`: The name to be displayed for this specific expanded node.
    - `processTargetConfigs`: An array of `PluginInfo` objects for this specific node instance.

### D. Operator Plugin Information
- **Class**: `PluginInfo`
- **Purpose**: Defines how an operator is identified (e.g., by User Code).
- **Properties**:
    - `extensionPointId`: Usually `jp.co.intra_mart.workflow.plugin.authority.user` for specific users.
    - `pluginId`: Usually the same as `extensionPointId`.
    - `parameter`: The unique identifier for the plugin (e.g., "aoyagi").

## 2. Integration with ApplyManager

When applying or approving a matter, these configuration models are passed via `ApplyParamInfo` or `ApproveParamInfo`.

### ApplyParamInfo Structure
- `DCNodeConfigModels`: `Array<DynamicAndCnfmNodeConfigInfo>`
- `HVNodeConfigModels`: `Array<HorizontalAndVerticalNodeConfigInfo>`

### Retrieving Current Config
- `ApplyManager.getConfigSetToApply(flowId, applyBaseDate)`: Returns a `NodeConfigSetToApplyInfo` object containing the current workflow configuration.

## 3. Usage in Action Process (action_process.js)

In the "Action Process" script, the `parameter` object (ActionProcessParameterInfo) is used to pass these configurations back to the workflow engine.

- **Hook**: `parameter.dynamicNodeParameter`
- **Value**: An array containing both `DynamicAndCnfmNodeConfigInfo` and `HorizontalAndVerticalNodeConfigInfo` objects.

---
*Research conducted by AI Agent on 2026-05-06*
