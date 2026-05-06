var SQL_PATH = {
    selectUsers: 'training/dzu/practices/practice_ai/sql/select_users',
    getUser: 'training/dzu/practices/practice_ai/sql/get_user',
    insertUser: 'training/dzu/practices/practice_ai/sql/insert_user',
    updateUser: 'training/dzu/practices/practice_ai/sql/update_user',
    deleteUser: 'training/dzu/practices/practice_ai/sql/delete_user'
};

function getUsers(keyword) {
    Debug.console("COMMON: getUsers started, keyword=" + keyword);
    var db = new TenantDatabase();
    var params = {
        keyword: keyword ? DbParameter.string('%' + keyword + '%') : null
    };
    var res = db.executeByTemplate(SQL_PATH.selectUsers, params);
    
    if (res.error || !res.data) return [];

    return res.data.map(function(row) {
        return {
            actionUpdate: '',
            actionDelete: '',
            user_id: row.user_id,
            user_name: row.user_name,
            email: row.email,
            department: row.department,
            notes: row.notes
        };
    });
}

function getUser(userId) {
    if (isBlank(userId)) return null;
    var db = new TenantDatabase();
    var res = db.executeByTemplate(SQL_PATH.getUser, { user_id: DbParameter.string(userId) });
    if (res.error || !res.data || res.data.length === 0) return null;
    return res.data[0];
}

function saveUser(user) {
    Debug.console("COMMON: saveUser", user.user_id);
    var db = new TenantDatabase();
    var params = {
        user_id: DbParameter.string(user.user_id),
        user_name: DbParameter.string(user.user_name),
        email: DbParameter.string(user.email),
        department: DbParameter.string(user.department),
        notes: DbParameter.string(user.notes)
    };

    var checkRes = db.executeByTemplate(SQL_PATH.getUser, { user_id: params.user_id });
    var result;
    if (checkRes.data && checkRes.data.length > 0) {
        result = db.executeByTemplate(SQL_PATH.updateUser, params);
    } else {
        result = db.executeByTemplate(SQL_PATH.insertUser, params);
    }
    return { error: result.error, errorMessage: result.errorMessage };
}

function deleteUser(userId) {
    Debug.console("COMMON: deleteUser", userId);
    if (isBlank(userId)) return { error: true, errorMessage: "User ID is blank" };
    var db = new TenantDatabase();
    var result = db.executeByTemplate(SQL_PATH.deleteUser, { user_id: DbParameter.string(userId) });
    return { error: result.error, errorMessage: result.errorMessage };
}
