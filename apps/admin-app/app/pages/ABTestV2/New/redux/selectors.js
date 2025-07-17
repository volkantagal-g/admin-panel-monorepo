import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.AB_TEST_V2_PAGE.NEW;

export const getClientListTemplatesSelector = {
  getData: state => state[reducerKey].getClientListTemplates.data || [],
  getIsPending: state => state[reducerKey].getClientListTemplates.isPending,
};

export const createABTestSelector = {
  getData: state => state[reducerKey].createABTest.data || [],
  getIsPending: state => state[reducerKey].createABTest.isPending,
};

export const getTestTypeListSelector = {
  getData: state => state[reducerKey].getTestTypeList.data || [],
  getIsPending: state => state[reducerKey].getTestTypeList.isPending,
};

export const getImportVariationsCSVFileSelector = {
  getData: state => state[reducerKey].importVariationsCSVFile.data || {},
  getIsPending: state => state[reducerKey].importVariationsCSVFile.isPending,
};
