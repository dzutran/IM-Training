# Research 07: Workflow Email Notification Patterns

## Context
Workflow notifications are critical for system adoption. This research analyzes the technical patterns for delivering effective, deep-linked notifications in the Intra-mart Accel Platform.

## Core Findings

### 1. The Multi-part/Alternative Pattern
Email clients vary significantly (Desktop Outlook, Mobile Apps, Browser). Sending only HTML is risky.
- **Pattern**: Always define both a plain text body (`setText`) and an HTML body (`setHTML`).
- **Standard**: The plain text version should contain the raw URL, while the HTML version uses a stylized anchor tag.

### 2. Deep-Linking Strategy (Direct Reference)
Intra-mart provides multiple ways to link to a matter.
- **Pattern A (Switch Content)**: Flexible but requires many parameters (`systemMatterId`, `userDataId`, `nodeId`, `flowId`, `pageType`).
- **Pattern B (Direct Reference)**: `im_workflow/user/reference/reference_direct/[ID]`.
- **Verdict**: Pattern B is superior for notifications as it is cleaner, harder to break, and automatically handles user permissions and redirection to the detail screen.

### 3. Data Contextualization
A notification that just says "You have a new task" is insufficient.
- **Finding**: Notifications must include business data (e.g., "Reason: Personal Leave", "Days: 5") to allow the user to prioritize without opening the app.
- **Implementation**: Fetching the `userData` in the `action_process.js` (approval step) ensures the email recipient sees what the applicant originally submitted.

### 4. HTML Compatibility in Emails
Email HTML is not standard Web HTML.
- **Pattern**: Use inline CSS exclusively. Avoid `<style>` blocks in the `<head>` for maximum compatibility with Gmail/Outlook.
- **Layout**: Use simple `<div>` containers or `<table>` for layout. Flexbox support is inconsistent in older Outlook versions.

## Technical Gotchas
- **Case Sensitivity**: The `MailSender` method is `setHTML()` in modern IAP versions.
- **Protocol**: Always ensure the protocol (`http` vs `https`) and port match the production environment in the generated links.
- **HTML Wrapping**: According to IAP documentation, HTML strings should ideally be wrapped in `<html><body>...</body></html>` to ensure correct parsing by the platform's mail engine.
