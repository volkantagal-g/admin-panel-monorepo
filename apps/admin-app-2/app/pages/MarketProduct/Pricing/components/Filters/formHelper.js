import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { isObjectIdValid } from '@shared/utils/common';
import { PRICE_OPTION } from '@app/pages/MarketProduct/Pricing/constants';

export const getModifiedFormValues = values => {
  const productIds = values?.productIds ?? [];
  const productIdsFromName = values?.names ?? [];
  const uniqProductIds = [...new Set([...productIdsFromName, ...productIds])];
  const newFormValues = { ...values, productIds: uniqProductIds, priceOption: values?.priceOption ?? 0 };
  delete newFormValues.names;
  delete newFormValues.dateRanges;
  return newFormValues;
};

export const hasInvalidProductId = (productIds, t) => {
  for (let i = 0; i < productIds.length; i += 1) {
    if (!isObjectIdValid(productIds[i])) {
      return ToastCreators.error({ message: `${t('INVALID_PRODUCT_ID')} :${productIds[i]}` });
    }
  }
  return false;
};

export const getPriceOptions = t => Object.entries(PRICE_OPTION)?.map(([key, value]) => ({
  value,
  label: t(`PRICE_OPTIONS.${key}`),
}));
