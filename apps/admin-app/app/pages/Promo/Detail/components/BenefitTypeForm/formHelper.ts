import { find, isNumber } from 'lodash';
import { isNaN } from 'formik';

import { TFunction } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import {
  discountTypes,
  getBenefitType,
  PROMO_MECHANIC_TYPES,
  PROMO_MECHANICS,
  promoMechanics,
} from '@app/pages/Promo/constantValues';
import { PROMO_STATUS } from '@shared/shared/constants';
import { BenefitItem, BenefitType, Promo, PromoMechanic } from '@app/pages/Promo/types';
import { areMinAndMaxItemCountValid } from '@app/pages/Promo/Detail/utils';

export type SubmitPayload = ReturnType<typeof getOnlyModifiedValuesBeforeSubmit>
export const getOnlyModifiedValuesBeforeSubmit = ({
  values,
  benefitProducts,
}: {
  values: BenefitTypeFormType,
  benefitProducts: BenefitItem[]
}) => {
  const { benefitType } = values;

  const items = benefitProducts.map(product => {
    const {
      id,
      saleLimit,
      discountedPrice,
      supplierSupport,
      thirdPartySupport,
      supplierSupportReferenceId,
      thirdPartyReferenceId,
    } = product;
    return {
      id,
      saleLimit: saleLimit || null,
      discountedPrice: isNaN(discountedPrice) ? null : discountedPrice,
      supplierSupport,
      thirdPartySupport,
      supplierSupportReferenceId,
      thirdPartyReferenceId,
    };
  });

  const { amount, doNotCharge, discountAmount, ...newValues } = values;

  return {
    ...newValues,
    benefitType: benefitType ? Number(benefitType) : benefitType,
    items,
    discountAmount: Number(discountAmount),
    deliveryFee: {
      doNotCharge,
      amount: Number(amount),
    },
  };
};

export const validateValues = ({ values, promo, t, body, isListingPromo }: {
  values: BenefitTypeFormType,
  promo: Promo,
  t: TFunction,
  body: SubmitPayload,
  isListingPromo: boolean,
}) => {
  const { promoMechanic, isParent, status } = promo;
  const { items, discountAmount, maxItemCount } = values;

  if (promoMechanic === PROMO_MECHANIC_TYPES.BUY_X_GET_Y_FOR_FREE) {
    if (!items?.length && !isParent) {
      throw new Error(t('MESSAGE.ERR_PROMO_DISCOUNT_PRODUCTS'));
    }
    if (discountAmount <= 0) {
      throw new Error(t('BENEFIT_TYPE.ERRORS.ERR_DISCOUNT_AMOUNT_FIELD_SHOULD_BE_GREATOR_THAN_0'));
    }
  }
  if (promoMechanic === PROMO_MECHANIC_TYPES.STAR_DEALS) {
    if (maxItemCount <= 0) {
      throw new Error(t('BENEFIT_TYPE.ERRORS.ERR_MAX_ITEM_COUNT_FIELD_SHOULD_BE_GREATER_THAN_0'));
    }
    if (status === PROMO_STATUS.ACTIVE && !items?.length) {
      throw new Error(t('BENEFIT_TYPE.ERRORS.ERR_EMPTY_ITEM_LIST'));
    }
  }

  let isSAPRefCodeEmpty = false;
  let isSAPSupportRateEmpty = false;

  body?.items?.forEach(item => {
    const {
      supplierSupportReferenceId,
      supplierSupport,
      thirdPartyReferenceId,
      thirdPartySupport,
      discountedPrice,
    } = item;

    if (
      promoMechanic === PromoMechanic.BASKET_CHANGE_PRICE ||
      promoMechanic === PromoMechanic.STAR_DEALS
    ) {
      if (discountedPrice === null || discountedPrice === undefined) {
        throw new Error(t('BENEFIT_TYPE.ERRORS.ERR_DISCOUNTED_PRICE_FIELD_SHOULD_BE_GREATER_THAN_0'));
      }
    }

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

  if (!areMinAndMaxItemCountValid({
    isListingPromo,
    doNotAllowMultiUsage: values.doNotAllowMultiUsage,
    itemsCount: items.length,
    maxItemCount,
    conditionItemsCount: promo.condition.items.length,
    minItemCount: promo.condition.minItemCount,
  })) {
    throw new Error(t('ERRORS.MIN_MAX_COUNT_MUST_BE_CONSISTENT'));
  }
};

export const getDiscountRatio = (promo: Promo) => {
  let discountRatio;
  const benefitType = getBenefitType(promo);
  if (isNumber(promo.discountAmount) && benefitType === BenefitType.Amount) {
    discountRatio = `${promo.discountAmount}TL`;
  }
  else if (isNumber(promo.discountAmount) && benefitType === BenefitType.Percent) {
    discountRatio = promo.discountAmount === 0 ? '%100' : `%${promo.discountAmount * 100}`;
  }
  return discountRatio;
};

export type BenefitTypeFormType = ReturnType<typeof getInitialValues>
export const getInitialValues = (promo: Promo) => {
  return {
    benefitType: getBenefitType(promo).toString(),
    discountRatio: getDiscountRatio(promo),
    discountAmount: promo?.discountAmount || 0,
    maxItemCount: promo?.maxItemCount || (promo?.promoMechanic === PROMO_MECHANICS.STAR_DEALS ? 1 : 0),
    changePrice: promo?.changePrice || 0,
    amount: promo?.deliveryFee?.amount || null,
    doNotCharge: promo?.deliveryFee?.doNotCharge || false,
    items: promo?.items?.map(item => item.id) || [],
    doNotAllowMultiUsage: promo?.promoMechanic === PROMO_MECHANICS.STAR_DEALS ? true : promo?.doNotAllowMultiUsage,
  };
};

export const getDiscountTypesOptions = (promoMechanic: PromoMechanic) => {
  if (!promoMechanic) return [];
  return Object.entries(discountTypes[promoMechanic]).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value[getLangKey()],
    };
  });
};

