function execute(workflowParam, matterParam) {

  var listUser = getListUser(workflowParam.loginGroupId,
    workflowParam.localeId,
    workflowParam.applyBaseDate,
    matterParam.systemMatterId,
    matterParam.userDataId);

  var userList = new Array();
  var listUserData = (!isNull(listUser) && !listUser.error && !isNull(listUser.data)) ? listUser.data : new Array();
  var userBizKeyInfo = new Object();
  var listDepartment = new Object();
  var i = 0;
  var j = 0;

  var companyManager = new IMMCompanyManager();
  for (i = 0; i < listUserData.length; i++) {
    userBizKeyInfo.userCd = listUserData[i].userCd;
    listDepartment = companyManager.listDepartmentWithUser(userBizKeyInfo,
      new AppCmnSearchCondition(),
      false,
      new Date(workflowParam.applyBaseDate),
      WorkflowPluginUtilManager.getLocale());
    var listDepartmentData = (!isNull(listDepartment) && !listDepartment.error && !isNull(listDepartment.data)) ? listDepartment.data : new Array();
    userList[i] = new Object();
    userList[i].userCode = listUserData[i].userCd;
    userList[i].userName = listUserData[i].displayName;
    userList[i].localeId = workflowParam.localeId;
    userList[i].userOrgzModels = new Array();

    for (j = 0; j < listDepartmentData.length; j++) {
      userList[i].userOrgzModels[j] = new Object();
      userList[i].userOrgzModels[j].companyName = "";
      userList[i].userOrgzModels[j].orgzName = listDepartmentData[j].displayName;
      userList[i].userOrgzModels[j].companyCode = listDepartmentData[j].companyCd;
      userList[i].userOrgzModels[j].orgzSetCode = listDepartmentData[j].departmentSetCd;
      userList[i].userOrgzModels[j].orgzCode = listDepartmentData[j].departmentCd;
    }
  }

  var result = new Object();
  result.resultFlag = true;
  result.message = "";
  result.data = userList;

  return result;
}

function getDisplayName(workflowParam) {

  var data = new Object();
  data[workflowParam.localeId] = "ZZZ_Authority";

  var result = new Object();
  result.resultFlag = true;
  result.message = "";
  result.data = data;

  return result;
}

function getTargetUserList(workflowParam, matterParam, sort) {

  var listUser = getListUser(workflowParam.loginGroupId, workflowParam.localeId, workflowParam.applyBaseDate, matterParam.systemMatterId, matterParam.userDataId);

  var userList = new Array();
  var listUserData = (!isNull(listUser) && !listUser.error && !isNull(listUser.data)) ? listUser.data : new Array();
  for (var i = 0; i < listUserData.length; i++) {
    userList[i] = new Object();
    userList[i].userCode = listUserData[i].userCd;
    userList[i].userName = listUserData[i].displayName;
    userList[i].localeId = workflowParam.localeId;
  }
  var data = new Object();
  data[workflowParam.localeId] = userList;

  var result = new Object();
  result.resultFlag = true;
  result.message = "";
  result.data = data;

  return result;
}

function getListUser(loginGroupId, localeId, applyBaseDate, systemMatterId, userDataId) {

  var leaveDays = 0;
  // Updated path to point to the practice folder's common.js
  var leaveData = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "getLeaveData", userDataId);
  if (!isNull(leaveData) && !isBlank(leaveData.leave_days)) {
    leaveDays = Number(leaveData.leave_days);
  }

  var approver = "";

  if (leaveDays >= 7) {
    approver = "dev03";
  } else if (leaveDays < 7 && leaveDays >= 3) {
    approver = "dev08";
  } else {
    approver = "dev07";
  }

  let listUser = {
    "error": false
    , "errorCode": ""
    , "message": ""
    , "subMessage": []
    , "data": [
      {
        "userCd": approver
        , "description": approver
        , "displayName": approver
        , "deleteFlag": false
      }
    ]
  }

  return listUser;
}
