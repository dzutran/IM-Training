var LEAVE_SQL = {
    insertLeave: 'training/dzu/practices/practice_wf/wf_01/sql/insert_leave',
    updateLeave: 'training/dzu/practices/practice_wf/wf_01/sql/update_leave'
};

function getLeaveData(userDataId) {

    if (isNull(userDataId) || userDataId === "") {
        return null;
    }

    var db = new TenantDatabase();
    var sql = "SELECT leave_reason, leave_days, status, item_total FROM wf_zzz_user WHERE user_data_id = ?";
    var res = db.select(sql, [DbParameter.string(userDataId)]);
    if (res.error || res.countRow === 0) {
        return null;
    }
    return res.data[0];
}

function saveLeaveData(userDataId, leaveReason, leaveDays, status, itemTotal) {

    // ensureLeaveTable();

    var db = new TenantDatabase();

    var existsSql = " SELECT 1 FROM wf_zzz_user WHERE user_data_id = ? ";
    var existsRes = db.select(existsSql, [DbParameter.string(userDataId)]);
    if (existsRes.error) {
        return {
            error: true,
            errorMessage: existsRes.errorMessage || "CHECK FAILED"
        };
    }

    var safeStatus = isBlank(status) ? "PENDING" : status;
    var params = {
        user_data_id: DbParameter.string(userDataId),
        leave_reason: DbParameter.string(leaveReason),
        leave_days: DbParameter.number(+leaveDays),
        status: DbParameter.string(safeStatus),
        item_total: DbParameter.number(+(itemTotal || 0))
    };

    if (existsRes.countRow > 0) {
        var updateResult = db.executeByTemplate(LEAVE_SQL.updateLeave, params);
        return updateResult;
    } else {
        var insertResult = db.executeByTemplate(LEAVE_SQL.insertLeave, params);
        return insertResult;
    }
}
