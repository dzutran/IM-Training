# Research 10: IM-Workflow Arrive Process (到達処理)

## 1. Overview
The **Arrive Process (到達処理)** is a server-side program that executes automatically when a matter reaches a specific node in a workflow.

Unlike Action Handlers (Approve, Apply), the Arrive Process is triggered by the system's movement of the matter, not directly by a user's action on that node.

## 2. Key Characteristics
- **Transaction Independence**: The Arrive Process runs *within* the workflow's arrival transaction, but **it cannot rollback the transaction**. If an error occurs in the arrive process, the matter remains at the node it just reached.
- **Execution Timing**:
    - After Apply or Approve (moving forward).
    - After Send Back (差戻し).
    - After Pull Back (引戻し).
    - After Matter Operation (案件操作).
- **Multiple Handlers**: Multiple arrive processes can be set for a single node. They execute in order unless one returns `resultFlag: false`.

## 3. Programming Interface (Script Development Model)
Function Signature: `function arrive(parameter)`

### Input Parameters (`ArriveProcessParameterInfo`)
The `arrive` function receives an object with the following key properties:

| Property | Type | Description |
| :--- | :--- | :--- |
| `systemMatterId` | String | Unique ID of the matter. |
| `userDataId` | String | Link to application data. |
| `nodeId` | String | The node the matter just reached. |
| `matterNumber` | String | Matter number (案件番号). |
| `matterName` | String | Matter name (案件名). |
| `preNodeId` | String | ID of the previous node. |
| `preNodeAuthUserCd`| String | Authorized user of the previous node. |
| `preNodeExecUserCd`| String | Actual execution user of the previous node. |
| `preNodeResultStatus`| String | Result of the previous action (e.g., `approve`, `apply`, `sendback`). |
| `preNodeProcessComment`| String | Comment from the previous node. |
| `flowId` | String | ID of the workflow definition. |
| `routeId` | String | ID of the route. |
| `loginGroupId` | String | ID of the login group. |
| `localeId` | String | ID of the locale. |


### Return Values
| Property | Type | Description |
| :--- | :--- | :--- |
| `resultFlag` | Boolean | `true` for success, `false` for failure. |
| `message` | String | Error message (logged if `resultFlag` is `false`). |
| `data` | Boolean | **Mail Control**: `true` sends standard notifications, `false` suppresses them. |

## 4. Practical Implementation (wf_01 Example)
In this project, we implemented an Arrive Process to send simple email notifications when a matter reaches the approval nodes.

### Logic Flow:
1. Check `parameter.nodeId` to target specific nodes (`zzz_02_approve`, `zzz_03_approve`).
2. Load `mail_utils.js`.
3. Fetch application data using `parameter.userDataId`.
4. Construct a plain text message.
5. Send mail via `MailUtils.sendSimpleNotification`.

### Files Created/Modified:
- **[NEW]** `dzu/practices/practice_wf/wf_01/action/arrive_process.js`
- **[MODIFY]** `dzu/practices/practice_wf/wf_01/action/mail_utils.js` (Added `sendSimpleNotification`)

## 5. Development Resources
- **Sample Template**: A reference implementation can be found at:
  `<Install_Dir>/jssp/src/sample/im_workflow/template/ArriveProcess.js`
- **Automation**: Often used in conjunction with `ProcessManager` to implement auto-approval logic.

## 6. Best Practices & Warnings
- **Error Handling**: Always use `try-catch`. Since you can't rollback the workflow, you should log errors carefully for manual intervention.
- **Performance**: Keep the logic lightweight. Heavy processing here will slow down the "Approve/Apply" action of the *previous* user.
- **Mail Suppression**: Use the `data` return property if you want to replace standard IM-Workflow emails with your custom ones.
