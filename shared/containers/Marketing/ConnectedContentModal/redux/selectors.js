import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKETING.CONNECTED_CONTENT_MODAL;

export const connectedContentSelector = {
  getConnectedContent: state => state?.[reducerKey]?.content,
  isConnectedContentPending: state => state?.[reducerKey].isPending,
};
