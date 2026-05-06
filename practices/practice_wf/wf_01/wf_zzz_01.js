var $data = {

}

function init(request) {
  $data = {
    imwPageType: request.imwPageType,
    imwUserDataId: request.imwUserDataId,
    imwSystemMatterId: request.imwSystemMatterId,
    imwNodeId: request.imwNodeId,
    imwAuthUserCode: "",
    imwApplyBaseDate: request.imwApplyBaseDate,
    imwFlowId: request.imwFlowId,
    imwCallOriginalPagePath: request.imwCallOriginalPagePath,
    imwCallOriginalParams: request.imwCallOriginalParams,
    // Business data
    leave_reason: "",
    leave_days: "",
    status: "",
    item_total: ""
  };

  var imwAuthUserCodeList = request.getParameterValues("imwAuthUserCode");

  if (isArray(imwAuthUserCodeList) && imwAuthUserCodeList.length === 1) {
    $data.imwAuthUserCode = imwAuthUserCodeList[0];
  }

  if ($data.imwPageType === "0" && isBlank($data.imwUserDataId)) {
    $data.imwUserDataId = Identifier.get();
  } else if (!isBlank($data.imwUserDataId)) {
    // Load existing data
    var leaveData = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "getLeaveData", $data.imwUserDataId);
    if (leaveData != null) {
      $data.leave_reason = leaveData.leave_reason;
      $data.leave_days = leaveData.leave_days;
      $data.status = leaveData.status;
      $data.item_total = leaveData.item_total;
    }
  }
}