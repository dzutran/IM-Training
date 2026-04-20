function getData(data) {
  let a = 0;
  //test callback
  for (let i = 0; i < 1000000; i++) {
    a += i;
  }
  return {
    status: 200,
    data: data,
    hideSelectList: false
  };
}

function controlApplication(data) {
  let sharedResource = new SharedResource(data.appId, { 'businessKeys': data.businessKey });
  if (data.isLock == '0') {
    sharedResource.unlockAndNotify();
    return sharedResource.getApplication();
  } else {
    return sharedResource.run(function () { let a = 1; }, 1000);
  }
}