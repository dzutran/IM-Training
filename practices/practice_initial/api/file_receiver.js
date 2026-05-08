function init(request) {
  var responseObj = [];
  try {
    // Define paths
    var sessionPath = "training/zzz/session";
    var publicPath = "training/zzz/public";

    var parameters = request.getParameters('local_file');
    if (parameters && parameters.length > 0) {
      for (var i = 0; i < parameters.length; i++) {
        var parameter = parameters[i];
        var fileName = parameter.getFileName();
        if (fileName) {
          // Generate a unique physical name to avoid collisions
          var physicalName = formatDate(new Date(), "YYYYMMDDHHmmss") + "_" + fileName;

          // 1. Save to SessionScopeStorage
          var sessionDir = new SessionScopeStorage(sessionPath);
          if (!sessionDir.isDirectory()) {
            sessionDir.makeDirectories();
          }
          var sessionFile = new SessionScopeStorage(sessionPath, physicalName);

          // 2. Save to PublicStorage
          var publicDir = new PublicStorage(publicPath);
          if (!publicDir.isDirectory()) {
            publicDir.makeDirectories();
          }
          var publicFile = new PublicStorage(publicPath, physicalName);

          // We must read the file data into a memory buffer or string
          // because reader.transferTo can only be called once on the stream.
          parameter.openValueAsBinary(function (reader) {
            // First, save to SessionScopeStorage
            sessionFile.createAsBinary(function (writer1, err1) {
              if (err1) throw err1;
              reader.transferTo(writer1);
            });
          });

          // Since the stream is consumed, we must open the newly created sessionFile
          // to copy its contents to the PublicStorage file.
          sessionFile.openAsBinary(function (sessionReader, err2) {
            if (err2) throw err2;
            publicFile.createAsBinary(function (writer2, err3) {
              if (err3) throw err3;
              sessionReader.transferTo(writer2);
            });
          });

          responseObj.push({
            "name": fileName,
            "size": parameter.getLength(),
            "type": parameter.getHeader("Content-Type"),
            "sessionPath": sessionFile.getCanonicalPath(),
            "publicPath": publicFile.getCanonicalPath(),
            "path": publicFile.directories(true)
          });
        }
      }
    } else {
      responseObj.push({
        "error": "No file uploaded"
      });
    }

    var res = Web.getHTTPResponse();
    res.setContentType('application/json; charset=utf-8');
    res.sendMessageBodyString(ImJson.toJSONString(responseObj));
  } catch (e) {
    responseObj.push({
      "error": e.message
    });
    var res = Web.getHTTPResponse();
    res.setContentType('application/json; charset=utf-8');
    res.sendMessageBodyString(ImJson.toJSONString(responseObj));
  }
}

function formatDate(date, format) {
  if (!format) {
    format = "YYYY-MM-DD HH:mm:ss";
  }

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  var map = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds())
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, function (match) {
    return map[match];
  });
}