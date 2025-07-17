import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.GENERAL.SELECT_FEEDBACK_SOURCE;

export const feedbackSourceSelector = {
  getData: state => state?.[reducerKey]?.feedbackSources?.data,
  getIsPending: state => state?.[reducerKey]?.feedbackSources?.isPending,
};
