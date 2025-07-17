import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SERVICE_AVAILABILITY_AREA.DETAIL;

export const getSaaData = {
  getData: state => state?.[reducerKey]?.saaData?.data?.serviceAvailabilityArea,
  getIsPending: state => state?.[reducerKey]?.saaData?.isPending,
};
