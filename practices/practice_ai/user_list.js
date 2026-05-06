var $data = {};

function init(request) {
    Debug.console("VIEW: user_list init started (Debug)");
    $data.users = Content.executeFunction("training/dzu/practices/practice_ai/common", "getUsers");
    Debug.console("VIEW: user_list init finished, data: " + JSON.stringify($data.users));
}
