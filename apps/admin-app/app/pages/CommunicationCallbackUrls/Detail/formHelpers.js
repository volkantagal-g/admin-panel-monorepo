import { t } from '@shared/i18n';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
};

export const manipulateValuesBeforeSubmit = values => {
  const tempValues = { ...values };

  const headerMap = {};

  Object.keys(tempValues).forEach(key => {
    if (key.includes('headerMapKey')) {
      const index = key.split('_')[1];
      const valueKey = tempValues[key];
      const value = tempValues[`headerMapValue_${index}`];
      headerMap[valueKey] = value;
      delete tempValues[key];
      delete tempValues[`headerMapValue_${index}`];
    }
  });

  if (Object.keys(headerMap).length > 0) tempValues.headerMap = headerMap;
  delete tempValues.serviceType;

  return tempValues;
};

export const getInitialValues = values => {
  const tempValues = { ...values };

  if (tempValues.headerMap) {
    const { headerMap } = tempValues;
    let index = 1;

    Object.keys(headerMap).forEach(key => {
      const value = headerMap[key];
      tempValues[`headerMapKey_${index}`] = key;
      tempValues[`headerMapValue_${index}`] = value;
      index += 1;
    });

    delete tempValues.headerMap;
  }

  return tempValues;
};
