import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COMMUNICATION_CALLBACK_URLS.NEW;

export const communicationCallbackUrlsSaveSelector = {
  getAccessToken: state => state?.[reducerKey]?.communicationCallbackUrlsSave?.data,
  isPending: state => state?.[reducerKey]?.communicationCallbackUrlsSave?.isPending,
};
