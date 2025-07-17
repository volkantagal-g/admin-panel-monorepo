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
  const feeType = t('FEE_TYPE.DELIVERY');

  return Yup.object().shape({
    deliveryFeeSource: Yup.string().oneOf([
      'FixedDeliveryFee',
      'DynamicDeliveryFee',
      'ZoneBasedLayeredDeliveryFee',
      'ZoneBasedFixedDeliveryFee',
      'LayeredDeliveryFee',
    ]).required(t('ERRORS.FEE_SOURCE_REQUIRED', { feeType })),
    domainType: Yup.string().required(t('ERRORS.DOMAIN_TYPE_REQUIRED')).oneOf(['1', '3']),
    dynamicDeliveryLevel: Yup.number().nullable(),
    fixedDeliveryFeeAmount: Yup.number().transform((value, originalValue) => (originalValue === '' ? null : value))
      .when('deliveryFeeSource', {
        is: 'FixedDeliveryFee',
        then: Yup.number().required(t('ERRORS.FIXED_FEE_AMOUNT_REQUIRED', { feeType })).min(0, t('ERRORS.NO_NEGATIVE_NUMBER')),
        otherwise: Yup.number().min(0, t('ERRORS.NO_NEGATIVE_NUMBER')).nullable(),
      }),
    freeDeliveryOrderNumber: Yup.number().transform((value, originalValue) => (originalValue === '' ?
      null : value)).positive().integer()
      .nullable(),
    fixedDeliveryFeeAmountZoneOne: Yup.number().transform((value, originalValue) => ((isNil(originalValue) || originalValue === '') ? null : value))
      .when('deliveryFeeSource', {
        is: 'ZoneBasedFixedDeliveryFee',
        then: Yup.number().required(t('ERRORS.FIXED_DELIVERY_FEE_AMOUNT_ZONE_ONE_REQUIRED')).min(0, t('ERRORS.NO_NEGATIVE_NUMBER')),
        otherwise: Yup.number().min(0, t('ERRORS.NO_NEGATIVE_NUMBER')).nullable(),
      }),
    fixedDeliveryFeeAmountZoneTwo: Yup.number().transform((value, originalValue) => ((isNil(originalValue) || originalValue === '') ? null : value))
      .when('deliveryFeeSource', {
        is: 'ZoneBasedFixedDeliveryFee',
        then: Yup.number().required(t('ERRORS.FIXED_DELIVERY_FEE_AMOUNT_ZONE_TWO_REQUIRED')).min(0, t('ERRORS.NO_NEGATIVE_NUMBER')),
        otherwise: Yup.number().min(0, t('ERRORS.NO_NEGATIVE_NUMBER')).nullable(),
      }),
    fixedDeliveryFeeAmountZoneThree: Yup.number().transform((value, originalValue) => ((isNil(originalValue) || originalValue === '') ? null : value))
      .when('deliveryFeeSource', {
        is: 'ZoneBasedFixedDeliveryFee',
        then: Yup.number().required('ERRORS.FIXED_DELIVERY_FEE_AMOUNT_ZONE_THREE_REQUIRED').min(0, t('ERRORS.NO_NEGATIVE_NUMBER')),
        otherwise: Yup.number().min(0, t('ERRORS.NO_NEGATIVE_NUMBER')).nullable(),
      }),
    layeredDeliveryFee: Yup.object()
      .when('deliveryFeeSource', {
        is: 'LayeredDeliveryFee',
        then: Yup.object().shape({
          regular: feeArrayValidation({ t, required: true }),
          peak: feeArrayValidation({ t, required: true }),
        }).required(t('ERRORS.LAYERED_FEE_REQUIRED'), { feeType }),
        otherwise: Yup.object().shape({
          regular: feeArrayValidation({ t }),
          peak: feeArrayValidation({ t }),
        }),
      }),
    dynamicDeliveryFee: Yup.object()
      .when('deliveryFeeSource', {
        is: 'DynamicDeliveryFee',
        then: Yup.object().shape({
          levelOne: feeArrayValidation({ t, required: true }),
          levelTwo: feeArrayValidation({ t, required: true }),
          levelThree: feeArrayValidation({ t, required: true }),
          levelFour: feeArrayValidation({ t, required: true }),
          levelFive: feeArrayValidation({ t, required: true }),
        }).required(t('ERRORS.DYNAMIC_FEE_REQUIRED'), { feeType }),
        otherwise: Yup.object().shape({
          levelOne: feeArrayValidation({ t }),
          levelTwo: feeArrayValidation({ t }),
          levelThree: feeArrayValidation({ t }),
          levelFour: feeArrayValidation({ t }),
          levelFive: feeArrayValidation({ t }),
        }),
      }),
    zoneBasedLayeredDeliveryFee: Yup.object()
      .when('deliveryFeeSource', {
        is: 'ZoneBasedLayeredDeliveryFee',
        then: Yup.object().shape({
          levelOne: feeArrayValidation({ t, required: true }),
          levelTwo: feeArrayValidation({ t, required: true }),
          levelThree: feeArrayValidation({ t, required: true }),
        }).required(t('ERRORS.ZONE_BASED_LAYERED_DELIVERY_FEE_REQUIRED')),
        otherwise: Yup.object().shape({
          levelOne: feeArrayValidation({ t }),
          levelTwo: feeArrayValidation({ t }),
          levelThree: feeArrayValidation({ t }),
        }),
      }),
  })
    .test(
      'zone-based-fixed-all-or-none',
      t('ERRORS.INVALID_ZONE_BASED_LAYERED_DELIVERY_FEE'),
      values => {
        const { fixedDeliveryFeeAmountZoneOne, fixedDeliveryFeeAmountZoneTwo, fixedDeliveryFeeAmountZoneThree } = values;
        const fields = [fixedDeliveryFeeAmountZoneOne, fixedDeliveryFeeAmountZoneTwo, fixedDeliveryFeeAmountZoneThree];

        const allNil = fields.every(val => isNil(val));
        const allFilled = fields.every(val => !isNil(val));

        return allNil || allFilled;
      },
    );
};

