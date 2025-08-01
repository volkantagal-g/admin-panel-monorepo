import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKETING_APPROVAL.LIST;

export const generatedContentSelector = {
  getData: state => state?.[reducerKey]?.generatedContent?.data,
  getIsPending: state => state?.[reducerKey]?.generatedContent?.isPending,
};

export const updateNotificationsSelector = { getIsPending: state => state?.[reducerKey]?.updateNotifications?.isPending };
