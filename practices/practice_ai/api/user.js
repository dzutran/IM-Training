function getUsers(data) {
    var res = Content.executeFunction("training/dzu/practices/practice_ai/common", "getUsers", data.keyword);
    return { type: 'getUsers', data: res };
}

function saveUser(user) {
    var res = Content.executeFunction("training/dzu/practices/practice_ai/common", "saveUser", user);
    return { type: 'saveUser', error: res.error, errorMessage: res.errorMessage };
}

function deleteUser(data) {
    var res = Content.executeFunction("training/dzu/practices/practice_ai/common", "deleteUser", data.user_id);
    return { type: 'deleteUser', error: res.error, errorMessage: res.errorMessage };
}
