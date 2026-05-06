# Workflow Mail Notification (V2) - Technical Specification

## Overview
Implementation of a robust, professional email notification system for the `wf_01` module. The system utilizes the Intra-mart `MailSender` API to deliver multi-part messages containing both rich HTML and fallback plain text.

## Core Components
### 1. Reusable Utility (`mail_utils.js`)
- **Self-Contained Module**: Implemented using an IIFE pattern for safe loading in JSSP environments.
- **Multi-part Delivery**: Sends both `setText()` (Plain Text) and `setHTML()` (HTML) versions for 100% client compatibility.
- **Error Handling**: Comprehensive try-catch blocks with detailed logging to `Debug.console`.

### 2. Business Logic Integration (`action_process.js`)
- **Apply Trigger**: Sends notification to the applicant with a summary of their submission.
- **Approve Trigger**: Fetches data from the database (via `common.js`) to provide full context in the approval notification.

## Deep-Linking Pattern
The system uses the **Direct Reference** URL pattern for better stability and readability:
`http://[HOST]:[PORT]/imart/im_workflow/user/reference/reference_direct/[SYSTEM_MATTER_ID]`

## HTML Template Structure
- **Container**: Max-width 600px with a subtle border.
- **Personalization**: "Chào [User Name]," instead of generic greetings.
- **Business Data Block**: A dedicated grey section containing the Matter ID, Name, Reason, and Days.
- **Call to Action**: A bold blue button/link for direct access.

## Implementation Example
```javascript
var sender = new MailSender();
sender.addTo(targetEmail);
sender.setSubject("[Workflow ZZZ] " + subject);
sender.setText(plainTextBody);
sender.setHTML(htmlContent); // Full <html><body> structure
sender.send();
```

## Maintenance Notes
- **Host Configuration**: Currently set to `192.168.0.201:8082`. Update in `mail_utils.js` if the environment changes.
- **Fallback**: The plain text version ensures that the matter is accessible even on text-only mail clients.
