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
      isActive: Yup.boolean().optional,
      isCustomEnabled: Yup.boolean().optional,
      aggressionLevel: Yup.number().optional,
    });
};

export const countryBasedConfigValidationSchema = () => {
  return Yup.object()
    .shape({
      isActive: Yup.boolean().optional,
      aggressionLevel: Yup.number().optional,
      isSameAggressionLevelActive: Yup.boolean().optional,
    });
};

export const manipulateValuesAfterSubmit = ({ __v, values, businessConfigUpdateType, formConfigKey }) => {
  let body = { __v };

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

export const getInitialValues = ({ config, isGlobal }) => {
  const selectedCountry = getSelectedCountry();
  const selectedCountryCode = get(selectedCountry, 'code.alpha2', '');
  const initialValues = {};
  if (isGlobal) {
    const isCustomEnabled = get(config, 'isCustomEnabled', false);
    set(initialValues, 'isCustomEnabled', isCustomEnabled);
    const configValue = get(config, 'value', null);
    if (configValue) {
      set(initialValues, 'isActive', configValue?.isActive || false);
      set(initialValues, 'aggressionLevel', configValue?.aggressionLevel || null);
    }
  }
  else {
    const configCustomValue = get(config, 'customValue', null);
    if (configCustomValue) {
      const configCustomCountryBasedValue = configCustomValue[selectedCountryCode];
      set(initialValues, 'isActive', configCustomCountryBasedValue?.isActive || false);
      set(initialValues, 'aggressionLevel', configCustomCountryBasedValue?.aggressionLevel || null);
      set(initialValues, 'isSameAggressionLevelActive', configCustomCountryBasedValue?.isSameAggressionLevelActive || false);
    }
  }
  return initialValues;
};
