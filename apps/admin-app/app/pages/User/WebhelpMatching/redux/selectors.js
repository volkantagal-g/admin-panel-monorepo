import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.USER.WEBHELP_MATCHING;

export const usersSelector = {
  getData: state => state[reducerKey]?.users?.data,
  getIsPending: state => state[reducerKey]?.users?.isPending,
};

export const updateUsersWebhelpIdSelector = {
  getData: state => state[reducerKey]?.batchUpdate?.data,
  getIsPending: state => state[reducerKey]?.batchUpdate?.isPending,
};

export const removeWebhelpIdFromUserSelector = {
  getData: state => state[reducerKey]?.removeWebhelpIdFromUser?.data,
  getIsPending: state => state[reducerKey]?.removeWebhelpIdFromUser?.isPending,
};
