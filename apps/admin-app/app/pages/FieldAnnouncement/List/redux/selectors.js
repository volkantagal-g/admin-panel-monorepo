import { reducerKey } from './key';

export const announcementListSelector = {
  getData: state => state[reducerKey]?.announcementList?.data,
  getTotal: state => state[reducerKey]?.announcementList?.total,
  getIsPending: state => state[reducerKey]?.announcementList?.isPending,
  getIsDeletePending: state => state[reducerKey]?.deleteAnnouncement?.isPending,
  getIsDeleteSuccess: state => !!state[reducerKey]?.deleteAnnouncement?.data,
};
