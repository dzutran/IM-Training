var $data = {
  sampleList: [],
  cbList: [],
  userCd: '',
  listUser: [],
  info: {},
  dataDropDown: [],
  sharedResource: null,
  treeData: [],
  params: {
    plugins: ['ui', 'themes', 'html_data', 'imuiTreeIcon']
  },
  multiDragData: [],
  initGrid: [{}]
}
var hideSelectList = false;

var $useHelp;
var sampleButtons = [
  { text: 'Ok', click: 'button_ok' },
  { text: 'Close', click: 'button_ng' }
];
function init(request) {
  $data.sampleList = [
    { 'value': '', 'label': '' },
    { 'value': '1', 'label': 'a1' },
    { 'value': '2', 'label': 'a2' }
  ];

  $data.cbList = [
    { 'value': '1', 'label': '1', 'id': 'cbList1' },
    { 'value': '2', 'label': '2', 'id': 'cbList2' },
    { 'value': '3', 'label': '3', 'id': 'cbList3' },
    { 'value': '4', 'label': '4', 'id': 'cbList4' },
    { 'value': '5', 'label': '5', 'id': 'cbList5' }
  ]

  $data.dataDropdown = [
    {
      href: "http://www.yahoo.co.jp/",
      label: "label2",
      icon: "ui/images/icons/fugue-icons-3.3.4/icons/folder-open.png",
      children: [
        {
          href: "http://www.yahoo.co.jp/",
          label: "label3",
          icon: "ui/images/icons/fugue-icons-3.3.4/icons/folder-open.png",
          children: [
            {
              href: "http://www.yahoo.co.jp/",
              label: "label5",
              icon: "ui/images/icons/fugue-icons-3.3.4/icons/folder-open.png"
            }
          ]
        },
        {
          href: "http://www.yahoo.co.jp/",
          label: "label4",
        }
      ]
    }


  ]
  var userContext = Contexts.getAccountContext();
  $data.userCd = userContext.userCd;

  var manager = new MenuGroupManager();
  // メニューグループIDは start_help_pc
  var menuId = "start_help_pc";
  // ヘルプメニューのメニューグループカテゴリは im_site_help_pc
  var menuIds = manager.getAvailableMenuGroupIds("im_site_help_pc");
  for (var index = 0; index < menuIds.data.length; index++) {
    if (menuIds.data[index] == menuId) {
      $useHelp = true;
    }
  }

  let accountInfoManager = new AccountInfoManager();
  let listUser = getDataDB('ja');
  $data.listUser = listUser.map(function (user) {
    let accountInfo = accountInfoManager.getAccountInfo(user.user_cd);
    delete accountInfo.data.password;
    return {
      userCd: user.user_cd,
      userName: user.user_name,
      userInfo: ImJson.toJSONString(accountInfo.data)
    }
  })

  $data.treeData.push({
    label: 'Users',
    iconClass: 'im-ui-icon-common-16-user',
    children: []
  })
  listUser.forEach(function (user) {
    let accountInfo = accountInfoManager.getAccountInfo(user.user_cd);
    delete accountInfo.data.password;
    let userInfo = accountInfo.data;
    let infos = [];
    for (var key in userInfo) {
      let obj = {};
      obj.label = key;
      if (userInfo[key]) {
        obj.iconClass = "im-ui-icon-common-16-tick";
        obj.children = [{
          label: ImJson.toJSONString(userInfo[key])
        }]
      } else {
        obj.iconClass = "im-ui-icon-common-16-ng";
      }
      infos.push(obj)
    }
    $data.treeData[0].children.push({
      label: user.user_name,
      iconClass: "im-ui-icon-common-16-user",
      children: [
        {
          label: 'User Info',
          iconClass: "im-ui-icon-common-16-information",
          children: infos
        }
      ]
    })
  })

  $data.multiDragData = listUser.map(function (user, index) {
    return {
      label: user.user_name,
      value: user.user_cd,
      disabled: index % 3 == 0 ? true : false
    }
  })

  // wLog(info);

}

function wLog(msg) {
  msg = msg || "";
  let day = new Date();
  Debug.console(formatDate(day) + ' - zzz: ' + msg);
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

function getDataDB(localeId, userCd) {
  let sql = "";
  sql += " SELECT * ";
  sql += " FROM imm_user ";
  sql += " WHERE locale_id = ? ";
  let param = [DbParameter.string(localeId)];
  if (userCd) {
    sql += " AND user_cd = ? ";
    param.push(DbParameter.string(userCd));
  }

  var result = new TenantDatabase().execute(sql, param);
  if (result.error) {
    throw new Error("システムエラーが発生しました。");
  }
  return result.data
}
