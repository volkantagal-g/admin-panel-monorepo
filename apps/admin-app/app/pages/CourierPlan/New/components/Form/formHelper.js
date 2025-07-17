import * as Yup from 'yup';
import moment from 'moment';

import { GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';

export const defaultValues = {
  planDate: [moment(), moment()],
  name: '',
  properties: {
    warehouseDomainType: [],
    referenceDay1: [
      moment().subtract(1, 'day'),
      moment().subtract(1, 'day'),
    ],
    referenceDay2: null,
    excludedDays: [],
    rate1: 1,
    rate2: 0,
    getirFoodRate: '',
    getirLocalsRate: '',
  },
};

const MAX_ALLOWED_SELECTABLE_DOMAIN_TYPE_COUNT = 2;

export const calculateRate2ByRate1 = rate1 => {
  const rateSplittedArray = rate1.toString().split('.');
  let decimalLength = 1;
  if (rateSplittedArray.length > 1) {
    decimalLength = rateSplittedArray[1].length;
  }
  return parseFloat((1 - rate1).toFixed(decimalLength));
};

const hasAllowedDomainTypes = (source, allowedDomainTypes) => {
  return (
    source.filter(sourceType => {
      return sourceType && allowedDomainTypes.some(allowedType => {
        let hasType = allowedType[0] === sourceType[0];
        const allowedTypeLength = allowedType.length;
        if (allowedTypeLength === sourceType.length && allowedTypeLength > 1) {
          for (let i = 1; i < MAX_ALLOWED_SELECTABLE_DOMAIN_TYPE_COUNT; i += 1) {
            hasType = hasType && allowedType[i] === sourceType[i];
          }
        }
        return hasType;
      });
    }).length > 0
  );
};

export const validationFns = {
  isPlanDateDisabledFor: current => current && current < moment().startOf('day'),
  isWarehouseDomainTypeSelectable: selectedWarehouseDomainTypes => selectedWarehouseDomainTypes.length < MAX_ALLOWED_SELECTABLE_DOMAIN_TYPE_COUNT,
  isReferenceDayDisabledFor: current => current && current > moment().startOf('day'),
  isExcludedDaysDisabledFor: (current, properties) => {
    const isInTheFuture = current && current > moment().startOf('day');
    const isOutOfReferenceDay1 = current && (current < properties.referenceDay1[0]
      || moment(current).startOf('day') > properties.referenceDay1[1]);
    const isOutOfReferenceDay2 = properties.referenceDay2 ? (current
      && (current < properties.referenceDay2[0] || moment(current).startOf('day') > properties.referenceDay2[1])) : true;
    return isInTheFuture || (isOutOfReferenceDay1 && isOutOfReferenceDay2);
  },
  isGetirFoodDisabled: selectedWarehouseDomainTypes => {
    const allowedDomainTypes = [[GETIR_10_DOMAIN_TYPE], [GETIR_MARKET_DOMAIN_TYPE], [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE]];
    return !hasAllowedDomainTypes(selectedWarehouseDomainTypes, allowedDomainTypes);
  },
  isGetirLocalsDisabled: selectedWarehouseDomainTypes => {
    const allowedDomainTypes = [[GETIR_10_DOMAIN_TYPE], [GETIR_LOCALS_DOMAIN_TYPE]];
    return !hasAllowedDomainTypes(selectedWarehouseDomainTypes, allowedDomainTypes);
  },
};

export const validationSchema = t => {
  return Yup.object().shape({
    planDate: Yup.array().required(),
    name: Yup.string().trim().min(2).max(64)
      .required(t('error:REQUIRED')),
    properties: Yup.object().shape({
      warehouseDomainType: Yup.array().required(t('error:REQUIRED')).max(MAX_ALLOWED_SELECTABLE_DOMAIN_TYPE_COUNT),
      referenceDay1: Yup.array().required(t('error:REQUIRED')),
      referenceDay2: Yup.array().nullable(),
      excludedDays: Yup.array().optional(),
      rate1: Yup.number().required(t('error:REQUIRED')).min(0).max(1),
      rate2: Yup.number().required(t('error:REQUIRED')).min(0).max(1),
      getirFoodRate: Yup.string()
        .optional()
        .when('warehouseDomainType', (warehouseDomainType, schema) => {
          if (!validationFns.isGetirFoodDisabled(warehouseDomainType)) {
            return schema.required(t('error:REQUIRED'));
          }
          return schema;
        }),
      getirLocalsRate: Yup.string()
        .optional()
        .when('warehouseDomainType', (warehouseDomainType, schema) => {
          if (!validationFns.isGetirLocalsDisabled(warehouseDomainType)) {
            return schema.required(t('error:REQUIRED'));
          }
          return schema;
        }),
    }),
  });
};
