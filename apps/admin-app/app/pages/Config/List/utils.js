import _get from 'lodash/get';
import _isNumber from 'lodash/isNumber';

import { getLangKey } from '@shared/i18n';
import { getInputType } from '../utils';
import { CONFIG_TYPES } from '@app/pages/Config/constants';

export const getDefaultValueByType = ({ type }) => {
  if (type === 'Boolean') {
    return false;
  }
  if (type === 'Object') {
    return {};
  }
  if (type === 'Array') {
    return [];
  }

  return undefined;
};

export const getFormattedInputValue = ({ type, value, key }) => {
  if (type === CONFIG_TYPES.NUMBER) {
    return _isNumber(value) && parseFloat(value);
  }
  if (type === CONFIG_TYPES.STRING || type === CONFIG_TYPES.BOOLEAN) {
    return value;
  }
  if (type === CONFIG_TYPES.ARRAY) {
    return JSON.stringify(value) ?? [];
  }
  if (type === CONFIG_TYPES.OBJECT) {
    return JSON.stringify(value) ?? {};
  }

  throw Error(`Unexpected configuration value - key: ${key} type: ${type} - value: ${value}`);
};

export const getTableChildrenFromCustomValues = (
  { customValue = {}, isCustomEnabled, type, key, __v } = {},
  { countries = [] } = {},
) => {
  if (!isCustomEnabled) {
    return null;
  }

  const children = [];

  const langKey = getLangKey();
  countries?.forEach(country => {
    const countryCode = _get(country, 'code.alpha2', null);
    const countryName = _get(country, ['name', langKey], null);
    const defaultValue = getDefaultValueByType({ type });
    children.push({
      type,
      parentConfig: key,
      parentConfigVersion: __v,
      key: `${countryName} - (${countryCode})`,
      rowKey: `${key} - ${countryName} - (${countryCode})`,
      inputType: getInputType({ type, key }),
      rawValue: customValue[countryCode] ?? defaultValue,
      value: getFormattedInputValue({
        type,
        key,
        value: customValue[countryCode] ?? defaultValue,
      }),
      country: {
        code: countryCode,
        name: countryName,
      },
      isChild: true,
    });
  });

  return children;
};

export const getConfigsAfterFormat = (configs = [], { countries }) => {
  return configs.map(config => {
    try {
      return {
        key: config.key,
        type: config.type,
        inputType: getInputType({ type: config.type, key: config.key }),
        isCustomEnabled: !!config.isCustomEnabled,
        customValue: config.customValue || {},
        rawValue: config.value,
        value: getFormattedInputValue({
          type: config.type,
          value: config.value,
          key: config.key,
        }),
        isParent: true,
        description: config.description,
        responsibleSquad: config.responsibleTeam,
        __v: _get(config, '__v'),
        ...(!!config.isCustomEnabled && { children: getTableChildrenFromCustomValues(config, { countries }) }),
      };
    }
    catch (e) {
      return {
        key: config.key,
        rawValue: config.value,
        value: `Unexpected configuration: ${JSON.stringify(config)}`,
        type: 'String',
        inputType: 'text',
        isCustomEnabled: !!config.isCustomEnabled,
        customValue: {},
        isUnexpected: true,
        __v: _get(config, '__v'),
      };
    }
  });
};
