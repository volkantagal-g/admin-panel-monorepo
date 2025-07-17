import { getLangKey } from '@shared/i18n';
import {
  countryPaymentMethods,
  foodPromoBasketValueBehaviorTypes,
  promoFinancedBy,
} from '@app/pages/Promo/constantValues';
import { PROMO_FINANCED_BY } from '@shared/shared/constants';

export const getOnlyModifiedValuesBeforeSubmit = ({ values }) => {
  const cardBins = values.cardBins.map(item => {
    return item.value ? item.value : item;
  });
  const foodBasketValueBehaviorType = values.foodBasketValueBehaviorType ? +values.foodBasketValueBehaviorType : undefined;
  const paymentMethods = values.paymentMethods?.map(paymentMethod => {
    return paymentMethod.value ? +paymentMethod.value : +paymentMethod;
  });

  const supplier = values.promoFinancedBy !== PROMO_FINANCED_BY.GETIR.toString() ? values.supplier : null;

  return {
    ...values,
    cardBins,
    foodBasketValueBehaviorType,
    paymentMethods,
    supplier,
    supplierSupportRate: values.promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER.toString() ? values.supplierSupportRate : 0,
    thirdPartySupportRate: values.promoFinancedBy === PROMO_FINANCED_BY.THIRD_PARTY.toString() ? values.thirdPartySupportRate : 0,
    isFreeProduct: values.promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER.toString() ? values.isFreeProduct : false,
  };
};

export const getPaymentMethodsOptions = selectedCountry => {
  return countryPaymentMethods?.[selectedCountry?._id].map(paymentMethod => {
    return {
      value: paymentMethod?._id?.toString(),
      label: paymentMethod?.name?.[getLangKey()],
    };
  });
};

export const getFinancedByOptions = () => {
  return Object.entries(promoFinancedBy).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value[getLangKey()],
    };
  });
};

export const getFoodBasketValueBehaviorTypeOptions = () => {
  return Object.entries(foodPromoBasketValueBehaviorTypes).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value[getLangKey()],
    };
  });
};

export const validateValues = ({ values, t }) => {
  const { cardBins } = values;
  const wrongCartBins = [];

  cardBins.forEach(cartBinObj => {
    const cartBin = cartBinObj.value ? cartBinObj?.value : cartBinObj;
    if ((cartBin.length !== 6 && cartBin.length !== 8) || !(/^\d+$/.test(cartBin))) {
      wrongCartBins.push(cartBin);
    }
  });

  if (wrongCartBins.length > 0) {
    throw new Error(`${t('FINANCIAL_CONDITION.ERORRS.ERR_INVALID_CARD_BIN_LIST')}${JSON.stringify(wrongCartBins, 1)}`);
  }

  if (
    values.promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER.toString() && (values.supplierSupportRate <= 0 || values.supplierSupportRate > 1)
  ) {
    throw new Error(t('FINANCIAL_CONDITION.ERORRS.ERR_SUPPLIER_SUPPORT_RATE'));
  }

  if (
    values.promoFinancedBy === PROMO_FINANCED_BY.THIRD_PARTY.toString() && (values.thirdPartySupportRate <= 0 || values.thirdPartySupportRate > 1)
  ) {
    throw new Error(t('FINANCIAL_CONDITION.ERORRS.ERR_THIRD_PARTY_RATE'));
  }

  if (
    (values.supplierSupportRate > 0 || values.thirdPartySupportRate > 0) && !values.supplier
  ) {
    throw new Error(t('FINANCIAL_CONDITION.ERORRS.SUPPLIER_SHOULD_BE_SELECTED'));
  }
};