export const formatDeliveryFeeValuesBeforeSubmit = (values = {}) => {
  const {
    deliveryFeeSource,
    fixedDeliveryFeeAmount,
    layeredDeliveryFee,
    dynamicDeliveryFee,
    freeDeliveryOrderNumber,
    domainType,
    zoneBasedFixedDeliveryFeeAmount,
    zoneBasedLayeredDeliveryFee,
  } = values;
  let formattedValues = {
    fixedDeliveryFeeAmount,
    deliveryFeeSource,
    freeDeliveryOrderNumber,
    domainType,
    zoneBasedFixedDeliveryFeeAmount,
    zoneBasedLayeredDeliveryFee,
  };
  Object.keys(formattedValues).forEach(key => {
    formattedValues[key] = extractFeeValuesFromArray(formattedValues[key]);
  });
  if (!isEmpty(layeredDeliveryFee)) {
    formattedValues = {
      ...formattedValues,
      layeredDeliveryFee: getMinAndFeeValues(layeredDeliveryFee),
    };
  }
  if (!isEmpty(dynamicDeliveryFee)) {
    formattedValues = {
      ...formattedValues,
      dynamicDeliveryFee: getMinAndFeeValues(dynamicDeliveryFee),
    };
  }
  if (!isEmpty(zoneBasedLayeredDeliveryFee)) {
    formattedValues = {
      ...formattedValues,
      zoneBasedLayeredDeliveryFee: getMinAndFeeValues(zoneBasedLayeredDeliveryFee),
    };
  }
  return formattedValues;
};

