import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.USER.NEW;

export const createUserSelector = {
  getData: state => state[reducerKey]?.createUser?.data,
  getIsPending: state => state[reducerKey]?.createUser?.isPending,
};
