$data = {
  listData: []
}

function init(req) {
  isUserLogin();
  $data.listData = []
}

function isUserLogin() {
  if (!ContextStatus.validate()) {
    redirect('/imart/login');
  }
}