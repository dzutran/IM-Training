# Intra-mart Form Validation Guide (imuiValidation)

This guide covers how to implement professional client-side validation using standard Intra-mart UI components.

---

## 1. Core Concept
Intra-mart provides a declarative way to validate forms. You define rules in JSSP tags, and the system handles error message display and UI highlighting automatically.

### Key Components:
*   `<imart type="imuiValidationRule">`: Defines rules for each field.
*   `imuiValidate('#formId', rules, messages)`: JS function to trigger validation.
*   `imuiAddValidationRule()`: Function to add custom validation logic.

---

## 2. Implementation Pattern

### A. Define Rules in HTML/JSSP
Use the `imuiValidationRule` tag to link a field name to specific constraints.

```html
<imart type="imuiValidationRule" name="user_id" rules='["required", "alphanumeric"]' />
<imart type="imuiValidationRule" name="email" rules='["required", "email"]' />
<imart type="imuiValidationRule" name="notes" rules='["maxLength[200]"]' />
```

### B. Trigger Validation in JS
In your `doSave` function, call `imuiValidate`.

```javascript
function doSave() {
  // 1. Check validation
  if (!imuiValidate('#userForm')) {
    return; // Stop if validation fails
  }
  
  // 2. Proceed with RPC
  var user = { ... };
  UserApi.saveUser(user);
}
```

### C. Custom Validation Rules
If you need a special check (e.g., "Must start with ZZZ"):

```javascript
// Add custom rule
imuiAddValidationRule('startWithZZZ', function(value, element, params) {
  return value.indexOf('ZZZ') === 0;
}, 'Field must start with ZZZ');

// Use it in JSSP
// <imart type="imuiValidationRule" name="myField" rules='["startWithZZZ"]' />
```

---

## 3. Useful Links
*   [imuiValidationRule Tag Reference](https://api.intra-mart.jp/iap/apilist-jssp-tagdoc/doc/pc/imuiValidationRule/index.html)
*   [imuiAddValidationRule JSDoc](https://api.intra-mart.jp/iap/jsdoc/symbols/_global_.html#imuiAddValidationRule)
*   [Error Handling Design Guidelines](https://document.intra-mart.jp/library/iap/public/im_ui/im_design_guideline_pc/texts/error/index.html)

---
*Last Updated: 2026-05-06 by AI Research Agent*
