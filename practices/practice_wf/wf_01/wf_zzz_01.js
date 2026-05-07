var $data = {};

/**
 * Initialization function for the JSSP page.
 */
function init(request) {
  $data = {
    // Workflow parameters
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
    item_total: "",
    // Fallback messages (avoiding MessageManager if it causes issues)
    msgConfirmTitle: "Confirmation",
    msgErrorTitle: "Validation Error",
    msgSuccessTitle: "Success"
  };

  // Safe Message Loading
  try {
    var confirm = MessageManager.getMessage('CAP.Z.IWP.COMMON.CONFIRM.TITLE');
    if (confirm) $data.msgConfirmTitle = confirm;
    
    var error = MessageManager.getMessage('CAP.Z.IWP.COMMON.ERROR.TITLE');
    if (error) $data.msgErrorTitle = error;
  } catch (e) {
    // Silent fallback to default strings
  }

  // Extract auth user code properly
  var authUserCode = request.getParameter("imwAuthUserCode");
  $data.imwAuthUserCode = authUserCode || "";

  // Data Lifecycle Logic
  if ($data.imwPageType === "0" && isBlank($data.imwUserDataId)) {
    $data.imwUserDataId = Identifier.get();
  } else if (!isBlank($data.imwUserDataId)) {
    var leaveData = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "getLeaveData", $data.imwUserDataId);
    if (leaveData != null) {
      $data.leave_reason = leaveData.leave_reason;
      $data.leave_days = leaveData.leave_days;
      $data.status = leaveData.status;
      $data.item_total = leaveData.item_total;
    }
  }
}

function handleErrors(request, validationErrors) {
  return {
    error: true,
    validationErrors: validationErrors
  };
}