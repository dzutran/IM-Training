function getFile(req) {
  let path = normalizePath(req.folderPath) + req.fileName;
  let publicStorage = new PublicStorage(path);
  if (publicStorage.exists()) {
    if (publicStorage.isDirectory()) {
      return {
        isFile: false,
        isDirectory: true,
        listFolder: publicStorage.directories().length > 0 ? '<br>' + publicStorage.directories().join('<br>') : '',
        listFile: publicStorage.files().length > 0 ? '<br>' + publicStorage.files().join('<br>') : '',
      }
    }
    if (publicStorage.isFile()) {
      let path = 'zzz/';
      let folderPath = new File(path);
      if (!folderPath.isDirectory()) {
        folderPath.makeDirectories();
      }
      let file = null;
      let newFile = File.createTempFile(req.fileName.split('.')[0], '.' + req.fileName.split('.')[1], folderPath, true);
      publicStorage.openAsBinary(function (reader, err2) {
        newFile.createAsBinary(function (writer2, err3) {
          reader.transferTo(writer2);
        });
      });
      return {
        isFile: true,
      }
    }
    return {
      isFile: false,
      isDirectory: false,
    }
  }
}

function normalizePath(filePath) {
  if (!filePath) return "/";

  if (filePath.charAt(filePath.length - 1) !== "/") {
    filePath += "/";
  }

  return filePath;
}