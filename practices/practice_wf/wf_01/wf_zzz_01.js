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
      infoLeaveRules: "Rules: <3d: dev07 | 3-6d: dev08 | >=7d: dev03",
      infoExpansion: "Expansion: Default: dev08 | >50k: 3 users | >100k: 5 users",
      infoParallelRules: "Parallel: dev03, dev07, dev08 assigned to Parallel Node",
      msgConfirm: "Confirmation",
      msgError: "Validation Error",
      msgSuccess: "Success",
      // Validation Messages
      zzz_err_required_reason: "zzz Please enter the reason for your leave!",
      zzz_err_maxlength_reason: "zzz Reason is too long (max 200 chars)!",
      zzz_err_no_secret: "zzz Reasons cannot contain prohibited words like 'secret'!",
      zzz_err_required_days: "zzz How many days do you need?",
      zzz_err_numeric_days: "zzz Leave days must be a number!",
      zzz_err_min_days: "zzz Minimum leave is 0.5 days!",
      zzz_err_digits_days: "zzz Please enter up to 2 digits and 1 decimal place!",
      zzz_err_max_thirty: "zzz You cannot apply for more than 30 days at once!",
      zzz_err_not_negative: "zzz This value cannot be negative!",
      zzz_err_number_total: "zzz Item total must be a valid number!",
      zzz_err_min_total: "zzz Item total cannot be less than 0!",
      zzz_err_max_total: "zzz Item total cannot exceed 1,000,000!"
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