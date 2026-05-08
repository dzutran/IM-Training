# Intra-mart Form Validation Guide (imuiValidation)

This guide covers how to implement professional client-side and server-side validation using standard Intra-mart UI components.

---

## 1. Core Concept
Intra-mart provides a declarative way to validate forms. You define rules in JSSP/Validator files, and the system handles error message display and UI highlighting automatically.

### Key Components:
*   `<imart type="imuiValidationRule">`: Binds rules and messages from a validator file to the UI.
*   `imuiValidate('#formId', rules, messages)`: Client-side JS function to trigger validation.
*   `imuiAddValidationRule(name, func, msg)`: API to register custom client-side rules.
*   `imuiResetForm('#formId')`: Resets the validation state (clears highlights/messages).

---

## 2. Standard Validation Rules (Reference)

| Rule | Description | Example |
| :--- | :--- | :--- |
| `required` | Field is mandatory. | `required: true` |
| `email` | Must be a valid email format. | `email: true` |
| `alphanumeric`| Letters and numbers only. | `alphanumeric: true` |
| `digits` | Max digits for integer/decimal parts. | `digits: [5, 2]` |
| `maxlength` | Maximum character length. | `maxlength: 100` |
| `regex` | Custom regular expression. | `regex: /^[A-Z]+$/` |

---

## 3. Custom Validator Implementation (High-End)

To create a custom rule (e.g., `notSecret`):

### A. Client-Side (HTML/JS)
```javascript
var customFunc = function(value, element, param) {
    if (value === '') return true; // Allow empty if not 'required'
    return value.toLowerCase().indexOf('secret') === -1;
};

imuiAddValidationRule('notSecret', customFunc, 'Cannot contain secret!');
```

### B. Validator File (`*_validator.js`)
Simply add the rule name to the field's object.
```javascript
var rules = {
    'reason': { caption: 'Reason', notSecret: true }
};
```

---

## 4. Server-Side Integration (JSSP)

Annotate your function to enable server-side validation:
```javascript
/**
 * @validate path/to/validator#rules
 * @onerror handleErrors
 */
function action(request) { ... }
```

In `handleErrors`, use `validationErrors.getMessages()` to get the error list.

---

## 5. Design Guidelines
*   **Double Submission**: Always use `imuiDisableOnSubmit('#formId')`.
*   **Success Feedback**: Use `imuiResetForm` after successful AJAX/RPC to clear validation UI.
