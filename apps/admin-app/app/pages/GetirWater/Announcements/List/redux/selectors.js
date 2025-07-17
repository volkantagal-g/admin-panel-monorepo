import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.ANNOUNCEMENTS;

export const announcementsSelector = {
  getData: state => state?.[reducerKey]?.announcements?.data,
  getIsPending: state => state?.[reducerKey]?.announcements?.isPending,
};
