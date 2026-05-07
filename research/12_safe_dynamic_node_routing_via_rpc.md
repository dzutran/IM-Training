# Research Report 12: Safe Dynamic Node Routing via JSSP RPC

## Context
Standard Intra-mart workflow dynamic node routing often involves injecting a JSON string into the `imwNodeSetting` hidden input field on the client side. While functional, placing complex routing logic directly in the HTML script tag can be difficult to maintain and potentially insecure if the logic is sensitive.

## Objective
Implement a "Safer" pattern by centralizing node configuration logic in a server-side JSSP file and fetching the data via `jsspRpc`.

## Implementation Pattern

### 1. Server-Side Service (JSSP)
Create a service that takes business data and returns a structured `nodeSetting` object.
**Path**: `api/node_service.js`
```javascript
function getNodeSetting(data) {
  // Logic to calculate approvers and horizontal expansion
  var nodeSetting = { ... };
  return { type: 'getNodeSetting', data: nodeSetting, error: false };
}
```

### 2. Client-Side Integration (HTML)
Use the `<imart type="jsspRpc">` tag to call the service.
Since RPC is asynchronous, the workflow submission must be triggered in the callback.

```javascript
var pendingPageType = null;

function triggerNodeSettingRpc(pageType) {
  pendingPageType = pageType;
  NodeApi.getNodeSetting({ ... });
}

function nodeActionCB(res) {
  if (res.type === 'getNodeSetting') {
    // 1. Update hidden field
    $('#imwNodeSetting').val(ImJson.toJSONString(res.data));
    // 2. Submit workflow
    workflowOpenPage(pendingPageType);
  }
}
```

## Benefits
- **Centralization**: Logic is shared and easily testable.
- **Security**: Sensitive routing rules (e.g., salary-based approvers) are hidden from the browser source code.
- **Maintainability**: Cleaner HTML files with minimal JavaScript overhead.

## Gotchas
- **Async Nature**: You cannot simply call the RPC inside a standard `return true/false` validation function. You must handle the flow asynchronously via callbacks.
- **Performance**: Adds one additional network round-trip before the workflow page opens.

---
*Created by AI Agent following Project Rules - 2026-05-07*
