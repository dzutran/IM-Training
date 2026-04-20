function getData(req) {
  const sqlExcute = 'training/dzu/sql/db_select_execute';
  const sqlFetch = 'training/dzu/sql/db_select_fetch';
  var db = new SharedDatabase(req.dbName);
  let dbType = req.dbType;
  let skip = +req.skip;
  let limit = +req.limit;
  let filter = req.filter;
  let params = {
    row_num: DbParameter.number(limit),
    kkfcdksy: filter.kkfcdksy ? DbParameter.string(filter.kkfcdksy) : null,
    kkfnmksy: filter.kkfnmksy ? DbParameter.string(filter.kkfnmksy) : null,
    salesname: filter.salesname ? DbParameter.string(filter.salesname) : null
  }
  let res = null;
  if (dbType == '1') {
    res = db.executeByTemplate(sqlExcute, params);
  } else {
    res = db.fetchByTemplate(sqlFetch, skip, limit, params);
  }
  return {
    isError: res.error,
    count: res.data.length,
    data: res.data
  }
}