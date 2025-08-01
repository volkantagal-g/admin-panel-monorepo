import * as Yup from 'yup';

import { areMinAndMaxItemCountValid } from '@app/pages/Promo/Detail/utils';
import { PROMO_MECHANIC_TYPES } from '@app/pages/Promo/constantValues';

export const getOnlyModifiedValuesBeforeSubmit = ({ values, conditionalProducts }) => {
  const items = conditionalProducts.map(product => {
    if (typeof product === 'string') return product;
    const { id, isSold, supplierSupport, thirdPartySupport, supplierSupportReferenceId, thirdPartyReferenceId } = product;
    return {
      id,
      isSold,
      supplierSupport,
      thirdPartySupport,
      supplierSupportReferenceId,
      thirdPartyReferenceId,
    };
  });
  const newValues = { ...values, items };
  if (!newValues.minItemCount) newValues.minItemCount = 0;
  if (!newValues.minItemTotalAmount) newValues.minItemTotalAmount = 0;
  return { ...newValues };
};

export const validateValues = ({ values, promoMechanic, t, body, isListingPromo, promo }) => {
  const { items, minItemCount } = values;
  const emptyItems = (!items || !items.length);

  if (promoMechanic === PROMO_MECHANIC_TYPES.BUY_X_GET_Y_UNIT_DISCOUNT) {
    if (emptyItems) {
      throw new Error(t('MESSAGE.ERR_PROMO_DISCOUNT_PRODUCTS'));
    }
    if (minItemCount <= 0) {
      throw new Error(t('CONDITION_PRODUCTS.ERRORS.ERR_MIN_REQ_ITEM_COUNT_SHOULD_BE_GREATOR_THAN'));
    }
  }

  if (promoMechanic === PROMO_MECHANIC_TYPES.BUY_X_GET_Y_FOR_FREE) {
    if (emptyItems) {
      throw new Error(t('MESSAGE.ERR_PROMO_DISCOUNT_PRODUCTS'));
    }
    if (minItemCount <= 0) {
      throw new Error(t('CONDITION_PRODUCTS.ERRORS.ERR_MIN_REQ_ITEM_COUNT_SHOULD_BE_GREATOR_THAN'));
    }
  }

  if ((promoMechanic === PROMO_MECHANIC_TYPES.PAY_X_UNIT_TAKE_Y_UNIT_DISCOUNT) && emptyItems) {
    throw new Error(t('MESSAGE.ERR_PROMO_DISCOUNT_PRODUCTS'));
  }

  let isSAPRefCodeEmpty = false;
  let isSAPSupportRateEmpty = false;

  body?.items?.forEach(item => {
    const { supplierSupportReferenceId, supplierSupport, thirdPartyReferenceId, thirdPartySupport } = item;

    if ((supplierSupport && !supplierSupportReferenceId) || (thirdPartySupport && !thirdPartyReferenceId)) {
      isSAPRefCodeEmpty = true;
    }

    if ((!supplierSupport && supplierSupportReferenceId) || (!thirdPartySupport && thirdPartyReferenceId)) {
      isSAPSupportRateEmpty = true;
    }
  });

  if (isSAPSupportRateEmpty) {
    throw new Error(t('ERRORS.ERR_EMPTY_SAP_SUPPORT_RATE'));
  }
  if (isSAPRefCodeEmpty) {
    throw new Error(t('ERRORS.ERR_EMPTY_SAP_REF_CODE'));
  }

  if (isListingPromo && minItemCount > 5) {
    throw new Error(t('CONDITION_PRODUCTS.ERRORS.MAX_ITEM_COUNT_FOR_LISTING_PROMO'));
  }

  if (!areMinAndMaxItemCountValid({
    isListingPromo,
    doNotAllowMultiUsage: promo.doNotAllowMultiUsage,
    itemsCount: promo.items.length,
    conditionItemsCount: items.length,
    minItemCount,
    maxItemCount: promo.maxItemCount,

  })) {
    throw new Error(t('ERRORS.MIN_MAX_COUNT_MUST_BE_CONSISTENT'));
  }
};

export const getConditionalCSVData = items => {
  if (!items.length) return [];
  return items.map(item => {
    return {
      item: typeof item === 'string' ? item : item?.id,
      // saleLimit: item?.saleLimit,
      supplierSupport: item?.supplierSupport,
      thirdPartySupport: item?.thirdPartySupport,
      supplierSupportReferenceId: item?.supplierSupportReferenceId,
      thirdPartyReferenceId: item?.thirdPartyReferenceId,
    };
  });
};

const IsNumberRegex = /^\d+$/;

export const ConditionProductValidationScheme = t => {
  return Yup.array().of(Yup.object({
    item: Yup.string().typeError(t('CONDITION_PRODUCTS.ERRORS.ERR_ITEM_REQUIRED')),
    supplierSupport: Yup.number()
      .min(0, t('CONDITION_PRODUCTS.ERRORS.ERR_SUPPLIER_SUPPORT_MIN_MAX'))
      .max(1, t('CONDITION_PRODUCTS.ERRORS.ERR_SUPPLIER_SUPPORT_MIN_MAX'))
      .nullable(),
    supplierSupportReferenceId: Yup.string()
      .matches(IsNumberRegex, t('CONDITION_PRODUCTS.ERRORS.ERR_SUPPLIER_REF_ID_MUST_BE_NUMBER'))
      .nullable(),
    thirdPartySupport: Yup.number()
      .min(0, t('CONDITION_PRODUCTS.ERRORS.ERR_THIRD_PARTY_SUPPORT_MIN_MAX'))
      .max(1, t('CONDITION_PRODUCTS.ERRORS.ERR_THIRD_PARTY_SUPPORT_MIN_MAX'))
      .nullable(),
    thirdPartyReferenceId: Yup.string()
      .matches(IsNumberRegex, t('CONDITION_PRODUCTS.ERRORS.ERR_THIRD_PARTY_REFERENCE_ID_REQUIRED'))
      .nullable(),
  }).test('supplier-support-rate-and-reference-id', t('CONDITION_PRODUCTS.ERRORS.ERR_SUPPLIER_SUPPORT_RATE_AND_REF_ID'), value => {
    const { supplierSupport, supplierSupportReferenceId } = value;
    return !(supplierSupport && !supplierSupportReferenceId);
  }).test('third-party-support-rate-and-reference-id', t('CONDITION_PRODUCTS.ERRORS.ERR_THIRD_PARTY_SUPPORT_RATE_AND_REF_ID'), value => {
    const { thirdPartySupport, thirdPartyReferenceId } = value;
    return !(thirdPartySupport && !thirdPartyReferenceId);
  }));
};

export const productsFilterFn = (inputValue, option) => {
  const stringValueMatches = typeof option?.value === 'string' && option.value.toUpperCase().includes(inputValue.toUpperCase());
  const numberValueMatches = typeof option?.value === 'number' && option.value.toString().toUpperCase().includes(inputValue.toUpperCase());
  const labelMatches = typeof option?.label === 'string' && option.label.toUpperCase().includes(inputValue.toUpperCase());
  return stringValueMatches || numberValueMatches || labelMatches;
};
