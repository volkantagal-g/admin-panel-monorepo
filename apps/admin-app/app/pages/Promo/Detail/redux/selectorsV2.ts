import { createSelector } from '@reduxjs/toolkit';

import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

export const selectIsPromoCountryAsSelectedCountry = createSelector(
  [PromoDetailSlice.selectors.promo, getSelectedCountryV2],
  (promo, country) => {
    return promo?.country === country?._id;
  },
);
