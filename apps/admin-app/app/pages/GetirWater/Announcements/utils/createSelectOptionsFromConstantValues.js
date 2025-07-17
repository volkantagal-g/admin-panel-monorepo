const { getLangKey } = require('@shared/i18n');

const createSelectOptionsFromConstantValues = (values = {}) => {
  return Object.entries(values).map(([value, label]) => {
    return {
      value,
      label: label[getLangKey()] || label,
    };
  });
};

export default createSelectOptionsFromConstantValues;
