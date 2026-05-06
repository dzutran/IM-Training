var $data = {};

function init(request) {
    // Nạp logic nghiệp vụ
    load("training/dzu/practices/practice_wf/wf_02/common");

    // Lấy dữ liệu thật từ Database
    var res = getWorkflowList("wf_zzz_01");

    // Đẩy dữ liệu vào $data
    $data = {
        matters: res.data || []
    };
    
    Debug.console("PAGE: init finished, data length=" + $data.matters.length);
}