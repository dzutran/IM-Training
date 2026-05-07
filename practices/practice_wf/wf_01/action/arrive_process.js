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
        
        // 1. Phân loại và xây dựng nội dung mail theo trạng thái (Professional Labeling)
        var mailConfig = {
            subject: "Thông báo Workflow",
            statusText: "Đang xử lý"
        };

        switch (parameter.preNodeResultStatus) {
            case "apply":
                mailConfig.subject = "Yêu cầu phê duyệt đơn mới";
                mailConfig.statusText = "Mới khởi tạo (Apply)";
                break;
            case "approve":
                mailConfig.subject = "Thông báo: Đơn đã được phê duyệt ở bước trước";
                mailConfig.statusText = "Đã phê duyệt (Approve)";
                break;
            case "sendback":
                mailConfig.subject = "Cảnh báo: Đơn bị TRẢ VỀ (Send Back)";
                mailConfig.statusText = "Bị trả về (Send Back)";
                break;
            case "pullback":
                mailConfig.subject = "Thông báo: Đơn đã được thu hồi (Pull Back)";
                mailConfig.statusText = "Đã thu hồi (Pull Back)";
                break;
            case "deny":
                mailConfig.subject = "Thông báo: Đơn đã bị TỪ CHỐI (Deny)";
                mailConfig.statusText = "Bị từ chối (Deny)";
                break;
            default:
                mailConfig.subject = "Đơn workflow đã đến bước: " + parameter.nodeId;
                mailConfig.statusText = parameter.preNodeResultStatus || "Chuyển bước";
        }

        // 2. Chuẩn bị dữ liệu chi tiết cho Template HTML
        var mailDetails = {
            systemMatterId: parameter.systemMatterId,
            matterName: parameter.matterName,
            reason: currentData.leave_reason || "Không có lý do",
            days: currentData.leave_days || "0",
            applyUserName: parameter.applyUserName || "Người dùng",
            nodeName: parameter.nodeId,
            processUrl: processUrl // Truyền URL xử lý trực tiếp vào Mail Details
        };

        // 3. Gửi mail HTML chuyên nghiệp
        // Ưu tiên gửi cho danh sách người xử lý ở node hiện tại
        var targetUsers = parameter.nodeAuthUserCdList || [parameter.preNodeAuthUserCd];
        
        for (var i = 0; i < targetUsers.length; i++) {
            MailUtils.sendNotification(targetUsers[i], mailConfig.subject, mailDetails);
        }
        
    } catch (e) {
        // Lỗi ở đây không rollback transaction của workflow
    }

    return result;
}
