var $data = {};

/**
 * Khởi tạo dữ liệu trang wf_02
 */
function init(request) {

    // Sử dụng Content.executeFunction thay cho load() để lấy dữ liệu ban đầu
    var res = Content.executeFunction("training/dzu/practices/practice_wf/wf_02/common", "getWorkflowList", "wf_zzz_01");

    $data = {
        matters: res.data || []
    };

}