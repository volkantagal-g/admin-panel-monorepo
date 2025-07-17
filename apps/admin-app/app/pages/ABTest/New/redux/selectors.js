import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.AB_TEST_PAGE.NEW;

export const getClientListTemplatesSelector = {
  getData: state => state[reducerKey].getClientListTemplates.data || [],
  getIsPending: state => state[reducerKey].getClientListTemplates.isPending,
};

export const getImportVariationsCSVFileSelector = {
  getData: state => state[reducerKey].importVariationsCSVFile.data || {},
  getIsPending: state => state[reducerKey].importVariationsCSVFile.isPending,
};
