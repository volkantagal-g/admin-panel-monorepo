/* eslint-disable func-names */
import * as Yup from 'yup';
import { isEmpty, isNil } from 'lodash';

import {
  extractFeeValuesFromArray,
  getDynamicFeeValues,
  getMinAndFeeValues,
  getSelectedDomainType,
  hasMinFeeValue,
  isValidFeeValue,
  tError,
} from '../../../utils';

import { feeArrayValidation } from '@app/pages/MarketFees/Detail/components/shared/formHelpers';

const { getFormattedSelectOptions } = require('@app/pages/MarketOrder/OrderFilter/components/Filter/utils');

export { getFormattedSelectOptions };

export const validationSchema = t => {
  const feeType = t('FEE_TYPE.SERVICE');

  return Yup.object().shape({
    serviceFeeSource: Yup.string().oneOf(
      ['LayeredServiceFee', 'DynamicServiceFee', 'FixedServiceFee'],
      t('ERRORS.INVALID_SERVICE_FEE_SOURCE'),
    ).required(t('ERRORS.FEE_SOURCE_REQUIRED', { feeType })),
    domainType: Yup.string().required(t('ERRORS.DOMAIN_TYPE_REQUIRED')).oneOf(['1', '3']),
    dynamicServiceLevel: Yup.number().nullable(),
    fixedServiceFeeAmount: Yup.number().transform((value, originalValue) => (originalValue === '' ? null : value))
      .when('serviceFeeSource', {
        is: 'FixedServiceFee',
        then: Yup.number().required(t('ERRORS.FIXED_FEE_AMOUNT_REQUIRED', { feeType })).min(0, t('ERRORS.NO_NEGATIVE_NUMBER')),
        otherwise: Yup.number().min(0, t('ERRORS.NO_NEGATIVE_NUMBER')).nullable(),
      }),
    layeredServiceFee: Yup.object().when('serviceFeeSource', {
      is: 'LayeredServiceFee',
      then: Yup.object().shape({
        regular: feeArrayValidation({ t, required: true }).required(t('ERRORS.LAYERED_FEE_REGULAR_REQUIRED', { feeType })),
        peak: feeArrayValidation({ t, required: true }).required(t('ERRORS.LAYERED_FEE_PEAK_REQUIRED', { feeType })),
      }).required(t('ERRORS.LAYERED_FEE_REQUIRED')),
      otherwise: Yup.object().shape({
        regular: feeArrayValidation({ t }),
        peak: feeArrayValidation({ t }),
      }),
    }),
    dynamicServiceFee: Yup.object().when('serviceFeeSource', {
      is: 'DynamicServiceFee',
      then: Yup.object().shape({
        levelOne: feeArrayValidation({ t, required: true }).required(t('ERRORS.DYNAMIC_FEE_LEVEL_ONE_REQUIRED'), { feeType }),
        levelTwo: feeArrayValidation({ t, required: true }).required(t('ERRORS.DYNAMIC_FEE_LEVEL_TWO_REQUIRED'), { feeType }),
        levelThree: feeArrayValidation({ t, required: true }).required(t('ERRORS.DYNAMIC_FEE_LEVEL_THREE_REQUIRED'), { feeType }),
        levelFour: feeArrayValidation({ t, required: true }).required(t('ERRORS.DYNAMIC_FEE_LEVEL_FOUR_REQUIRED'), { feeType }),
        levelFive: feeArrayValidation({ t, required: true }).required(t('ERRORS.DYNAMIC_FEE_LEVEL_FIVE_REQUIRED'), { feeType }),
      }).required(t('ERRORS.DYNAMIC_FEE_REQUIRED')),
      otherwise: Yup.object().shape({
        levelOne: feeArrayValidation({ t }),
        levelTwo: feeArrayValidation({ t }),
        levelThree: feeArrayValidation({ t }),
        levelFour: feeArrayValidation({ t }),
        levelFive: feeArrayValidation({ t }),
      }),
    }),
  });
};

export const formatServiceFeeValuesBeforeSubmit = (values = {}) => {
  const {
    serviceFeeSource,
    fixedServiceFeeAmount,
    layeredServiceFee,
    dynamicServiceFee,
  } = values;
  let formattedValues = { fixedServiceFeeAmount, serviceFeeSource };
  Object.keys(formattedValues).forEach(key => {
    formattedValues[key] = extractFeeValuesFromArray(formattedValues[key]);
  });
  if (!isEmpty(layeredServiceFee)) {
    formattedValues = {
      ...formattedValues,
      layeredServiceFee: getMinAndFeeValues(layeredServiceFee),
    };
  }
  if (!isEmpty(dynamicServiceFee)) {
    formattedValues = {
      ...formattedValues,
      dynamicServiceFee: getMinAndFeeValues(dynamicServiceFee),
    };
  }
  return formattedValues;
};

