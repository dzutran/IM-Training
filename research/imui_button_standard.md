# Intra-mart UI (IMUI) Button Standards

This document summarizes the official CSS and HTML standards for buttons in the Intra-mart Accel Platform, based on the [official documentation](https://api.intra-mart.jp/imui-css-doc/html/button.html).

## 1. Basic HTML Structure
Depending on the use case, buttons can be implemented using different HTML tags.

### Input Tag (Standard)
Best for simple form buttons without icons.
```html
<input type="button" value="Normal Button" class="imui-button">
<input type="submit" value="Submit Button" class="imui-button">
```

### Button Tag (Recommended for Icons)
Required when you need to embed an icon `<span>`.
```html
<button type="button" class="imui-button">
  <span class="im-ui-icon-common-16-search"></span> Search
</button>
```

### Anchor Tag (Link Buttons)
Used when a button should function as a direct link.
```html
<a href="target_url" class="imui-button">Go to Page</a>
```

---

## 2. Size Variations
Always use the appropriate size class to maintain UI consistency.

| Class Name | Description | Height (approx.) |
| :--- | :--- | :--- |
| `.imui-button` | Default form height (matches text inputs) | 20px |
| `.imui-small-button` | Compact size for dense layouts | 22px |
| `.imui-medium-button` | Standard operation button | 26px |
| `.imui-large-button` | Primary actions / Prominent buttons | 30px |

---

## 3. Button States
Control the visual state of buttons using these additional classes.

### Running State (Active)
Used to indicate a process is in progress (e.g., after a click).
```html
<input type="button" value="Processing..." class="imui-button imui-running-button">
```

### Disabled State
Used to prevent interaction. Must include both the CSS class and the `disabled` attribute.
```html
<input type="button" value="Save" class="imui-button imui-disabled-button" disabled="disabled">
```

---

## 4. Icon Integration
Icons should be 16x16px (standard `im-ui-icon-common-16-*`).

### Left Icon (Default)
```html
<button class="imui-medium-button">
  <span class="im-ui-icon-common-16-update"></span> Update
</button>
```

### Right Icon
```html
<button class="imui-medium-button">
  Next <span class="im-ui-icon-common-16-arrow-right"></span>
</button>
```

---

## 5. Layout Containers
Use the `.imui-operation-parts` container to align buttons (usually at the bottom of a form).

```html
<div class="imui-operation-parts">
  <input type="button" value="Back" class="imui-button">
  <input type="submit" value="Apply" class="imui-button imui-running-button">
</div>
```

---
*Documented on: 2026-05-08 | Source: Intra-mart IMUI CSS Documentation*
