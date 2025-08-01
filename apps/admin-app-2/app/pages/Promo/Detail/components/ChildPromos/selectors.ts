import { createSelector } from '@reduxjs/toolkit';

import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { ChildrenPromosSlice } from '@app/pages/Promo/Detail/components/ChildPromos/slice';

export const selectFilteredPromos = createSelector(
  [PromoDetailSlice.selectors.children, ChildrenPromosSlice.selectors.getTableParams],
  (children, tableParams) => {
    const status = tableParams?.filters?.status as number[];
    const masterIds = tableParams?.filters?.master as MongoIDType[];
    const search = tableParams?.promoCode;

    return children.filter(child => {
      if (status && !status.includes(child.status)) return false;
      if (masterIds && (!child.parentId || !masterIds.includes(child.parentId))) return false;
      return !search || child.promoCode.toLowerCase().includes(search.toLowerCase()) || child._id === search.trim();
    });
  },
);
