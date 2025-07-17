import { TFunction } from 'react-i18next';

import {
  badgePromoMechanics,
  basketPromoMechanics,
  discountReasons,
  PROMO_HIERARCHY_TRANSLATIONS,
  tabPromoMechanics,
} from '@app/pages/Promo/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { DiscountReason, PromoHierarchy } from '@app/pages/Promo/types';

export type CreatePromoFormType = {
  promoMechanic: number | null;
  promoCode: string;
  discountReason: DiscountReason | null;
  hierarchy: PromoHierarchy
}

export const getPromoMechanicOptions = (isMasterPromo: boolean, t: TFunction) => {
  const tabPromos = {
    label: t('NEW_PROMO.TAB_PROMOS'),
    options: convertConstantValuesToSelectOptions(tabPromoMechanics),
  };
  const listingPromos = {
    label: t('NEW_PROMO.LISTING_PROMOS'),
    options: convertConstantValuesToSelectOptions(badgePromoMechanics),
  };
  const basketPromos = {
    label: t('NEW_PROMO.BASKET_PROMOS'),
    options: convertConstantValuesToSelectOptions(basketPromoMechanics),
  };

  if (isMasterPromo) {
    return [listingPromos];
  }

  return [listingPromos, basketPromos, tabPromos];
};

export const getDiscountReasonOptions = () => {
  return convertConstantValuesToSelectOptions(discountReasons);
};

export const getPromoHierarchyOptions = () => {
  const { [PromoHierarchy.Child]: _, ...rest } = PROMO_HIERARCHY_TRANSLATIONS;
  return convertConstantValuesToSelectOptions(rest);
};

export const CREATE_PROMO_FORM_INITIAL_VALUES: CreatePromoFormType = {
  promoMechanic: null,
  promoCode: '',
  discountReason: DiscountReason.General,
  hierarchy: PromoHierarchy.Single,
};
