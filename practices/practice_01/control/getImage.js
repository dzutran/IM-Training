
function init(req) {
  let path = getRequestParamString(req, 'path');
  var fileName = getFileNameFromPath(path);
  let mimeType = FRMimeUtil.getMimeTypeByExtension(fileName);
  var storage = new PublicStorage(String(path));

  if (mimeType) {
    Module.download.send(storage, fileName, mimeType);
  } else {
    Module.download.send(storage, fileName);
  }
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

function getFileNameFromPath(path) {
  if (isBlank(path)) {
    return 'avatar';
  }
  let s = String(path);
  let idx = s.lastIndexOf('/');
  if (idx >= 0) {
    return s.substring(idx + 1);
  }
  return s;
}