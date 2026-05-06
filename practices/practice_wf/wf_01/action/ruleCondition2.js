function execute(parameter) {

    var result = {
        "resultFlag": true,
        "message": "",
        "data": false
    };

    if (isNull(parameter) || isBlank(parameter.userDataId)) {
        result.resultFlag = false;
        result.message = "userDataId is required.";
        return result;
    }

    var res = Content.executeFunction("training/dzu/practices/practice_wf/wf_01/common", "getLeaveData", parameter.userDataId);
    if (isNull(res)) {
        result.resultFlag = false;
        result.message = "Data was not found.";
    } else {
        var itemTotal = Number(res.item_total);
        if (!isNaN(itemTotal) && itemTotal >= 10000) {
            result.data = true;
        }
    }

    return result;
}
