import isEqual from 'lodash/isEqual';

export function getChangedValues(initialValues, values) {
  const changedValues = {};
  Object.keys(values).forEach(fieldName => {
    if (!isEqual(values[fieldName], initialValues[fieldName])) {
      changedValues[fieldName] = values[fieldName];
    }
  });
  return changedValues;
}
