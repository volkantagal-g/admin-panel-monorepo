import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.BASKET_CONFIG.DETAIL;

export const basketAmountDetailsSelector = {
  getIsPending: state => state[reduxKey]?.basketAmountDetails?.isPending,
  getData: state => state[reduxKey]?.basketAmountDetails?.data,
};

export const updateAmountDetailsSelector = { getIsPending: state => state[reduxKey]?.updateAmountDetails?.isPending };
