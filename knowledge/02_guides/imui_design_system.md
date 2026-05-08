# Intra-mart UI (IMUI) Comprehensive Design System

This document is a unified reference for the Intra-mart Accel Platform UI CSS standards, based on the [official documentation](https://api.intra-mart.jp/imui-css-doc/html/index.html).

---

## 1. Layout & Containers
Standardized containers to control page structure and width.

### Containers
- `.imui-form-container`: Standard width (75%). Best for regular forms.
- `.imui-form-container-narrow`: Narrow width (60%). Best for simple dialogs.
- `.imui-form-container-wide`: Wide width (90%). Best for large tables/grids.

### Headings & Titles
- `.imui-title`: Main page title (usually `<h1>`).
- `.imui-chapter-title`: Section title (usually `<h2>`).
- `.imui-section-title`: Sub-section title (usually `<h3>`).

### Toolbars
- `.imui-toolbar-wrap`: Root container for toolbars.
- `.imui-list-toolbar`: Left-aligned actions.
- `.imui-list-toolbar-utility`: Right-aligned utilities (Refresh, Search, etc.).

---

## 2. Form Elements
Standard patterns for user input and labels.

### Labels
- `.imui-required`: Adds the mandatory red asterisk (`*`) to a `<label>`.

### Input States
- `.imui-text-readonly`: Styles inputs as plain text (removes borders/background).
- `.imui-selection-effect`: Visual highlight for selected/active inputs.

### Table Forms
Used for laying out labels and inputs in a grid.
- `.imui-form`: The standard class for form-layout tables.
- `<th>`: Label side (usually right-aligned).
- `<td>`: Input side.

---

## 3. Buttons (Full Guide)
Comprehensive standards for action triggers.

### Types & HTML
- **Input**: `<input type="button" class="imui-button">` (Simple text).
- **Button**: `<button class="imui-button"><span></span> Text</button>` (With Icons).
- **Link**: `<a href="#" class="imui-button">Link</a>` (Navigation).

### Sizes
- `.imui-large-button`: Primary actions (30px height).
- `.imui-medium-button`: Secondary actions (26px height).
- `.imui-small-button`: Compact actions (22px height).
- `.imui-button`: Default form height (20px height).

### States & Layout
- `.imui-running-button`: Active state (often used with a loading spinner).
- `.imui-disabled-button` + `disabled="disabled"`: Inactive state.
- `.imui-operation-parts`: Container for action buttons at the bottom of a form.

---

## 4. Tables & Data Display
Standardized data presentation.

- `.imui-table`: Basic data table with borders.
- `.imui-table-sort`: Table with sortable headers.
- `tr.even`: Use this class for alternate row coloring (zebra-striping).
- `.imui-ascending-order` / `.imui-descending-order`: Sort indicators (△/▽).

---

## 5. Status Boxes (Messages)
Standardized feedback containers for users.

- `.imui-box-success`: Success messages (Green).
- `.imui-box-information`: Info/Notice (Grey/Blue).
- `.imui-box-warning`: Warning/Alert (Yellow/Orange).
- `.imui-box-caution`: Error/Critical (Red).
- `.imui-operation-box`: Box describing specific operations.

---

## 6. Icons
IMUI icons follow a strict naming convention.

- **Convention**: `.im-ui-icon-{category}-{size}-{name}`.
- **Common Icons (16px)**:
  - `.im-ui-icon-common-16-search`
  - `.im-ui-icon-common-16-plus`
  - `.im-ui-icon-common-16-trashbox`
  - `.im-ui-icon-common-16-refresh`
  - `.im-ui-icon-common-16-back`

---

## 7. Utility & Assist Classes
Rapid styling classes for fine-tuning.

### Spacing (Margin/Padding)
- `.mt-10`, `.mb-5`, `.ml-20`: Margin Top/Bottom/Left.
- `.pt-10`, `.pb-5`, `.pl-20`: Padding Top/Bottom/Left.

### Alignment
- **Text**: `.align-L`, `.align-C`, `.align-R`.
- **Float**: `.float-L`, `.float-R`, `.cf` (Clearfix).
- **Vertical**: `.valign-T`, `.valign-M`, `.valign-B`.

### Widths & Display
- **Percentage**: `.wd-10`, `.wd-50`, `.wd-100`.
- **Fixed**: `.wd-50px`, `.wd-200px`.
- **Text**: `.break-all`, `.nowrap`.

---
*Created: 2026-05-08 | Comprehensive Standard v1.0 | Source: Intra-mart IMUI CSS Documentation*