const normalizeDeliveryFeeDetails = feeDetails => {
  let normalizedDynamicDeliveryFee = feeDetails.dynamicDeliveryFee;
  let normalizedLayeredDeliveryFee = feeDetails.layeredDeliveryFee;
  let normalizedZoneBasedLayeredDeliveryFee = feeDetails.zoneBasedLayeredDeliveryFee;
  let normalizedZoneBasedFixedDeliveryFeeAmount = feeDetails.zoneBasedFixedDeliveryFeeAmount;

  if (isNil(normalizedDynamicDeliveryFee) || isEmpty(normalizedDynamicDeliveryFee)) {
    normalizedDynamicDeliveryFee = undefined;
  }

  if ((isNil(normalizedDynamicDeliveryFee?.[1]) || isEmpty(normalizedDynamicDeliveryFee?.[1])) &&
  (isNil(normalizedDynamicDeliveryFee?.[2]) || isEmpty(normalizedDynamicDeliveryFee?.[2])) &&
  (isNil(normalizedDynamicDeliveryFee?.[3]) || isEmpty(normalizedDynamicDeliveryFee?.[3])) &&
  (isNil(normalizedDynamicDeliveryFee?.[4]) || isEmpty(normalizedDynamicDeliveryFee?.[4])) &&
  (isNil(normalizedDynamicDeliveryFee?.[5]) || isEmpty(normalizedDynamicDeliveryFee?.[5]))) {
    normalizedDynamicDeliveryFee = undefined;
  }

  normalizedLayeredDeliveryFee = {
    ...(isEmpty(normalizedLayeredDeliveryFee?.regular) ? {} : { regular: normalizedLayeredDeliveryFee.regular }),
    ...(isEmpty(normalizedLayeredDeliveryFee?.peak) ? {} : { peak: normalizedLayeredDeliveryFee.peak }),
  };

  if (isNil(normalizedLayeredDeliveryFee) || isEmpty(normalizedLayeredDeliveryFee)) {
    normalizedLayeredDeliveryFee = undefined;
  }

  if ((isNil(normalizedLayeredDeliveryFee?.regular) || isEmpty(normalizedLayeredDeliveryFee?.regular)) &&
  (isNil(normalizedLayeredDeliveryFee?.peak) || isEmpty(normalizedLayeredDeliveryFee?.peak))) {
    normalizedLayeredDeliveryFee = undefined;
  }

  if (isNil(normalizedZoneBasedLayeredDeliveryFee) || isEmpty(normalizedZoneBasedLayeredDeliveryFee)) {
    normalizedZoneBasedLayeredDeliveryFee = undefined;
  }
  if ((isNil(normalizedZoneBasedLayeredDeliveryFee?.[1]) || isEmpty(normalizedZoneBasedLayeredDeliveryFee?.[1])) &&
  (isNil(normalizedZoneBasedLayeredDeliveryFee?.[2]) || isEmpty(normalizedZoneBasedLayeredDeliveryFee?.[2])) &&
  (isNil(normalizedZoneBasedLayeredDeliveryFee?.[3]) || isEmpty(normalizedZoneBasedLayeredDeliveryFee?.[3]))) {
    normalizedZoneBasedLayeredDeliveryFee = undefined;
  }

  if (isNil(normalizedZoneBasedFixedDeliveryFeeAmount) || isEmpty(normalizedZoneBasedFixedDeliveryFeeAmount)) {
    normalizedZoneBasedFixedDeliveryFeeAmount = [
      { fee: undefined },
      { fee: undefined },
      { fee: undefined },
    ];
  }
  if (isNil(normalizedZoneBasedFixedDeliveryFeeAmount[0])) normalizedZoneBasedFixedDeliveryFeeAmount[0] = { fee: undefined };
  if (isNil(normalizedZoneBasedFixedDeliveryFeeAmount[1])) normalizedZoneBasedFixedDeliveryFeeAmount[1] = { fee: undefined };
  if (isNil(normalizedZoneBasedFixedDeliveryFeeAmount[2])) normalizedZoneBasedFixedDeliveryFeeAmount[2] = { fee: undefined };

  return {
    ...feeDetails,
    dynamicDeliveryFee: normalizedDynamicDeliveryFee,
    layeredDeliveryFee: normalizedLayeredDeliveryFee,
    zoneBasedLayeredDeliveryFee: normalizedZoneBasedLayeredDeliveryFee,
    zoneBasedFixedDeliveryFeeAmount: normalizedZoneBasedFixedDeliveryFeeAmount,
  };
};

