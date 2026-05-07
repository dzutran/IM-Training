//==============================================================================
//    分岐条件処理プログラム (wf_01 Rule Condition 1)
//    Tham chiếu cấu trúc từ: external/WEB-INF/jssp/src/sample/im_workflow/template/RuleCondition.js
//
//        【 入力 】 parameter                   : ワークフローパラメータオブジェクト
//                   parameter.systemMatterId    : システム案件ID
//                   parameter.userDataId        : ユーザデータID
//                   parameter.nodeId            : ノードID
//                   ... (Các thuộc tính khác từ RuleConditionParameterInfo)
//
//        【返却値】 result.resultFlag           : 結果フラグ     [true:成功/false:失敗]
//                   result.message              : 結果メッセージ [結果フラグが失敗の場合のみ]
//                   result.data                 : ルート遷移可否 [true:遷移する/false:遷移しない]
//
//==============================================================================

function execute(parameter) {
    // Debug.print("----- ruleCondition1.js - execute -----");

    var result = {
        "resultFlag": true,
        "message": "",
        "data": false
    };

    try {
        if (isNull(parameter) || isBlank(parameter.userDataId)) {
            result.resultFlag = false;
            result.message = "userDataId is required.";
            return result;
        }

        // Lấy dữ liệu đơn để kiểm tra điều kiện rẽ nhánh
        var res = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "getLeaveData", parameter.userDataId);
        
        if (isNull(res) || res.error) {
            result.resultFlag = false;
            result.message = "Data was not found or error occurred.";
        } else {
            var itemTotal = Number(res.item_total);
            // Điều kiện 1: Tổng số tiền < 10,000
            if (!isNaN(itemTotal) && itemTotal < 10000) {
                result.data = true;
            }
        }
    } catch (e) {
        result.resultFlag = false;
        result.message = e.message;
    }

    return result;
}
