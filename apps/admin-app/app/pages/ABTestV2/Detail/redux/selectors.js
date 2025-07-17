import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.AB_TEST_V2_PAGE.DETAIL;

export const getTestSelector = {
  getData: state => state[reducerKey].getTest.data || [],
  getIsPending: state => state[reducerKey].getTest.isPending,
  getError: state => state[reducerKey].getTest.error,
  getStatus: state => state[reducerKey].testStatus,
};

export const getStatusSelector = { getStatus: state => state[reducerKey].testStatus };

export const updateABTestSelector = {
  getError: state => state[reducerKey].updateABTest.error,
  getIsPending: state => state[reducerKey].updateABTest.isPending,
};

export const getClientListTemplatesSelector = {
  getData: state => state[reducerKey].getTemplates.data || [],
  getIsPending: state => state[reducerKey].getTemplates.isPending,
};

export const startTestSelector = {
  getData: state => state[reducerKey].startTest.data || [],
  getIsPending: state => state[reducerKey].startTest.isPending,
};

export const stopTestSelector = {
  getData: state => state[reducerKey].stopTest.data || [],
  getIsPending: state => state[reducerKey].stopTest.isPending,
};

export const completeTestSelector = {
  getData: state => state[reducerKey].completeTest.data || [],
  getIsPending: state => state[reducerKey].completeTest.isPending,
};

export const stateSelector = { excludeDates: state => state[reducerKey].excludeDates };
