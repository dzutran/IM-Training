var init = {}

var rules = {
  selectList: {
    caption: 'list',
    required: true
  },

  txtList: {
    caption: 'input',
    required: true,
    minlength: 5
  },
}

var msg = {
  selectList: {
    required: 'selectList is required'
  },

  txtList: {
    required: 'txtList is required',
    minlength: 'txtList must be at least 5 characters long'
  },
}


var multiDragMsg = {
  requiredMultiDragbox: '{0} is required',
  multiDeselected: {
    requiredMultiDragbox: 'Deselected is required'
  },
  multiSelected: {
    requiredMultiDragbox: 'Selected is required'
  }
}