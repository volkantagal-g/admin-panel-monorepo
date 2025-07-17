import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MENTORSHIP.SELECT.MENTOR;

export const getMentorsSelector = {
  getData: state => state?.[reducerKey]?.mentors?.data,
  getIsPending: state => state?.[reducerKey]?.mentors?.isPending,
};
