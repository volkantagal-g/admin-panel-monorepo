import moment from 'moment';

import * as Yup from 'yup';

import { getProviderType, getSupportRate, getSupportAmount } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BundleRules/formHelper';
import { STRUCK_PRICE_SUPPORTER_TYPE } from '@shared/shared/constants';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { priceFormatter } from '@app/pages/MarketProduct/utils';

export const useMergeBundlePricings = (data = []) => {
  const normalPrices = data?.filter(({ isDiscounted }) => isDiscounted) || [];
  const struckPrices = data?.filter(({ isDiscounted }) => isDiscounted !== true) || [];

  const dataMap = new Map();
  normalPrices.forEach(item => {
    const key = JSON.stringify({ domainType: item?.domainType, warehouseId: item?.warehouseId });
    dataMap.set(key, item);
  });

  struckPrices.forEach(({ domainType, warehouseId, price }) => {
    const key = JSON.stringify({ domainType, warehouseId });
    if (dataMap.has(key)) {
      dataMap.set(key, { ...dataMap.get(key), struckPrice: price });
    }
  });

  return Array.from(dataMap.values());
};

export const getInitialValues = values => ({
  price: priceFormatter(values?.price),
  providerType: getProviderType(values?.financials)?.toString(),
  supportRate: getSupportRate(values?.financials) * 100,
  supportAmount: getSupportAmount((values?.financials)),
  isShownUnderSpecialOffers: !!values?.financials?.isShownUnderSpecialOffers,
  dateRanges: [moment(values?.startDate), moment(values?.endDate)],
  limit: values?.limit,
  isAmount: values?.financials?.isAmount,
  supplierId: values?.financials?.supplierId,
});

export const validationSchema = (_, { isCoreDomainPrice, isDiscounted }) => Yup.object().shape({
  price: Yup.number().min(0).required(),
  dateRanges: Yup.array().of(Yup.date()).when('a', (a, schema) => {
    if (isCoreDomainPrice) {
      return schema;
    }
    return schema.required();
  }),
  limit: Yup.number().min(0).nullable(),
  isShownUnderSpecialOffers: Yup.boolean(),
  providerType: Yup.string().when('a', (a, schema) => {
    if (isDiscounted) {
      return schema.required();
    }
    return schema;
  }),
  supplierId: Yup.string().when('providerType', {
    is: val => (Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER || Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY),
    then: schema => schema.required(),
    otherwise: schema => schema,
  }),
  supportRate: Yup.number().when('providerType', {
    is: val => Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER || Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY,
    then: schema => schema.min(0).max(100).required(),
    otherwise: schema => schema,
  }),
});

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};
