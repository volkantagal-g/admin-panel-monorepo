// library imports
import * as Yup from 'yup';
import { get, set } from 'lodash';

// shared imports
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { isNullOrEmpty } from '@shared/utils/common';

// local imports
import { businessConfigUpdateTypes } from '@app/pages/Market/BusinessConfig/constants';

// constants
const DEFAULT_MESSAGE_CONFIG_TYPE = 'Number';
const SELECTED_COUNTRY = getSelectedCountry();
const SELECTED_COUNTRY_CODE = get(SELECTED_COUNTRY, 'code.alpha2', '');

export const globalConfigValidationSchema = () => {
  return Yup.object()
    .shape({
      isCustomEnabled: Yup.boolean().optional(),
      value: Yup.number().optional(),
    });
};

export const countryBasedConfigValidationSchema = () => {
  return Yup.object()
    .shape({ [SELECTED_COUNTRY_CODE]: Yup.number().required() });
};

export const manipulateValuesAfterSubmit = ({ values, businessConfigUpdateType, formConfigKey }) => {
  let body = {};

  if (businessConfigUpdateType === businessConfigUpdateTypes.GLOBAL) {
    const { value, isCustomEnabled } = values;
    body = { value, isCustomEnabled };
  }

  if (businessConfigUpdateType === businessConfigUpdateTypes.COUNTRY_BASED) {
    body = { value: values?.[SELECTED_COUNTRY_CODE] };
  }

  const configType = DEFAULT_MESSAGE_CONFIG_TYPE;

  return { ...body, configType, configKey: formConfigKey };
};

export const getInitialValues = ({ config, isGlobal }) => {
  const initialValues = {};
  if (isGlobal) {
    const isCustomEnabled = get(config, 'isCustomEnabled', false);
    set(initialValues, 'isCustomEnabled', isCustomEnabled);
    const configValue = get(config, 'value', null);
    if (configValue) {
      if (!isNullOrEmpty(configValue)) set(initialValues, 'value', configValue);
    }
  }
  else {
    const configCustomValue = get(config, 'customValue', null);
    if (configCustomValue) {
      const configCountryValue = configCustomValue[SELECTED_COUNTRY_CODE];
      set(initialValues, `${SELECTED_COUNTRY_CODE}`, configCountryValue);
    }
  }
  return initialValues;
};
