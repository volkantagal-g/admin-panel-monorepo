import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PAYMENT_EVENT.DETAIL;

export const eventDetailSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.eventDetail?.data,
    data => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.eventDetail.isPending,
    isPending => {
      return isPending;
    },
  ),
};
