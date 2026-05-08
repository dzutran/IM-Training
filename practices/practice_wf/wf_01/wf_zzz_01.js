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
    // UI Messages (Using direct strings for practice, can be replaced by MessageManager later)
    msg: {
      title: "Workflow ZZZ 01 Application",
      capReason: "Leave Reason",
      capDays: "Leave Days",
      capTotal: "Item Total",
      capStatus: "Status",
      capPageType: "Page Type",
      capUserDataId: "User Data ID",
      capFlowId: "Flow ID",
      capSysInfo: "System Information",
      btnApply: "Apply",
      btnTemp: "Temp Save",
      btnBack: "Back",
      btnProcess: "Process",
      msgConfirm: "Confirmation",
      msgError: "Validation Error",
      msgSuccess: "Success"
    }
  };


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