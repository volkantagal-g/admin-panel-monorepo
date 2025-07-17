import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TRANSACTIONAL_SMS.NEW;

export const configSelector = {
  getConfig: state => state?.[reducerKey]?.config?.data,
  isPending: state => state?.[reducerKey]?.config?.isPending,
};
