import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TRANSACTIONAL_SMS.DETAIL;

export const transactionalSmsDetailSelector = {
  getData: state => state?.[reducerKey]?.transactionalSmsDetail?.data,
  getIsPending: state => state?.[reducerKey]?.transactionalSmsDetail?.isPending,
  getError: state => state?.[reducerKey]?.transactionalSmsDetail?.error,
};

export const configSelector = {
  getConfig: state => state?.[reducerKey]?.config?.data,
  isPending: state => state?.[reducerKey]?.config?.isPending,
};
