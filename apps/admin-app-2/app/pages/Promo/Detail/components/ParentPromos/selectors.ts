import { createSelector } from '@reduxjs/toolkit';

import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { ParentPromosSlice } from '@app/pages/Promo/Detail/components/ParentPromos/slice';

export const selectFilteredPromos = createSelector(
  [PromoDetailSlice.selectors.parents, ParentPromosSlice.selectors.getTableParams],
  (parents, tableParams) => {
    const search = tableParams?.promoCode;

    return parents.filter(parent => {
      return !search || parent.promoCode.toLowerCase().includes(search.toLowerCase()) || parent._id === search.trim();
    });
  },
);
