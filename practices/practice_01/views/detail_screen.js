$bind = {
  statusList: []
}

function init(request) {
  $bind.statusList = [
    {
      label: 'Active',
      value: 'ACTIVE',
      selected: true
    },
    {
      label: 'Inactive',
      value: 'INACTIVE'
    }
  ];
}