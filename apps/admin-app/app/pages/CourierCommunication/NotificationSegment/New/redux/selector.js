import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COURIER_COMMUNICATION_SEGMENT.CREATE;

export const createSegment = {
  getCourierIdsData: state => state?.[reducerKey]?.courierIds?.data,
  getCourierIdsDataIsPending: state => state?.[reducerKey]?.courierIds?.isPending,
};
