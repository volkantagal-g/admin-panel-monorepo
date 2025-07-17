import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.CRISIS_TOPIC;

export const getCrisesTopicsSelector = {
  getData: state => state[reducerKey]?.crisisTopics.data,
  getIsPending: state => state[reducerKey]?.crisisTopics.isPending,
};
