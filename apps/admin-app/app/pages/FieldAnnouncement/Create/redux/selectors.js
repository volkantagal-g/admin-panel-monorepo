import { reducerKey } from './key';

export const createWarehouseAnnouncementSelector = { getIsPending: state => state[reducerKey]?.form?.isPending };

export const createFranchiseAnnouncementSelector = { getIsPending: state => state[reducerKey]?.createFranchiseAnnouncement.isPending };