const normalizeServiceFeeDetails = feeDetails => {
  let normalizedDynamicServiceFee = feeDetails.dynamicServiceFee;
  let normalizedLayeredServiceFee = feeDetails.layeredServiceFee;

  if (isNil(normalizedDynamicServiceFee) || isEmpty(normalizedDynamicServiceFee)) {
    normalizedDynamicServiceFee = undefined;
  }

  if ((isNil(normalizedDynamicServiceFee?.[1]) || isEmpty(normalizedDynamicServiceFee?.[1])) &&
  (isNil(normalizedDynamicServiceFee?.[2]) || isEmpty(normalizedDynamicServiceFee?.[2])) &&
  (isNil(normalizedDynamicServiceFee?.[3]) || isEmpty(normalizedDynamicServiceFee?.[3])) &&
  (isNil(normalizedDynamicServiceFee?.[4]) || isEmpty(normalizedDynamicServiceFee?.[4])) &&
  (isNil(normalizedDynamicServiceFee?.[5]) || isEmpty(normalizedDynamicServiceFee?.[5]))) {
    normalizedDynamicServiceFee = undefined;
  }

  normalizedLayeredServiceFee = {
    ...(isEmpty(normalizedLayeredServiceFee?.regular) ? {} : { regular: normalizedLayeredServiceFee.regular }),
    ...(isEmpty(normalizedLayeredServiceFee?.peak) ? {} : { peak: normalizedLayeredServiceFee.peak }),
  };

  if (isNil(normalizedLayeredServiceFee) || isEmpty(normalizedLayeredServiceFee)) {
    normalizedLayeredServiceFee = undefined;
  }

  if ((isNil(normalizedLayeredServiceFee?.regular) || isEmpty(normalizedLayeredServiceFee?.regular)) &&
  (isNil(normalizedLayeredServiceFee?.peak) || isEmpty(normalizedLayeredServiceFee?.peak))) {
    normalizedLayeredServiceFee = undefined;
  }

  return {
    ...feeDetails,
    dynamicServiceFee: normalizedDynamicServiceFee,
    layeredServiceFee: normalizedLayeredServiceFee,
  };
};

export function getInitialValues({
  feeDetails,
  domainType,
  dynamicServiceLevel,
}) {
  const normalizedFeeDetails = normalizeServiceFeeDetails(feeDetails);

  const {
    serviceFeeSource,
    fixedServiceFeeAmount,
    dynamicServiceFee,
    layeredServiceFee,
  } = normalizedFeeDetails;

  const selectedDomainType = getSelectedDomainType(domainType);

  let feeValues = {};
  if (!isEmpty(dynamicServiceFee)) {
    feeValues = {
      ...feeValues,
      dynamicServiceFee: { ...getDynamicFeeValues(dynamicServiceFee) },
    };
  }
  if (!isEmpty(layeredServiceFee)) {
    const { regular, peak } = layeredServiceFee;
    feeValues = { ...feeValues, layeredServiceFee: { peak, regular } };
  }
  return {
    ...normalizedFeeDetails,
    ...feeValues,
    fixedServiceFeeAmount,
    dynamicServiceLevel,
    serviceFeeSource,
    domainType: selectedDomainType?.value,
  };
}

export const validateServiceFees = ({
  serviceFeeSource,
  fixedServiceFeeAmount,
  layeredServiceFee,
  dynamicServiceFee,
  t,
}) => {
  if (!serviceFeeSource) {
    return tError(t, 'INVALID_SERVICE_FEE_SOURCE');
  }
  if (
    serviceFeeSource === 'FixedServiceFee' &&
    !isValidFeeValue(fixedServiceFeeAmount)
  ) {
    return tError(t, 'INVALID_SERVICE_FIXED_AMOUNT');
  }
  if (serviceFeeSource === 'DynamicServiceFee') {
    const feeValues = Object.values(dynamicServiceFee);
    if (isEmpty(dynamicServiceFee) || Object.keys(dynamicServiceFee).length < 5) {
      return tError(t, 'INVALID_DYNAMIC_SERVICE_FEE');
    }
    if (feeValues.some(feeValue => !hasMinFeeValue(feeValue))) {
      return tError(t, 'INVALID_MIN_SERVICE_FEE');
    }
  }
  if (serviceFeeSource === 'LayeredServiceFee') {
    const { peak, regular } = layeredServiceFee ?? {};
    if (isEmpty(peak) || isEmpty(regular)) {
      return tError(t, 'INVALID_LAYERED_SERVICE_FEE');
    }
    if (!hasMinFeeValue(peak) || !hasMinFeeValue(regular)) {
      return tError(t, 'INVALID_MIN_SERVICE_FEE');
    }
  }
  return undefined;
};
