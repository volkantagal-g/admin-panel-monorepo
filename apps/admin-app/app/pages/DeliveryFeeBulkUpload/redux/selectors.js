import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DELIVERY_FEE.BULK_UPLOAD;

export const deliveryFees = {
  getDeliveryFee: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'deliveryFee');
    },
    ({ data }) => {
      return data;
    }
  ),
};
