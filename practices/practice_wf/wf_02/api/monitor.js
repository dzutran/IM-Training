/**
 * Workflow Monitor API (RPC)
 * Sử dụng Content.executeFunction thay cho load() theo chuẩn practice_ai
 */

function getList(request) {
    Debug.console("RPC: getList called with flowId=" + request.flowId);
    
    // Gọi hàm từ common.js bằng Content.executeFunction
    var res = Content.executeFunction("training/dzu/practices/practice_wf/wf_02/common", "getWorkflowList", request.flowId);
    
    return {
        type: 'getList',
        data: res.data || [],
        error: res.error,
        message: res.errorMessage || ""
    };
}
