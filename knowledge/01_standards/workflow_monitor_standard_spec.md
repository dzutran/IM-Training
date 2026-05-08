# Workflow Monitor (Standard imui) - Technical Specification

## Overview
This document specifies the technical implementation of the Workflow Monitor (wf_02) compliant with standard Intra-mart UI (imui) guidelines. The objective is to ensure full integration and visual consistency with the platform's core modules.

## Key Features
1. **Standard imui Layout**:
   - **Header**: Standard `imui-title` with default black text on a neutral background.
   - **Containers**: Utilizes `imui-container-main` and `imui-form-container-wide` for consistent spacing and alignment.
   - **Fonts**: Uses browser-default system fonts managed by the imui framework.

2. **Search Logic (Standard Form)**:
   - Implemented using the `imui-form` table structure within a container.
   - Search buttons utilize the default `imuiButton` tag for consistent interaction feedback.

3. **Data Grid (imuiListTable)**:
   - **Highlighting**: Critical rows (e.g., pending at `zzz_approve_01`) use the standard `#fff0f0` light red background.
   - **Status Indicators**: Uses standard text-based indicators with optional standard IM icons (e.g., `🚩`).

4. **Shortcuts**:
   - **Create New Application**: Integrated into the `imui-operation-parts` area of the list header using a standard `imuiButton`.

## UI Implementation Snippet (Standard Container)
```html
<div class="imui-form-container-wide">
  <div class="imui-chapter-title">
    <h2>Search Condition</h2>
  </div>
  <table class="imui-form">
    <!-- Standard table structure -->
  </table>
</div>
```

## Shortcuts Logic (Standard imuiButton)
```html
<imart type="imuiButton" id="applyBtn" value="Apply New" 
       iconClass="im-ui-icon-common-16-edit" onclick="onApplyNew()" />
```

## Compliance Checklist
- [x] No custom external CSS (Gradients/Shadows).
- [x] Uses standard imui color palette.
- [x] Follows standard IM form and table spacing.
- [x] Integrated Return Path (imwCallOriginalPagePath) for navigation.
