import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.BASKET_CONFIG.DETAIL}_`;

export const { Types, Creators } = createActions(
  {
    getDiscountedBasketAmountsRequest: { warehouseId: null },
    getDiscountedBasketAmountsSuccess: { data: [] },
    getDiscountedBasketAmountsFailure: { error: null },
    updateDiscountedBasketAmountsRequest: {
      warehouseId: null,
      domainType: null,
      minDiscountedAmount: null,
      maxDiscountedAmount: null,
      basketAmountSource: null,
      zoneBasedBasketAmounts: null,
      onSuccess: null,
    },
    updateDiscountedBasketAmountsSuccess: { data: [] },
    updateDiscountedBasketAmountsFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