export const getDiscountAmountText = (benefitType?: BenefitType) => {
  return benefitType === BenefitType.Percent ? '(0-1)' : '';
};

export const getBenefitCSVData = (items: BenefitItem[], shouldHaveDiscountedValue: boolean) => {
  if (!items.length) return [];

  return items.map(item => {
    return {
      item: item?.id,
      alreadySold: item?.saleLimit ? (item?.alreadySold || 0) : 'n/a',
      saleLimit: item?.saleLimit,
      ...(shouldHaveDiscountedValue && { discountedPrice: item?.discountedPrice }),
      supplierSupport: item?.supplierSupport,
      thirdPartySupport: item?.thirdPartySupport,
      supplierSupportReferenceId: item?.supplierSupportReferenceId,
      thirdPartyReferenceId: item?.thirdPartyReferenceId,
    };
  });
};

export const showMultiUsage = (promoMechanic: PromoMechanic) => {
  return (
    promoMechanic === PromoMechanic.BUY_X_AND_GET_Y_FOR_FREE ||
    promoMechanic === PromoMechanic.CHANGE_PRICE ||
    promoMechanic === PromoMechanic.BASKET_CHANGE_PRICE ||
    promoMechanic === PromoMechanic.STAR_DEALS
  );
};

export const validateSupportRate = (supportRate: string) => {
  return Math.min(Math.max(parseFloat(supportRate), 0), 1) || null;
};

/**
 * @description This function is used to parse the input value of the discount price
 * Please see https://github.com/react-component/input-number/blob/master/src/InputNumber.tsx#L206
 * to understand how this function will be used
 */
export const discountPriceNumberInputParser = (displayValue?: string | number): string => {
  let parsedStr = displayValue;
  if (!parsedStr) return '';
  if (typeof parsedStr === 'number') {
    parsedStr = parsedStr.toString();
  }
  parsedStr = parsedStr.replace(',', '.');

  return parsedStr.replace(/[^\w.-]+/g, '');
};

export const parseDiscountedPrice = (discountedPriceString: string | number) => {
  if (typeof discountedPriceString === 'number') return discountedPriceString;
  if (!discountedPriceString) return null;
  try {
    const transformedString = discountedPriceString.replace(',', '.');
    const parsedNumber = parseFloat(transformedString);
    return isNaN(parsedNumber) ? null : parsedNumber;
  }
  catch (error) {
    return null;
  }
};

export function findDuplicateProductId(products: string[]) {
  const seen = new Set();
  return find(products, product => seen.has(product) || !seen.add(product)) || null;
}

export function validateProductsPayload(promo: Promo, products: Record<string, string>[], t: TFunction) {
  const duplicateProductId = findDuplicateProductId(products.map(item => item.item));
  if (duplicateProductId) {
    return t('BENEFIT_TYPE.ERRORS.DUPLICATE_PRODUCT_ID', { productId: duplicateProductId });
  }

  for (let i = 0; i < products.length; ++i) {
    const {
      item,
      saleLimit,
      discountedPrice: discountedPriceString,
      supplierSupport,
      thirdPartySupport,
      supplierSupportReferenceId,
      thirdPartyReferenceId,
    } = products[i];

    const discountedPrice = parseDiscountedPrice(discountedPriceString);

    const shouldHaveDiscountedValue = promo.promoMechanic === PromoMechanic.BASKET_CHANGE_PRICE ||
      promo.promoMechanic === PromoMechanic.STAR_DEALS;

    if (shouldHaveDiscountedValue) {
      if (!discountedPriceString && discountedPrice === null) {
        return t('BENEFIT_TYPE.ERRORS.MISSING_DISCOUNTED_PRICE');
      }
      if (discountedPriceString && !discountedPrice) {
        return t('BENEFIT_TYPE.ERRORS.INVALID_DISCOUNTED_PRICE');
      }
    }
    if (!shouldHaveDiscountedValue && discountedPriceString !== undefined) {
      const promoTypeTranslation = promoMechanics[promo.promoMechanic][getLangKey()];
      return t('BENEFIT_TYPE.ERRORS.PROMO_TYPE_CANNOT_HAVE_DISCOUNTED_PRICE', { promoType: promoTypeTranslation });
    }
    if (
      (promo.promoMechanic !== PromoMechanic.BASKET_CHANGE_PRICE &&
        promo.promoMechanic !== PromoMechanic.STAR_DEALS) &&
      (item === undefined ||
        saleLimit === undefined ||
        supplierSupport === undefined ||
        thirdPartySupport === undefined ||
        supplierSupportReferenceId === undefined ||
        thirdPartyReferenceId === undefined
      )
    ) {
      return t('ERR_INVALID_CSV_FILE');
    }
  }
  return null;
}
