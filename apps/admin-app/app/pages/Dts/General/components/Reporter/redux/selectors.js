import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.REPORTERS;

export const reportersSelector = {
  getData: state => state?.[reducerKey]?.reporters?.data,
  getIsPending: state => state?.[reducerKey]?.reporters?.isPending,
};