export function getInitialValues({
  feeDetails,
  domainType,
  dynamicDeliveryLevel,
}) {
  const normalizedDeliveryFeeDetails = normalizeDeliveryFeeDetails(feeDetails);

  const {
    deliveryFeeSource,
    fixedDeliveryFeeAmount,
    freeDeliveryOrderNumber,
    dynamicDeliveryFee,
    layeredDeliveryFee,
    zoneBasedFixedDeliveryFeeAmount,
    zoneBasedLayeredDeliveryFee,
  } = normalizedDeliveryFeeDetails;

  const selectedDomainType = getSelectedDomainType(domainType);

  let feeValues = {};
  if (!isEmpty(dynamicDeliveryFee)) {
    feeValues = {
      ...feeValues,
      dynamicDeliveryFee: { ...getDynamicFeeValues(dynamicDeliveryFee) },
    };
  }
  if (!isEmpty(zoneBasedLayeredDeliveryFee)) {
    feeValues = {
      ...feeValues,
      zoneBasedLayeredDeliveryFee: { ...getDynamicFeeValues(zoneBasedLayeredDeliveryFee) },
    };
  }
  if (!isEmpty(layeredDeliveryFee)) {
    const { regular, peak } = layeredDeliveryFee;
    feeValues = { ...feeValues, layeredDeliveryFee: { regular, peak } };
  }

  return {
    ...normalizedDeliveryFeeDetails,
    ...feeValues,
    fixedDeliveryFeeAmount,
    dynamicDeliveryLevel,
    deliveryFeeSource,
    freeDeliveryOrderNumber,
    domainType: selectedDomainType?.value,
    fixedDeliveryFeeAmountZoneOne: zoneBasedFixedDeliveryFeeAmount?.[1]?.fee,
    fixedDeliveryFeeAmountZoneTwo: zoneBasedFixedDeliveryFeeAmount?.[2]?.fee,
    fixedDeliveryFeeAmountZoneThree: zoneBasedFixedDeliveryFeeAmount?.[3]?.fee,
  };
}

export const validateDeliveryFees = ({
  deliveryFeeSource,
  fixedDeliveryFeeAmount,
  layeredDeliveryFee,
  dynamicDeliveryFee,
  zoneBasedLayeredDeliveryFee,
  zoneBasedFixedDeliveryFeeAmount,
  t,
}) => {
  if (!deliveryFeeSource) {
    return tError(t, 'INVALID_DELIVERY_FEE_SOURCE');
  }
  if (
    deliveryFeeSource === 'FixedDeliveryFee' &&
    !isValidFeeValue(fixedDeliveryFeeAmount)
  ) {
    return tError(t, 'INVALID_DELIVERY_FIXED_AMOUNT');
  }
  if (deliveryFeeSource === 'DynamicDeliveryFee') {
    const feeValues = Object.values(dynamicDeliveryFee);
    if (isEmpty(dynamicDeliveryFee) || Object.keys(dynamicDeliveryFee).length < 5) {
      return tError(t, 'INVALID_DYNAMIC_DELIVERY_FEE');
    }
    if (feeValues.some(feeValue => !hasMinFeeValue(feeValue))) {
      return tError(t, 'INVALID_MIN_DELIVERY_FEE');
    }
  }
  if (deliveryFeeSource === 'ZoneBasedLayeredDeliveryFee') {
    const feeValues = Object.values(zoneBasedLayeredDeliveryFee);
    if (isEmpty(zoneBasedLayeredDeliveryFee) || Object.keys(zoneBasedLayeredDeliveryFee).length < 3) {
      return tError(t, 'INVALID_ZONE_BASED_LAYERED_DELIVERY_FEE');
    }
    if (feeValues.some(feeValue => !hasMinFeeValue(feeValue))) {
      return tError(t, 'INVALID_MIN_DELIVERY_FEE');
    }
  }
  if (deliveryFeeSource === 'ZoneBasedFixedDeliveryFee') {
    const feeValues = Object.values(zoneBasedFixedDeliveryFeeAmount);
    if (feeValues.every(feeValue => !feeValue?.fee)) {
      return tError(t, 'INVALID_ZONE_BASED_FIXED_DELIVERY_FEE');
    }
  }
  if (deliveryFeeSource === 'LayeredDeliveryFee') {
    const { peak, regular } = layeredDeliveryFee ?? {};
    if (isEmpty(peak) || isEmpty(regular)) {
      return tError(t, 'INVALID_LAYERED_DELIVERY_FEE');
    }
    if (!hasMinFeeValue(peak) || !hasMinFeeValue(regular)) {
      return tError(t, 'INVALID_MIN_DELIVERY_FEE');
    }
  }
  return undefined;
};
