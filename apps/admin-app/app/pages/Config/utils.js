import { Checkbox, Input, InputNumber } from 'antd';
import _isNumber from 'lodash/isNumber';
import _isString from 'lodash/isString';
import _isBoolean from 'lodash/isBoolean';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';

import { CONFIG_TYPES } from './constants';

const { TextArea } = Input;

export const getConfigTypeSelectOptions = () => {
  return Object.values(CONFIG_TYPES).map(type => ({
    label: type,
    value: type,
  }));
};

export const getInputType = ({ type, key }) => {
  if (type === CONFIG_TYPES.NUMBER) {
    return 'number';
  }
  if (type === CONFIG_TYPES.STRING) {
    return 'text';
  }
  if (type === CONFIG_TYPES.BOOLEAN) {
    return 'checkbox';
  }
  if (type === CONFIG_TYPES.ARRAY || type === CONFIG_TYPES.OBJECT) {
    return 'object';
  }

  throw Error(`Unexpected configuration - key: ${key} type: ${type}`);
};

export const getBaseInputComponent = ({ inputType, value, isDisabled, onChange, onBlur }) => {
  // ordered by most defined config types
  if (inputType === 'object') {
    return (
      <TextArea
        defaultValue={value}
        rows={5}
        disabled={isDisabled}
        onChange={event => {
          onChange(event?.target?.value);
        }}
      />
    );
  }

  if (inputType === 'number') {
    return (
      <InputNumber
        className="w-100"
        defaultValue={value}
        disabled={isDisabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }

  if (inputType === 'checkbox') {
    return (
      <Checkbox
        defaultChecked={value}
        disabled={isDisabled}
        onChange={event => {
          onChange(event?.target?.checked);
        }}
        onBlur={onBlur}
      />
    );
  }

  if (inputType === 'text') {
    return (
      <Input
        defaultValue={value}
        disabled={isDisabled}
        onChange={event => {
          onChange(event?.target?.value);
        }}
        onBlur={onBlur}
      />
    );
  }

  return false;
};

export const validateValueByType = ({ type, value }) => {
  try {
    if (type === CONFIG_TYPES.NUMBER) {
      return _isNumber(value);
    }
    if (type === CONFIG_TYPES.STRING) {
      return _isString(value);
    }
    if (type === CONFIG_TYPES.BOOLEAN) {
      return _isBoolean(value);
    }
    if (type === CONFIG_TYPES.ARRAY) {
      return _isArray(JSON.parse(value));
    }
    if (type === CONFIG_TYPES.OBJECT) {
      return _isObject(JSON.parse(value));
    }

    return false;
  }
  catch (e) {
    return false;
  }
};

export const getParsedValueByType = ({ type, value }) => {
  try {
    if (type === CONFIG_TYPES.NUMBER) {
      return parseFloat(value);
    }
    if (type === CONFIG_TYPES.STRING || type === CONFIG_TYPES.BOOLEAN) {
      return value;
    }
    if (type === CONFIG_TYPES.ARRAY) {
      return JSON.parse(value);
    }
    if (type === CONFIG_TYPES.OBJECT) {
      return JSON.parse(value);
    }

    return undefined;
  }
  catch (e) {
    return undefined;
  }
};
