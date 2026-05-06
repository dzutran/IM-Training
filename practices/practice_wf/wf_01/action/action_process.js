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

  // --- Rolled back: Node logic moved to UI (HTML/CSJS) ---
  
  // Log final state for debugging
  Debug.console('ZZZ final parameter (server)', parameter);

  return result;
}

function approve(parameter, userParameter) {
  var result = {
    "resultFlag": true,
    "message": ""
  };
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