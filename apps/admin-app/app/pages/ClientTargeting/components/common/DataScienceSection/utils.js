import * as Yup from 'yup';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { PARAMETER_TYPE } from '@app/pages/Report/constants';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

import { getLangKey, t } from '@shared/i18n';

import { clientListSections } from '../../../constants';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  GETIR_JOB_DOMAIN_TYPE,
  GETIR_FINANCE_DOMAIN_TYPE,
} from '@shared/shared/constants';

export const getReportValidationFromReportType = (reportType, readOnly) => {
  let schema = Yup.object().shape({});
  reportType?.parameters?.forEach(param => {
    const { rawType, variableName, dropdownOptions, isOptional, includeCurrentDay, validations } = param;

    let paramSchema = null;

    switch (rawType) {
      case PARAMETER_TYPE.date:
        paramSchema = Yup.date();
        if (!includeCurrentDay) {
          paramSchema = paramSchema.test('current-day-test', 'Cannot be current day', value => {
            if (moment().startOf('day').isBefore(moment(value))) {
              return false;
            }
            return true;
          });
        }
        break;
      case PARAMETER_TYPE.boolean:
        paramSchema = Yup.boolean();
        break;
      case PARAMETER_TYPE.string:
        paramSchema = Yup.string().trim();
        break;
      case PARAMETER_TYPE.number:
        paramSchema = Yup.number();
        break;
      case PARAMETER_TYPE.dropdown:
        paramSchema = Yup.mixed().oneOf(dropdownOptions.map(opt => opt.value));
        break;
      case PARAMETER_TYPE.csvArrayOfObject:
        paramSchema = Yup.array().of(Yup.object());
        break;
      default:
        paramSchema = Yup.array().of(Yup.string());
        break;
    }

    if (!isEmpty(validations)) {
      Object.keys(validations).forEach(validationKey => {
        const minMaxValue = validations[validationKey];
        switch (validationKey) {
          case 'min':
            paramSchema = paramSchema.min(minMaxValue, t('baseYupError:NUMBER.MIN', { min: minMaxValue }));
            break;
          case 'max':
            paramSchema = paramSchema.max(minMaxValue, t('baseYupError:NUMBER.MAX', { max: minMaxValue }));
            break;
          default:
            break;
        }
      });
    }

    if (!isOptional && !readOnly) {
      paramSchema = paramSchema.required(t('error:REQUIRED'));
    }

    schema = schema.shape({ [variableName]: paramSchema });
  });

  return schema;
};

export const MAPPED_DOMAIN_TYPES_TO_SECTION_KEYS = {
  [GETIR_10_DOMAIN_TYPE]: clientListSections.getir10ServiceDetail,
  [GETIR_MARKET_DOMAIN_TYPE]: clientListSections.getirMoreServiceDetail,
  [GETIR_VOYAGER_DOMAIN_TYPE]: clientListSections.getirWaterServiceDetail,
  [GETIR_FOOD_DOMAIN_TYPE]: clientListSections.getirFoodServiceDetail,
  [GETIR_LOCALS_DOMAIN_TYPE]: clientListSections.getirLocalsServiceDetail,
  [GETIR_BITAKSI_DOMAIN_TYPE]: clientListSections.getirBitaksiServiceDetail,
  [GETIR_WATER_MARKETPLACE_DOMAIN_TYPE]: clientListSections.getirWaterMarketPlaceServiceDetail,
  [GETIR_JOB_DOMAIN_TYPE]: clientListSections.getirJobServiceDetail,
  [GETIR_FINANCE_DOMAIN_TYPE]: clientListSections.getirFinanceServiceDetail,
  [-1]: 'allDomains',
};

export const getInitialValues = ({ model, state }) => {
  const initialValues = {};

  model?.inputList?.forEach(param => {
    const { inputType, variableName } = param;

    if (!isEmpty(state)) {
      initialValues[variableName] = state[variableName];
      return;
    }

    switch (inputType) {
      case PARAMETER_TYPE.date:
        initialValues[variableName] = null;
        break;
      case PARAMETER_TYPE.boolean:
        initialValues[variableName] = false;
        break;
      case PARAMETER_TYPE.string:
        initialValues[variableName] = '';
        break;
      case PARAMETER_TYPE.number:
        initialValues[variableName] = undefined;
        break;
      case PARAMETER_TYPE.dropdown:
        initialValues[variableName] = undefined;
        break;
      case PARAMETER_TYPE.country:
        initialValues[variableName] = [getSelectedCountry()._id];
        break;
      default:
        initialValues[variableName] = [];
        break;
    }
  });

  return initialValues;
};

export const mapInputTypes = {
  Date: 'date',
  DateRange: 'dateRange',
  Dropdown: 'select',
  Boolean: 'checkbox',
  Number: 'number',
  String: 'text',
};

export const getDynamicFieldsForDataScienceModels = inputs => {
  if (isEmpty(inputs)) return null;

  return inputs.map(input => {
    return {
      ...input,
      ...input.validations,
      type: mapInputTypes[input.inputType],
      inputType: mapInputTypes[input.inputType],
      rawType: input.inputType,
      fieldName: input.variableName,
      label: input.name[getLangKey()] || Object.values(input.name).find(language => !!language),
      initialSelectables: input.dropdownOptions?.map(option => ({ ...option, label: option.name[getLangKey()] })),
      formItemWrapperClassName: 'data-science-form-wrapper',
    };
  });
};

export const convertModelToReportType = model => {
  if (isEmpty(model)) return null;

  return {
    ...model,
    parameters: getDynamicFieldsForDataScienceModels(model.inputList),
  };
};
