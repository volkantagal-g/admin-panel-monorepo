import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COMMUNICATION_CALLBACK_URLS.DETAIL;

export const communicationCallbackUrlsUpdateSelector = {
  getData: state => state?.[reducerKey]?.communicationCallbackUrlsUpdate?.data,
  getIsPending: state => state?.[reducerKey]?.communicationCallbackUrlsUpdate?.isPending,
  getError: state => state?.[reducerKey]?.communicationCallbackUrlsUpdate?.error,
};
