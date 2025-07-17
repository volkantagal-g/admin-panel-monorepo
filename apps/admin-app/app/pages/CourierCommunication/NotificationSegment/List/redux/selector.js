import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COURIER_COMMUNICATION_SEGMENT.LIST;

export const segmentList = {
  getSegmentListData: state => state?.[reducerKey]?.segmentList?.data,
  getSegmentListDataIsPending: state => state?.[reducerKey]?.segmentList?.isPending,
};
