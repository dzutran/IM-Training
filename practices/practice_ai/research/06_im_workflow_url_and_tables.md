# IM-Workflow URL Redirection & System Tables Research

This document covers the research findings for programmatically monitoring and accessing workflow process screens via URLs.

## 1. Workflow Redirect Pattern (switch_content)

The standard way to open a specific workflow screen (Apply, Approve, Confirm) is using the `switch_content` endpoint.

**Endpoint**: `im_workflow/common/switch/switch_content`

### 1.1. Common Parameters
| Parameter | Description |
| :--- | :--- |
| `imwPageType` | **(Required)** Type of screen to display (see below). |
| `imwSystemMatterId` | **(Required for processing)** System Matter ID of the workflow. |
| `imwNodeId` | **(Required for processing)** ID of the current node. |
| `imwFlowId` | **(Required)** Flow ID of the workflow. |
| `imwUserDataId` | **(Required)** User Data ID linked to the workflow. |
| `imwCallOriginalPagePath` | Path to return to after processing (e.g., `dzu/my_module/my_list`). |

### 1.2. `imwPageType` Mapping
| Value | Screen Type | Use Case |
| :--- | :--- | :--- |
| **0** | Apply | New application. |
| **3** | Re-apply | Re-applying for a matter that was sent back. |
| **4** | Process | Standard approval screen for an active task. |
| **5** | Confirm | Confirmation screen. |
| **7** | Reference | Read-only reference detail screen. |

---

## 2. Workflow System Tables (Active Matters)

To build a custom monitor or list, you must query the following system tables.

### 2.1. Key Tables
- **`imw_t_actv_matter`**: Stores the header information of matters that are currently in progress.
- **`imw_t_actv_task`**: Stores the information of active tasks (steps) for those matters.

### 2.2. Useful Columns in `imw_t_actv_task`
| Column | Description |
| :--- | :--- |
| `node_type` | Type of the node (see mapping below). |
| `status` | Status of the task (e.g., `0` for processing). |

### 2.3. `node_type` Mapping
| Value | Node Type | Recommended `imwPageType` |
| :--- | :--- | :--- |
| **2** | Apply Node | 3 (Re-apply) |
| **3** | Approve Node | 4 (Process) |
| **6** | Confirm Node | 5 (Confirm) |

---

## 3. Implementation Example (SQL)

To get a list of active tasks with their associated matter information:

```sql
SELECT 
    m.system_matter_id, 
    m.matter_name, 
    m.flow_id, 
    t.node_id, 
    t.node_type
FROM 
    imw_t_actv_matter m
JOIN 
    imw_t_actv_task t ON m.system_matter_id = t.system_matter_id
WHERE 
    m.flow_id = 'wf_zzz_01'
ORDER BY 
    m.apply_date DESC
```

---

## 4. References
- [Cookbook 176038: Open Workflow Screen via URL](https://dev-portal.intra-mart.jp/cookbook/cookbook176038/)
- [IM-Workflow Table Schema Guide](https://document.intra-mart.jp/library/iap/public/im_workflow/im_workflow_specification/texts/table_architecture/index.html)

---
*Last Updated: 2026-05-06 by AI Research Agent*
