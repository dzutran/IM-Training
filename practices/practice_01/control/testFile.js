function init(req) {
  // get parameter
  var type = getRequestParamString(req, 'type', null);
  var keyword = getRequestParamString(req, 'keyword', null);
  // get data from database
  const db = new SharedDatabase("im_db_backup_dev_01");
  let params = {
    keyword: DbParameter.string(keyword)
  }
  var res = db.executeByTemplate("training/dzu/practices/practice_01/database/practice01PeopleZZZ_GetByKeyword", params)
  var separator = type === 'excel' ? '\t' : ',';
  var data = res.data;

  Debug.console('ZZZ data: ' + JSON.stringify(data));
  var headers = ["ID", "Code", "Full Name", "Email", "Phone", "Birth Date", "Status"];
  var rows = [headers.join(separator)];

  for (var i = 0; i < data.length; i++) {
    var r = data[i];
    rows.push(
      (r.people_id || '') + separator +
      (r.people_code || '') + separator +
      (r.full_name || '') + separator +
      (r.email || '') + separator +
      (r.phone || '') + separator +
      (r.birth_date || '') + separator +
      (r.status || '')
    );
  }

  let content = rows.join("\r\n");

  let exportDir = 'training/zzz/public/practice01/files/excel';
  let exportDirStorage = new PublicStorage(exportDir);
  if (!exportDirStorage.isDirectory()) {
    exportDirStorage.makeDirectories();
  }

  // Generate unique name for the temporary file
  var fileExtension = type === 'excel' ? 'xls' : 'csv';
  var fileName = 'people.' + fileExtension;
  let tempStorage = new PublicStorage(exportDir, fileName);

  var mimeType = type === 'excel' ? 'application/vnd.ms-excel; charset=utf-8' : 'text/csv; charset=utf-8';
  tempStorage.write(content);
  Module.download.send(tempStorage, fileName, mimeType);

}

function getRequestParamString(request, name, defVal) {
  var v = getRequestParam(request, name);
  if (v == null) {
    return defVal == null ? null : String(defVal);
  }
  if (typeof v.getValue === 'function') {
    v = v.getValue();
  }
  if (v == null) {
    return defVal == null ? null : String(defVal);
  }
  return String(v);
}

function getRequestParam(request, name) {
  if (request == null) {
    return null;
  }
  if (request[name] != null) {
    return request[name];
  }
  var lower = String(name).toLowerCase();
  if (request[lower] != null) {
    return request[lower];
  }
  if (typeof request.getParameter === 'function') {
    var v = request.getParameter(name);
    if (v != null) {
      return v;
    }
    return request.getParameter(lower);
  }
  return null;
}
