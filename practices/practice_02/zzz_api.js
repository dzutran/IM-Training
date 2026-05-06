var $method;
var $userName;
var $hobbies;

var $contextPath;
var $encodedUrl;

var $messageValue;
var $hasMessage;

function init(req) {

    // =========================================================
    // 1. Thực hành: Request Object
    // =========================================================

    var requestObj = Web.getRequest();

    $method = requestObj.getMethod();
    var reqName = requestObj.getParameterValue("userName");
    $userName = (reqName !== null && reqName !== "") ? reqName : "Chưa cung cấp thông tin học viên";

    var reqHobbies = requestObj.getParameterValues("hobbies");
    if (reqHobbies !== null && reqHobbies.length > 0) {
        var arr = [];
        for (var i = 0; i < reqHobbies.length; i++) {
            arr.push(reqHobbies[i]);
        }
        $hobbies = arr.join(", ");
    } else {
        $hobbies = "Chưa lựa chọn kỹ năng chuyên môn";
    }

    // =========================================================
    // 2. Thực hành: Web API
    // =========================================================

    $contextPath = Web.getContextPath();

    $encodedUrl = Web.encodeURL("training/dzu/practices/practice_02/zzz_api?id=demo");

    Web.setHTTPResponseHeader("X-Custom-Test-Header", "HelloFromIntraMart");

    // =========================================================
    // 3. Thực hành: MessageManager API
    // =========================================================

    $messageValue = MessageManager.getMessage("TEST_MSG_001");

    if (MessageManager.hasMessage("TEST_MSG_001")) {
        $hasMessage = "Xác nhận: Mã tin nhắn này hợp lệ và tồn tại.";
    } else {
        $hasMessage = "Cảnh báo: Mã tin nhắn không tồn tại (Vui lòng kiểm tra lại cấu hình properties).";
    }
}
