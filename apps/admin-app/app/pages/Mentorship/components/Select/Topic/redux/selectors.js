import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MENTORSHIP.SELECT.TOPIC;

export const getTopicsSelector = {
  getData: state => state?.[reducerKey]?.topics?.data,
  getIsPending: state => state?.[reducerKey]?.topics?.isPending,
};
