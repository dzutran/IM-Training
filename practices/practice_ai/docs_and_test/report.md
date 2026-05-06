# Report: User Management Module (practice_ai)

## 1. Objective
Refactor and standardize the "practice_ai" module into a professional, robust, and high-performance CRUD application following Intra-mart Accel Platform best practices.

## 2. Architecture & Technical Patterns
*   **SPA (Single Page Application)**: All CRUD operations happen on one screen using `imuiDialog`, avoiding page reloads.
*   **Centralized Callback Pattern**: Implemented a single callback function (`userActionCB`) to handle all RPC responses, ensuring clean UI state management.
*   **JSSP RPC**: Asynchronous communication between Client (HTML/JS) and Server (JS/Common).
*   **2waySQL**: Used for dynamic and safe SQL execution with `/*IF*/`, `/*BEGIN*/`, and bind parameters.
*   **Data Access Layer (DAL)**: Centralized logic in `common.js` to ensure consistent data structures and error handling.

## 3. Features Implemented
*   **List Table**: Advanced `imuiListTable` (jqGrid) with sorting, paging, and custom icon columns.
*   **Search LIKE**: Dynamic filtering by User Name or Email using 2waySQL logic.
*   **Add User**: Pop-up dialog with required field validation.
*   **Edit User**: Inline row data extraction and update via RPC.
*   **Delete User**: Integrated `imuiConfirm` for native safety checks.
*   **Icon Rendering**: Dynamic mapping of DB results to include action column keys.

## 4. Components Used
*   `imuiListTable`
*   `imuiDialog`
*   `imuiButton`, `imuiTextbox`, `imuiTextArea`
*   `imuiConfirm`, `imuiShowSuccessMessage`, `imuiShowErrorMessage`
*   `jsspRpc`
