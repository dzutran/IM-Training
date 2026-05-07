//==============================================================================
//    アクション処理プログラム (wf_01 Action Process)
//    Tham chiếu cấu trúc từ: external/WEB-INF/jssp/src/sample/im_workflow/template/ActionProcess.js
//
//        【 入力 】 parameter                   : ワークフローパラメータオブジェクト
//                   parameter.systemMatterId    : システム案件ID
//                   parameter.userDataId        : ユーザデータID
//                   parameter.matterName        : 案件名
//                   parameter.nodeId            : ノードID
//                   parameter.authUserCd        : 処理権限者コード
//                   parameter.execUserCd        : 処理実行者コード
//                   parameter.resultStatus      : 処理結果ステータス
//                   ... (Các thuộc tính khác từ ActionProcessParameterInfo)
//                   userParameter               : リクエストパラメータオブジェクト
//
//        【返却値】 result.resultFlag           : 結果フラグ     [true:成功/false:失敗]
//                   result.message              : 結果メッセージ [結果フラグが失敗の場合のみ]
//                   result.data                 : 案件番号       [申請時に上書きする場合のみ]
//
//==============================================================================

/**
 * 申請
 */
function apply(parameter, userParameter) {

  var result = {
    "resultFlag": true,
    "message": "Apply successfully.",
    "data": null
  };

  // Nghiệp vụ lưu dữ liệu đơn
  var saveRes = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "saveLeaveData",
    userParameter.imwUserDataId,
    userParameter.leave_reason,
    userParameter.leave_days,
    userParameter.imwPageType,
    userParameter.item_total
  );

  if (saveRes.error) {
    result.resultFlag = false;
    result.message = saveRes.errorMessage;
    return result;
  }

  // --- Send Detailed Email Notification ---
  try {
    load("training/dzu/practices/practice_wf/wf_01/action/mail_utils");
    MailUtils.sendNotification(
      parameter.applyAuthUserCd,
      "Application Submitted",
      {
        systemMatterId: parameter.systemMatterId,
        userDataId: userParameter.imwUserDataId,
        flowId: parameter.flowId,
        pageType: "7",
        matterName: parameter.matterName,
        applyUserName: parameter.applyAuthUserName,
        reason: userParameter.leave_reason,
        days: userParameter.leave_days
      }
    );
  } catch (e) {
    // Silently skip
  }

  return result;
}

/**
 * 承認
 */
function approve(parameter, userParameter) {

  var result = {
    "resultFlag": true,
    "message": "Approve successfully."
  };

  // --- Fetch data for detailed notification ---
  var currentData = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "getLeaveData", parameter.userDataId);

  // --- Send Detailed Email Notification to Applicant ---
  try {
    load("training/dzu/practices/practice_wf/wf_01/action/mail_utils");
    MailUtils.sendNotification(
      parameter.applyAuthUserCd,
      "Application Approved",
      {
        systemMatterId: parameter.systemMatterId,
        userDataId: parameter.userDataId,
        flowId: parameter.flowId,
        pageType: "7",
        matterName: parameter.matterName,
        applyUserName: parameter.applyAuthUserName,
        reason: currentData.leave_reason,
        days: currentData.leave_days
      }
    );
  } catch (e) {
    // Silently skip
  }

  return result;
}

/**
 * 差戻し
 */
function sendBack(parameter, userParameter) {
  var result = {
    "resultFlag": true,
    "message": ""
  };
  return result;
}

/**
 * 一時保存（新規登録）
 */
function tempSaveCreate(parameter, userParameter) {
  var result = {
    "resultFlag": true,
    "message": ""
  };

  var saveRes = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "saveLeaveData",
    parameter.userDataId,
    userParameter.leave_reason,
    userParameter.leave_days,
    "TEMP_SAVED",
    userParameter.item_total
  );

  if (saveRes.error) {
    result.resultFlag = false;
    result.message = saveRes.errorMessage;
  }

  return result;
}

/**
 * 一時保存（更新）
 */
function tempSaveUpdate(parameter, userParameter) {
  var result = {
    "resultFlag": true,
    "message": ""
  };

  var saveRes = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "saveLeaveData",
    parameter.userDataId,
    userParameter.leave_reason,
    userParameter.leave_days,
    "TEMP_SAVED",
    userParameter.item_total
  );

  if (saveRes.error) {
    result.resultFlag = false;
    result.message = saveRes.errorMessage;
  }

  return result;
}

/**
 * 一時保存（削除）
 */
function tempSaveDelete(parameter, userParameter) {
  var result = {
    "resultFlag": true,
    "message": ""
  };
  return result;
}