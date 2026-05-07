//==============================================================================
//    到達処理プログラム (wf_01 Arrive Process)
//    Tham chiếu cấu trúc từ: external/WEB-INF/jssp/src/sample/im_workflow/template/ArriveProcess.js
//
//        【 入力 】 parameter                         : ワークフローパラメータオブジェクト
//                   parameter.systemMatterId          : システム案件ID
//                   parameter.userDataId              : ユーザデータID
//                   parameter.nodeId                  : ノードID
//                   parameter.matterName              : 案件名
//                   parameter.preNodeId               : 前ノードID
//                   parameter.preNodeAuthUserCd       : 前ノード処理権限者コード
//                   parameter.preNodeResultStatus     : 前ノード処理結果ステータス
//                   ... (Các thuộc tính khác từ ArriveProcessParameterInfo)
//
//        【返却値】 result.resultFlag                 : 結果フラグ     [true:成功/false:失敗]
//                   result.message                    : 結果メッセージ [結果フラグが失敗の場合のみ]
//                   result.data                       : メール送信可否 [true:送信可能 / false:送信不可]
//
//==============================================================================

function execute(parameter) {
    
    var result = {
        "resultFlag": true,
        "message": "",
        "data": true // Cho phép gửi mail/thông báo hệ thống tiêu chuẩn
    };

    // Áp dụng gửi mail cho tất cả các node mà đơn đi qua
    try {
        load("training/dzu/practices/practice_wf/wf_01/action/mail_utils");
        
        // Lấy thông tin chi tiết đơn để gửi mail
        var currentData = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "getLeaveData", parameter.userDataId);
        
        // Xây dựng URL xử lý trực tiếp
        var baseUrl = "http://192.168.0.201:8082/imart/"; // Nên lấy từ config nếu có thể
        var processUrl = baseUrl + "im_workflow/user/process/process_direct/" + parameter.systemMatterId + "/" + parameter.nodeId;
        
        // Giữ nguyên các từ khóa chuyên môn bằng tiếng Anh để dễ tra cứu (Dev standards)
        var statusLabel = parameter.preNodeResultStatus;
        if (statusLabel === "approve") statusLabel = "Approve";
        else if (statusLabel === "apply") statusLabel = "Apply";
        else if (statusLabel === "sendback") statusLabel = "Send back";
        else if (statusLabel === "pullback") statusLabel = "Pull back";

        // Xây dựng nội dung mail
        var subject = "Đơn workflow đã đến bước: " + parameter.nodeId;
        var body = "Thông báo: Đơn workflow của bạn đã được chuyển đến một bước mới.\n\n" +
                    "Chi tiết trình trạng:\n" +
                    "- Node hiện tại: " + parameter.nodeId + "\n" +
                    "- Hành động từ node trước: " + (statusLabel || "N/A") + "\n" +
                    "- Mã đơn (Matter ID): " + parameter.systemMatterId + "\n" +
                    "- Tên đơn: " + parameter.matterName + "\n" +
                    "- Lý do đơn: " + (currentData.leave_reason || "N/A") + "\n\n" +
                    "Link xử lý trực tiếp: " + processUrl + "\n\n" +
                    "Vui lòng truy cập hệ thống để xử lý.";

        // Gửi mail cho người xử lý ở node trước (hoặc applicant tùy logic nghiệp vụ)
        // Ở đây ta gửi cho preNodeAuthUserCd để thông báo cho người tiếp theo hoặc người liên quan
        MailUtils.sendSimpleNotification(parameter.preNodeAuthUserCd || Contexts.getAccountContext().userCd, subject, body);
        
    } catch (e) {
        // Lỗi ở đây không rollback transaction của workflow
    }

    return result;
}
