import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKETING.SELECT.IN_APP_REDIRECTION;

export const inAppRedirectionSelector = {
  getData: state => state?.[reducerKey]?.data,
  getIsPending: state => state?.[reducerKey]?.isPending,
  getError: state => state?.[reducerKey]?.error,
};
