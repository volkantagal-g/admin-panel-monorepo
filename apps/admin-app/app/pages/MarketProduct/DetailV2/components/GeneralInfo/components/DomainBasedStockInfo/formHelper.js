import * as Yup from 'yup';
import { isFinite } from 'lodash';

import { GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, GETIR_VOYAGER_DOMAIN_TYPE } from '@shared/shared/constants';

export const validationSchema = (values, { t, initialWeight }) => {
  return (Yup.object()
    .shape({
      getir10Limit: Yup.number()
        .min(0)
        .nullable(true)
        .test(
          'initialWeightControl',
          t('DOMAIN_BASED_STOCK_INFO.GETIR_10_VALUE_MUST_BE_MORE_OR_EQUAL_STARTING_WEIGHT'),
          getir10Limit => {
            if (isFinite(getir10Limit) && isFinite(initialWeight)) {
              return initialWeight <= getir10Limit;
            }
            return true;
          },
        ),
      getir30Limit: Yup.number()
        .min(0)
        .nullable(true)
        .test(
          'initialWeightControl',
          t('DOMAIN_BASED_STOCK_INFO.GETIR_30_VALUE_MUST_BE_MORE_OR_EQUAL_STARTING_WEIGHT'),
          getir30Limit => {
            if (isFinite(getir30Limit) && isFinite(initialWeight)) {
              return initialWeight <= getir30Limit;
            }
            return true;
          },
        ),
      getirVoyagerLimit: Yup.number()
        .min(0)
        .nullable(true)
        .test(
          'initialWeightControl',
          t('DOMAIN_BASED_STOCK_INFO.GETIR_VOYAGER_VALUE_MUST_BE_MORE_OR_EQUAL_STARTING_WEIGHT'),
          getirVoyagerLimit => {
            if (isFinite(getirVoyagerLimit) && isFinite(initialWeight)) {
              return initialWeight <= getirVoyagerLimit;
            }
            return true;
          },
        ),
    })
  );
};

const getModifiedInitialValues = values => {
  const newValues = { ...values };
  return newValues;
};

export const getModifiedValues = values => {
  const newValues = {
    domainUpperLimits: [
      ...(isFinite(values.getir10Limit) ? [{ domainType: GETIR_10_DOMAIN_TYPE, upperLimit: values.getir10Limit }] : []),
      ...(isFinite(values.getir30Limit) ? [{ domainType: GETIR_MARKET_DOMAIN_TYPE, upperLimit: values.getir30Limit }] : []),
      ...(isFinite(values.getirVoyagerLimit) ? [{ domainType: GETIR_VOYAGER_DOMAIN_TYPE, upperLimit: values.getirVoyagerLimit }] : []),
    ],
  };
  return newValues;
};

export const getInitialValues = marketProduct => {
  const { domainUpperLimits = [] } = marketProduct || {};
  const initialValues = {
    getir10Limit: domainUpperLimits?.find(({ domainType } = {}) => domainType === GETIR_10_DOMAIN_TYPE)?.upperLimit,
    getir30Limit: domainUpperLimits?.find(({ domainType } = {}) => domainType === GETIR_MARKET_DOMAIN_TYPE)?.upperLimit,
    getirVoyagerLimit: domainUpperLimits?.find(({ domainType } = {}) => domainType === GETIR_VOYAGER_DOMAIN_TYPE)?.upperLimit,
  };
  return getModifiedInitialValues(initialValues);
};
