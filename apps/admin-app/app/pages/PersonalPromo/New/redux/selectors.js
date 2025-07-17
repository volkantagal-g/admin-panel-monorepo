import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PERSONAL_PROMO.NEW;

export const getClientsSelector = {
  getData: state => state[reducerKey]?.clients?.data,
  getIsPending: state => state[reducerKey]?.clients?.isPending,
};

export const createPromoSelector = { getIsPending: state => state[reducerKey]?.createPersonalPromo?.isPending };
