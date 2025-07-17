import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CLIENT.LIST;

export const clientsSelector = {
  getData: state => state[reducerKey]?.clients?.data,
  getIsPending: state => state[reducerKey]?.clients?.isPending,
};
