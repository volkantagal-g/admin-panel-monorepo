import type { FormikErrors } from 'formik/dist/types';

import { Action } from 'redux';

import { PROMO_FINANCED_BY } from '@shared/shared/constants';
import { Promo, PromoMechanic, PromoMechanicsSet, Supplier } from '@app/pages/Promo/types';
import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export const getSupplierOptions = (suppliers: Supplier[], isCurrentCountryTurkey = true) => {
  if (isCurrentCountryTurkey) {
    return suppliers.filter(supplier => !!supplier.supplierReferenceId).sort((a, b) => a.name.localeCompare(b.name)).map(supplier => {
      return {
        value: supplier.supplierReferenceId ?? '',
        label: supplier.name,
        key: supplier._id,
      };
    });
  }
  return suppliers.sort((a, b) => a.name.localeCompare(b.name)).map(supplier => {
    return {
      value: supplier._id,
      label: supplier.name,
      key: supplier._id,
    };
  });
};

export const getFinancedBy = (promo: Promo) => {
  const { supplierSupportRate, thirdPartySupportRate, isFreeProduct } = promo;

  if (supplierSupportRate > 0 && thirdPartySupportRate === 0) {
    return PROMO_FINANCED_BY.SUPPLIER.toString();
  }

  if (supplierSupportRate === 0 && thirdPartySupportRate > 0 && !isFreeProduct) {
    return PROMO_FINANCED_BY.THIRD_PARTY.toString();
  }

  if (supplierSupportRate === 0 && thirdPartySupportRate === 0 && !isFreeProduct) {
    return PROMO_FINANCED_BY.GETIR.toString();
  }

  return null;
};

export function flatArrayError<T>(errors: FormikErrors<T>, fieldPrefix: keyof T) {
  const errorKey = Object.keys(errors).find(key => key.startsWith(`${String(fieldPrefix)}[`));
  return errorKey ? errors[errorKey as keyof T] : undefined;
}

export function createToastError(error: any): Action {
  const errorTranslationKey = error?.response?.data?.message;
  const errorMessage = errorTranslationKey ? t(`promoPage:MESSAGE.${errorTranslationKey}`) : null;
  return ToastCreators.error({ message: errorMessage, ...(!errorMessage && { error }) });
}

export function sortByCreatedAt(a: { createdAt: string }, b: { createdAt: string }) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export function getPromoMechanicsSet(promoMechanic: Promo['promoMechanic']): Promo['promoMechanicsSet'] {
  if ([PromoMechanic.BUY_X_AND_GET_Y_FOR_FREE, PromoMechanic.BUY_X_GET_Y_TL_DISCOUNT, PromoMechanic.CHANGE_PRICE].includes(promoMechanic)) {
    return PromoMechanicsSet.Listing;
  }

  if ([
    PromoMechanic.X_TL_PLUS_ORDERS_GET_Y_FOR_FREE,
    PromoMechanic.PAY_X_TL_TAKE_Y_TL,
    PromoMechanic.PERCENT_DISCOUNT,
    PromoMechanic.BASKET_CHANGE_PRICE].includes(promoMechanic)) {
    return PromoMechanicsSet.Tab;
  }

  return PromoMechanicsSet.Basket;
}
