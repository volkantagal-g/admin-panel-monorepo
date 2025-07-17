import { badgePromoMechanics } from '@app/pages/Promo/constantValues';

import { getLangKey } from '@shared/i18n';
import { IFilters } from '../../interfaces';

export const getPromoMechanicOptions = () => {
  return Object.entries(badgePromoMechanics).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getInitialValues = (): IFilters => {
  return {
    name: null,
    promoMechanic: null,
  };
};

export const getValuesBeforeSearch = (values: IFilters) => {
  const { name, promoMechanic } = values;
  return {
    name,
    promoMechanic,
  };
};
