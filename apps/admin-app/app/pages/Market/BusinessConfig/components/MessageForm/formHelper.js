// library imports
import * as Yup from 'yup';
import { get, set, omit } from 'lodash';

// shared imports
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

// local imports
import { businessConfigUpdateTypes } from '@app/pages/Market/BusinessConfig/constants';

// constants
const DEFAULT_MESSAGE_CONFIG_TYPE = 'Object';

export const globalConfigValidationSchema = () => {
  return Yup.object()
    .shape({
      configLanguages: Yup.array().of(Yup.string()).optional(),
      isCustomEnabled: Yup.boolean().optional(),
    });
};

export const countryBasedConfigValidationSchema = () => {
  return Yup.object()
    .shape({ configLanguages: Yup.array().of(Yup.string()).optional() });
};

export const manipulateValuesAfterSubmit = ({ values, businessConfigUpdateType, formConfigKey }) => {
  let body = {};

  if (businessConfigUpdateType === businessConfigUpdateTypes.GLOBAL) {
    const { isCustomEnabled } = values;
    const messages = omit(values, 'isCustomEnabled');
    body = { value: messages, isCustomEnabled };
  }

  if (businessConfigUpdateType === businessConfigUpdateTypes.COUNTRY_BASED) {
    body = { value: values };
  }

  const configType = DEFAULT_MESSAGE_CONFIG_TYPE;

  return { ...body, configType, configKey: formConfigKey };
};

export const getInitialValues = ({ config, isGlobal, configEligibleLanguages }) => {
  const selectedCountry = getSelectedCountry();
  const selectedCountryCode = get(selectedCountry, 'code.alpha2', '');
  const initialValues = {};
  if (isGlobal) {
    const isCustomEnabled = get(config, 'isCustomEnabled', false);
    set(initialValues, 'isCustomEnabled', isCustomEnabled);
    const configValue = get(config, 'value', null);
    if (configValue) {
      configEligibleLanguages.forEach(configLanguage => {
        set(initialValues, `${configLanguage}`, configValue?.[configLanguage]);
      });
    }
    else {
      configEligibleLanguages.forEach(configLanguage => {
        set(initialValues, `${configLanguage}`, '');
      });
    }
  }
  else {
    const configCustomValue = get(config, 'customValue', null);
    if (configCustomValue) {
      configEligibleLanguages.forEach(configLanguage => {
        set(initialValues, `${configLanguage}`, configCustomValue?.[selectedCountryCode]?.[configLanguage] || null);
      });
    }
    else {
      configEligibleLanguages.forEach(configLanguage => {
        set(initialValues, `${configLanguage}`, '');
      });
    }
  }
  return initialValues;
};
