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
  var fileNameTemp = 'people.' + fileExtension;
  let tempStorage = new PublicStorage(exportDir, fileNameTemp);
  tempStorage.write(content);

  var mimeType = type === 'excel' ? 'application/vnd.ms-excel; charset=utf-8' : 'text/csv; charset=utf-8';
  var fileNameDownload = 'people_' + Format.fromDate('yyyyMMddHHmmss', new Date()) + '.' + fileExtension;
  Module.download.send(tempStorage, fileNameDownload, mimeType);
}

function exportFile(req) {
  var response = { success: false, message: "", content: "", type: "" };
  var separator = req.type === 'excel' ? '\t' : ',';

  try {
    var headers = ["ID", "Code", "Full Name", "Email", "Phone", "Birth Date", "Status"];
    var rows = [headers.join(separator)];

    for (var i = 0; i < req.data.length; i++) {
      var r = req.data[i];
      rows.push(
        (r.peopleId || '') + separator +
        (r.peopleCode || '') + separator +
        (r.fullName || '') + separator +
        (r.email || '') + separator +
        (r.phone || '') + separator +
        (r.birthDate || '') + separator +
        (r.status || '')
      );
    }

    response.content = rows.join("\r\n");
    response.type = req.type;
    response.success = true;
    response.message = req.type + " export success! (" + req.data.length + " records)";
  } catch (e) {
    response.message = "Export error: " + e.message;
  }

  return response;
}

function exportExcelJava(req) {
  var response = { success: false, message: "", content: "", type: "" };

  try {
    var rows = req.data;

    var HSSFWorkbook = javaClass('org.apache.poi.hssf.usermodel.HSSFWorkbook');
    var ByteArrayOutputStream = javaClass('java.io.ByteArrayOutputStream');
    var Base64 = javaClass('java.util.Base64');

    var wb = new HSSFWorkbook();
    var sheet = wb.createSheet("People");

    var headers = ["ID", "Code", "Full Name", "Email", "Phone", "Birthday", "Status"];
    var headerRow = sheet.createRow(0);
    for (var i = 0; i < headers.length; i++) {
      var cell = headerRow.createCell(i);
      cell.setCellValue(headers[i]);
    }

    for (var r = 0; r < rows.length; r++) {
      var rowData = rows[r];
      var row = sheet.createRow(r + 1);

      var cellId = row.createCell(0);
      if (rowData.peopleId) {
        cellId.setCellValue(Number(rowData.peopleId));
      }

      var cellCode = row.createCell(1);
      cellCode.setCellValue(rowData.peopleCode || "");

      var cellName = row.createCell(2);
      cellName.setCellValue(rowData.fullName || "");

      var cellEmail = row.createCell(3);
      cellEmail.setCellValue(rowData.email || "");

      var cellPhone = row.createCell(4);
      cellPhone.setCellValue(rowData.phone || "");

      var cellBirthday = row.createCell(5);
      cellBirthday.setCellValue(rowData.birthDate || "");

      var cellStatus = row.createCell(6);
      cellStatus.setCellValue(rowData.status || "");
    }

    var baos = new ByteArrayOutputStream();
    wb.write(baos);

    var binary = baos.toByteArray();
    response.success = true;
    response.message = req.type + " export success! (" + rows.length + " records)";
    response.content = Base64.getEncoder().encodeToString(binary);
    response.type = req.type;

  } catch (e) {
    response.message = "Export error: " + e.message;
  }

  return response;

}

function javaClass(className) {
  if (typeof Java !== 'undefined' && Java.type) {
    return Java.type(className);
  }
  if (typeof Packages !== 'undefined') {
    var parts = className.split('.');
    var clazz = Packages;
    for (var i = 0; i < parts.length; i++) {
      clazz = clazz[parts[i]];
    }
    return clazz;
  }
  throw new Error('Java bridge is not available in this runtime.');
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
