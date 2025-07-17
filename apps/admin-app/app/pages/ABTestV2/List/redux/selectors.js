import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.AB_TEST_V2_PAGE.LIST;

export const getABTestsSelector = {
  getData: state => state[reducerKey].getABTests.data || [],
  getCount: state => state[reducerKey].getABTests.count || [],
  getIsPending: state => state[reducerKey].getABTests.isPending,
  getFilters: state => state[reducerKey].filters,
};
