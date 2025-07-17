import { reducerKey } from './key';

export const announcementDetailData = {
  getData: state => state[reducerKey]?.detail?.data,
  isPending: state => state[reducerKey]?.detail?.isPending,
  getError: state => state[reducerKey]?.detail?.error,
};
