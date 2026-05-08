var $data = {};

/**
 * Khởi tạo dữ liệu trang wf_02
 */
function init(request) {

    // Sử dụng Content.executeFunction thay cho load() để lấy dữ liệu ban đầu
    var res = Content.executeFunction("training/dzu/practices/practice_wf/wf_02/common", "getWorkflowList", "wf_zzz_01");

    $data = {
        matters: res.data || [],
        // Professional UI Messages for Monitor Dashboard
        msg: {
            title: "Workflow Monitor Dashboard",
            capSearch: "Search Conditions",
            capFlowId: "Flow ID",
            capList: "Matter List",
            capId: "System ID",
            capName: "Matter Descriptor",
            capNode: "Node Phase",
            capUser: "Initiated By",
            capDate: "Timeline",
            btnSearch: "Search",
            btnApply: "Apply New",
            btnRefresh: "Refresh List",
            errNoFlow: "zzz Please enter a Flow ID first!"
        }
    };

}