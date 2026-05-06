function apply(parameter, userParameter) {
  var result = {
    "resultFlag": true,
    "message": "Apply successfully.",
    "data": null
  };
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
        pageType: "7", // Màn hình Reference (Xem chi tiết đơn)
        matterName: parameter.matterName,
        applyUserName: parameter.applyAuthUserName,
        reason: userParameter.leave_reason,
        days: userParameter.leave_days
      }
    );
  } catch (e) {
    Debug.console("Email Skip: " + e.message);
  }
  
  // Log final state for debugging
  Debug.console('ZZZ final parameter (server)', parameter);

  return result;
}

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
        pageType: "7", // Màn hình Reference (Xem kết quả)
        matterName: parameter.matterName,
        applyUserName: parameter.applyAuthUserName,
        reason: currentData.leave_reason,
        days: currentData.leave_days
      }
    );
  } catch (e) {
    Debug.console("Email Skip: " + e.message);
  }

  return result;
}

function sendBack(parameter, userParameter) {
  var result = {
    "resultFlag": true,
    "message": ""
  };
  return result;
}

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

function tempSaveDelete(parameter, userParameter) {
  var result = {
    "resultFlag": true,
    "message": ""
  };
  return result;
}