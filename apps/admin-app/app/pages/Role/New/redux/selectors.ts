import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reducerKey = REDUX_KEY.ROLE.NEW;

export const createRoleSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reducerKey]?.createRole?.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.createRole?.isPending,
};
