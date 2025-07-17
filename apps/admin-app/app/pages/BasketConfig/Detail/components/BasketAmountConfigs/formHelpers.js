import * as Yup from 'yup';

import { basketAmountSourceMap } from '../../constants';
import { getLangKey, t as translate } from '@shared/i18n';

const validateMaxBasketAmount = (minBasket, schema, { value }) => {
  return minBasket > 0 && value > 0
    ? schema.moreThan(
      minBasket,
      translate('basketConfigPage:ERRORS.INVALID_MAXIMUM_BASKET_AMOUNT_AMOUNT'),
    )
    : schema;
};

export const validationSchema = () => Yup.object().shape({
  minDiscountedAmount: Yup.number().min(0),
  maxDiscountedAmount: Yup.number()
    .min(0)
    .when('minDiscountedAmount', validateMaxBasketAmount),
  zoneOneMinDiscountedAmount: Yup.number().min(0),
  zoneOneMaxDiscountedAmount: Yup.number()
    .min(0)
    .when('zoneOneMinDiscountedAmount', validateMaxBasketAmount),
  zoneTwoMinDiscountedAmount: Yup.number().min(0),
  zoneTwoMaxDiscountedAmount: Yup.number()
    .min(0)
    .when('zoneTwoMinDiscountedAmount', validateMaxBasketAmount),
  zoneThreeMinDiscountedAmount: Yup.number().min(0),
  zoneThreeMaxDiscountedAmount: Yup.number()
    .min(0)
    .when('zoneThreeMinDiscountedAmount', validateMaxBasketAmount),
  basketAmountSource: Yup.string(),
});

export const basketAmountOptions = Object.keys(basketAmountSourceMap).map(
  key => ({
    value: key,
    label: basketAmountSourceMap[key]?.[getLangKey()],
  }),
);

export const getInitialValues = ({
  minDiscountedAmount,
  maxDiscountedAmount,
  zoneOneMinDiscountedAmount,
  zoneOneMaxDiscountedAmount,
  zoneTwoMinDiscountedAmount,
  zoneTwoMaxDiscountedAmount,
  zoneThreeMinDiscountedAmount,
  zoneThreeMaxDiscountedAmount,
  domainType,
  basketAmountSource,
} = {}) => ({
  minDiscountedAmount,
  maxDiscountedAmount,
  zoneOneMinDiscountedAmount,
  zoneOneMaxDiscountedAmount,
  zoneTwoMinDiscountedAmount,
  zoneTwoMaxDiscountedAmount,
  zoneThreeMinDiscountedAmount,
  zoneThreeMaxDiscountedAmount,
  domainType,
  basketAmountSource,
});

export const formatValuesBeforeSubmit = ({
  minDiscountedAmount,
  maxDiscountedAmount,
  zoneOneMinDiscountedAmount,
  zoneOneMaxDiscountedAmount,
  zoneTwoMinDiscountedAmount,
  zoneTwoMaxDiscountedAmount,
  zoneThreeMinDiscountedAmount,
  zoneThreeMaxDiscountedAmount,
  basketAmountSource,
}) => ({
  minDiscountedAmount,
  maxDiscountedAmount,
  basketAmountSource,
  zoneBasedBasketAmounts: {
    1: {
      minDiscountedAmount: zoneOneMinDiscountedAmount,
      maxDiscountedAmount: zoneOneMaxDiscountedAmount,
    },
    2: {
      minDiscountedAmount: zoneTwoMinDiscountedAmount,
      maxDiscountedAmount: zoneTwoMaxDiscountedAmount,
    },
    3: {
      minDiscountedAmount: zoneThreeMinDiscountedAmount,
      maxDiscountedAmount: zoneThreeMaxDiscountedAmount,
    },
  },
});

export const validateMinAndMaxBasketAmounts = ({
  minDiscountedAmount,
  maxDiscountedAmount,
} = {}) => {
  return Number(minDiscountedAmount) >= 0 && Number(maxDiscountedAmount) >= 0;
};

export const validateBasketAmounts = ({
  basketAmountSource,
  minDiscountedAmount,
  maxDiscountedAmount,
  zoneBasedBasketAmounts,
  t,
}) => {
  if (!basketAmountSource) {
    return t('ERRORS.INVALID_BASKET_AMOUNT_FEE_SOURCE');
  }
  if (
    basketAmountSource === 'FixedBasketAmount' &&
    !validateMinAndMaxBasketAmounts({
      minDiscountedAmount,
      maxDiscountedAmount,
    })
  ) {
    return t('ERRORS.INVALID_BASKET_AMOUNT_AMOUNT');
  }
  if (basketAmountSource === 'ZoneBasedBasketAmount') {
    const zoneBasketAmounts = Object.values(zoneBasedBasketAmounts);
    if (
      !zoneBasketAmounts.every(basketAmounts => validateMinAndMaxBasketAmounts(basketAmounts))
    ) {
      return t('ERRORS.INVALID_ZONE_BASED_BASKET_AMOUNT');
    }
  }
  return undefined;
};
