import * as Yup from 'yup';
import { isNumber, mapValues } from 'lodash';

import { t } from '@shared/i18n';
import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';

export const defaultValues = GETIR_MARKET_DOMAIN_TYPES.reduce((acc, curr) => {
  // eslint-disable-next-line no-param-reassign
  acc[curr] = {};
  return acc;
}, {});

const itemValidationSchema = Yup.object().shape({
  ORDER_LIMITS: Yup.object().shape({
    MINIMUM_DISCOUNTED_AMOUNT: Yup.number().nullable().min(0),
    MAXIMUM_DISCOUNTED_AMOUNT: Yup.number()
      .nullable()
      .label(t('warehousePage:MAXIMUM_DISCOUNTED_AMOUNT'))
      .when('MINIMUM_DISCOUNTED_AMOUNT', (minimumDiscountedAmount, schema) => {
        if (isNumber(minimumDiscountedAmount)) {
          return schema.moreThan(minimumDiscountedAmount, t('error:ERR_MAX_DISCOUNTED_AMOUNT_CANT_BE_EQUAL_OR_LESS_THAN_MIN'));
        }
        return schema;
      }),
  }),
  ORDER_DELIVERY_FEE: Yup.object().shape({
    AMOUNT: Yup.number().min(0).nullable(),
    STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO: Yup.number().when(['AMOUNT'], (amount, schema) => {
      if (isNumber(amount) && amount === 0) {
        return schema.min(0.01).typeError(t('baseYupError:MIXED.REQUIRED')).required();
      }

      return schema.nullable();
    }),
    DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X: Yup.number().min(0).nullable(),
    DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT: Yup.number().min(0).nullable(),
    LAYERS: Yup.array().of(
      Yup.object().shape({
        min: Yup.number().required(),
        fee: Yup.number().required(),
        key: Yup.string(),
      }),
    ),
    SURGE_FEE_LAYERS: Yup.array().of(
      Yup.object().shape({
        min: Yup.number().required(),
        fee: Yup.number().required(),
        key: Yup.string(),
      }),
    ),
  }),
  ORDER_SERVICE_FEE: Yup.object().shape({
    LAYERS: Yup.array().of(
      Yup.object().shape({
        min: Yup.number().required(),
        fee: Yup.number().required(),
        key: Yup.string(),
      }),
    ),
    SURGE_FEE_LAYERS: Yup.array().of(
      Yup.object().shape({
        min: Yup.number().required(),
        fee: Yup.number().required(),
        key: Yup.string(),
      }),
    ),
  }),
});

export const validationSchema = () => {
  return Yup.object().shape(mapValues(defaultValues, () => itemValidationSchema));
};
