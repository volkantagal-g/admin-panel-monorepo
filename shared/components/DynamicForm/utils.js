import { hasDuplicates } from '@shared/utils/common';
import { AVAILABLE_INPUT_TYPE } from './constants';

const areFieldNamesUniq = (fieldNames = []) => {
  return !hasDuplicates(fieldNames);
};

const validateFieldName = fieldName => {
  if (typeof fieldName === 'string' && fieldName) return;
  throw new Error('All fieldNames must be non-empty string');
};

const validateInputType = (inputType, fieldName) => {
  if (AVAILABLE_INPUT_TYPE[inputType]) return;
  throw new Error(`Not supported input type found: "${inputType}" in field: "${fieldName}"`);
};

const validateLabel = (label, fieldName) => {
  // can be string, React node etc...
  if (label) return;
  throw new Error(`All fields need to have labels, missing in field: ${fieldName}`);
};

export const validateConfigs = (formConfigs = []) => {
  const fieldNames = formConfigs?.map(config => config?.fieldName);
  if (!areFieldNamesUniq(fieldNames)) {
    throw new Error('fieldNames must be unique');
  }

  formConfigs?.forEach(config => {
    const { fieldName, inputType, label } = config;
    validateFieldName(fieldName);
    validateInputType(inputType, fieldName);
    validateLabel(label, fieldName);
  });
};
