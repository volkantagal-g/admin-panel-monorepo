import { createSelector } from '@reduxjs/toolkit';

import { SelectPromoSlice } from '@shared/containers/Select/Promo/slice';

export const selectData = (slice: string) => createSelector(
  [SelectPromoSlice.selectors.data],
  data => {
    return data[slice] || null;
  },
);

export const selectIsPending = (slice: string) => createSelector(
  [SelectPromoSlice.selectors.isPending],
  isPending => {
    return isPending[slice] || false;
  },
);
