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

  // --- Refactored: Standard Dynamic Node Setting ---
  // Using a robust structure to cover both older and newer SSJS API interpretations

  // 1. Dynamic Node (zzz_dnm_01) logic based on leave_days
  var days = parseInt(userParameter.leave_days) || 0;
  var approver = "dev08"; // Default
  if (days >= 7) approver = "dev03";
  else if (days >= 3) approver = "dev08";
  else approver = "dev07";

  var dynamicPlugin = {
    extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
    pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
    parameter: approver
  };

  var dynamicNode = {
    nodeId: "zzz_dnm_01",
    // Standard IAP structure (Nested)
    processTargetConfigs: [dynamicPlugin],
    // Alternative SSJS structure (Flat)
    extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
    pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
    parameter: approver,
    pluginParameter: approver
  };

  // 2. Horizontal Expansion Node (zzz_hrz_01) logic based on item_total
  var itemTotal = parseInt(userParameter.item_total) || 0;
  var hrzApproverList = ["dev08", "dev07", "dev03"];
  var hrzApprovers = [hrzApproverList[0]]; // Default

  if (itemTotal > 100000) {
    hrzApprovers = hrzApproverList;
  } else if (itemTotal > 50000) {
    hrzApprovers = hrzApproverList.slice(0, 2);
  }

  var hrzNode = {
    nodeId: "zzz_hrz_01",
    matterNodeExpansions: []
  };

  for (var i = 0; i < hrzApprovers.length; i++) {
    var hrzPlugin = {
      extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
      pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
      parameter: hrzApprovers[i]
    };

    var exp = {
      nodeName: "Approval (" + hrzApprovers[i] + ")",
      // For HV expansion, singular 'processTargetConfigModel' is standard
      processTargetConfigModel: [hrzPlugin],
      // Adding flat properties just in case
      extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
      pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
      parameter: hrzApprovers[i]
    };
    hrzNode.matterNodeExpansions.push(exp);
  }

  // Apply to workflow parameter object (ApplyParamInfo)
  // Set both variants to ensure compatibility across versions
  parameter.DCNodeConfigModels = [dynamicNode];
  parameter.dynamicAndCnfmNodeConfigModels = [dynamicNode]; // Lowercase variant seen in some SSJS docs
  
  parameter.HVNodeConfigModels = [hrzNode];
  parameter.horizontalAndVerticalNodeConfigModels = [hrzNode];

  // Log the final parameter object as requested
  Debug.console('ZZZ final parameter', parameter);

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