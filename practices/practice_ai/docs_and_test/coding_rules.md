# Coding Rules & Standards (practice_ai)

## 1. Project Structure
*   **View (`.html`, `.js`)**: Only contains UI logic and RPC calls.
*   **RPC Gateway (`api/*.js`)**: Single entry point for client requests. Maps client data to common logic.
*   **Business Logic (`common.js`)**: All database operations and data mapping.
*   **SQL Templates (`sql/*.sql`)**: Separated SQL files using 2waySQL syntax.

## 2. Naming Conventions
*   **JavaScript**: `camelCase` for functions and variables (e.g., `refreshTable`, `userActionCB`).
*   **Database/SQL**: `snake_case` for table names and columns (e.g., `user_id`, `user_name`).
*   **RPC Types**: Use clear strings for response types (e.g., `getUsers`, `saveUser`).

## 3. RPC Communication Pattern
*   **Centralized Callback**: Always use a single callback function for `jsspRpc`.
*   **Response Structure**: Every RPC response MUST return an object with a `type` property.
    ```javascript
    return { type: 'actionName', data: result, error: false };
    ```
*   **Error Handling**: Standardize error reporting using `error` and `errorMessage` keys.

## 4. Database & SQL Rules
*   **Template Based**: Never hardcode SQL in JS. Use `db.executeByTemplate()`.
*   **2waySQL**: Use `/*IF*/`, `/*BEGIN*/`, and `/*keyword*/` comments to make SQL dynamic and testable in DB clients.
*   **Binding**: Always use `DbParameter` for binding values to prevent SQL Injection.

## 5. UI & imui Components
*   **Tags**: Prefer `imui` standard tags (`imuiTextbox`, `imuiButton`).
*   **ListTable Icons**: To show icons in `imuiListTable`, the column `name` MUST exist in the JSON data (even as an empty string).
*   **Tag Syntax**: Avoid whitespace between `<col>` and `<showIcon />` to ensure correct JSSP parsing.
*   **SPA Logic**: Use `imuiDialog` for Add/Edit instead of navigating to new pages.

## 6. Testing Requirements
*   Every feature must have a corresponding test case in `test_cases.md`.
*   Complex UI flows should be automated using Playwright.
