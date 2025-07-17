import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.AB_TEST_PAGE.DETAIL;

export const getTestSelector = {
  getData: state => state[reducerKey].getTest.data || [],
  getIsPending: state => state[reducerKey].getTest.isPending,
};

export const getClientListTemplatesSelector = {
  getData: state => state[reducerKey].getTemplates.data || [],
  getIsPending: state => state[reducerKey].getTemplates.isPending,
};
