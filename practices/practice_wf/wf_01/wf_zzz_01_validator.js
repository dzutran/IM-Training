/**
 * Validator for Workflow ZZZ 01 (Rules Only)
 */
var rules = {
  'leave_reason': {
    caption: 'Leave Reason',
    required: true,
    maxlength: 200,
    noSecret: true // Custom rule
  },
  'leave_days': {
    caption: 'Leave Days',
    required: true,
    numeric: true,
    digits: [2, 1],
    min: 0.5,
    maxThirty: true // Custom rule
  },
  'item_total': {
    caption: 'Item Total',
    number: true,
    min: 0,
    max: 1000000,
    notNegative: true // Custom rule
  }
};
