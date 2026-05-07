# Research 09: IM-Workflow Programming Guide V7.2 Summary

## Overview
This document summarizes the core technical architecture and development patterns for Intra-mart Workflow V7.2, based on the official programming guide.

**Source Document**: [IM-Workflow Programming Guide V7.2 (PDF)](https://download.intra-mart.jp/product/v72_doc/im_workflow_en/development/im_workflow_prog_guide_v72_en.pdf)

## 1. Action Handler Framework
Workflow logic is primarily executed through "Action Handlers" (JSSP or Java).
- **Core Handler**: `action_process.js`.
- **Execution Triggers**: Apply, Approve, Reject, Pull Back, Discontinue, etc.
- **Key Responsibility**: Synchronizing application-specific data tables with the workflow's progression.

## 2. Essential Parameter Structure (The `imw` Object)
Every workflow action receives a standard set of parameters. Understanding these is critical for extension:
- `imwSystemMatterId`: The global unique ID for the matter.
- `imwUserDataId`: The unique link to the application's data row (1:1 relationship).
- `imwNodeId`: Identifies exactly where the matter is in the flow.
- `imwAuthUserCode`: The code of the person currently acting.
- `imwFlowId`: The ID of the workflow definition being used.

## 3. Database Architecture (Matter Persistence)
Workflow data is split between active and historical tables:
| Category | Table Name | Purpose |
| :--- | :--- | :--- |
| **Active Matters** | `imw_t_actv_matter` | Core info for ongoing workflows. |
| **Active Tasks** | `imw_t_actv_task` | Current node status and assigned users. |
| **Completed Matters** | `imw_t_cpl_matter` | Historical record of finished workflows. |
| **Task History** | `imw_t_cpl_task` | Audit trail of all actions taken. |

## 4. Key Programming APIs
- **MatterManager**: The primary entry point for querying matter details and status.
- **WorkflowManager**: Used for administrative or programmatic matter creation.
- **ActvMatter / CplMatter**: Specialized classes for interacting with active vs. completed matters.

## 5. Development Patterns
- **Data Linkage**: Always ensure that your custom application table includes a column for `user_data_id` to maintain the 1:1 link with IM-Workflow.
- **Transaction Management**: Workflow actions and application data updates should ideally occur within the same transaction to prevent desynchronization.
