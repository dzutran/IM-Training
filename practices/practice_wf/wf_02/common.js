/**
 * Workflow Common Logic (Function Container)
 * Cấu trúc chuẩn ES5, tự quản lý DB bên trong hàm.
 */

/**
 * Lấy danh sách workflow đang hoạt động
 * @param {String} flowId
 */
function getWorkflowList(flowId) {
    Debug.console("COMMON: getWorkflowList started, flowId=" + flowId);
    
    var db = new TenantDatabase();
    var sqlPath = "training/dzu/practices/practice_wf/wf_02/sql/get_active_matters";
    
    // Tham số truy vấn
    var params = {
        flow_id: DbParameter.string(flowId || "wf_zzz_01"),
        locale_id: DbParameter.string(Contexts.getAccountContext().locale.toString())
    };
    
    var res = db.executeByTemplate(sqlPath, params);
    
    if (res.error) {
        Debug.console("DB ERROR: " + res.message);
        return { error: true, errorMessage: res.message, data: [] };
    }
    
    var dbData = res.data || [];
    var formattedData = [];
    
    // Vòng lặp ES5 thuần túy
    for (var i = 0; i < dbData.length; i++) {
        var row = dbData[i];
        
        // Xác định imwPageType
        var pageType = "4"; 
        var nType = row.node_type ? String(row.node_type) : "";
        if (nType === "2") pageType = "3";
        else if (nType === "6") pageType = "5";
        
        var item = {
            system_matter_id: row.system_matter_id ? String(row.system_matter_id) : "",
            user_data_id: row.user_data_id ? String(row.user_data_id) : "",
            flow_id: row.flow_id ? String(row.flow_id) : "",
            matter_name: row.matter_name ? String(row.matter_name) : "",
            node_id: row.node_id ? String(row.node_id) : "",
            page_type: pageType,
            apply_user_name: row.apply_user_name ? String(row.apply_user_name) : "",
            apply_date: _internalFormatDate(row.apply_date)
        };
        formattedData.push(item);
    }
    
    Debug.console("DB SUCCESS: Row count = " + formattedData.length);
    return { error: false, data: formattedData };
}

/**
 * Hàm định dạng ngày tháng nội bộ
 */
function _internalFormatDate(date) {
    if (date == null) return "";
    var d = new Date(date);
    if (isNaN(d.getTime())) return String(date); 
    
    var yyyy = d.getFullYear();
    var MM = ("0" + (d.getMonth() + 1)).slice(-2);
    var dd = ("0" + d.getDate()).slice(-2);
    var HH = ("0" + d.getHours()).slice(-2);
    var mm = ("0" + d.getMinutes()).slice(-2);
    var ss = ("0" + d.getSeconds()).slice(-2);
    
    return yyyy + "/" + MM + "/" + dd + " " + HH + ":" + mm + ":" + ss;
}
