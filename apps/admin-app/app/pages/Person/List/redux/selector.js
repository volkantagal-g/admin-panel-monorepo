import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PERSON.LIST;

export const personListSelector = {
  getData: state => state[reducerKey]?.people.data,
  getTotal: state => state[reducerKey]?.people.total,
  getIsPending: state => state[reducerKey]?.people.isPending,
};

export const personListExcelSelector = { getIsPending: state => state[reducerKey]?.excel.isPending };
