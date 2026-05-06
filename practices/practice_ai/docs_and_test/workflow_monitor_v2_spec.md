# Workflow Intelligence Monitor (V2) - Technical Specification

## Overview
This document specifies the technical implementation of the enhanced Workflow Monitor (wf_02). The goal was to transform a basic list into a high-end "Intelligence Dashboard" that provides immediate visibility into critical workflow matters.

## Key Features
1. **Modern Intelligence Dashboard UI**:
   - **Aesthetics**: Indigo-to-Violet gradient headers, Outfit typography, and subtle box shadows.
   - **Summary Cards**: Real-time stats for total matters and critical pending nodes.
   - **Glassmorphism Elements**: Clean, translucent search cards and action containers.

2. **Smart List Logic**:
   - **Dynamic Highlighting**: Rows representing critical approval steps (e.g., `zzz_approve_01`) are highlighted in amber with a red flag icon.
   - **Deep Linking**: Matter IDs are rendered as clickable links targeting the workflow processing/viewing screen.

3. **Strategic Shortcuts**:
   - **Create New Application**: A direct button in the results header that opens the application form for the currently selected Flow ID, using the system switch content endpoint.

## UI Implementation Snippet (Modern Header)
```css
.imui-title {
  background: linear-gradient(135deg, #1e3a8a 0%, #312e81 100%);
  padding: 20px 25px !important;
  margin: 0 0 30px 0 !important;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

## Shortcuts Logic
```javascript
function onApplyNew() {
  var flowId = $("#searchFlowId").val();
  var url = 'im_workflow/common/switch/switch_content?' +
            'imwPageType=0' + // Application Mode
            '&imwFlowId=' + flowId +
            '&imwCallOriginalPagePath=dzu/practices/practice_wf/wf_02/wf_zzz_02';
  window.open(url, '_blank');
}
```

## Testing Status
- [x] Responsive layout validation.
- [x] RPC Data retrieval callback pattern.
- [x] Grid highlighting logic.
- [x] Application shortcut redirection.
