const isNil = require('lodash/isNil');

const isNullOrEmpty = param => {
  let variable = param;
  if (typeof variable === 'string') {
    variable = variable.trim();
  }
  return isNil(variable) || variable === '';
};

module.exports = { isNullOrEmpty };
