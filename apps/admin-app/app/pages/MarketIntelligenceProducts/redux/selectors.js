import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_INTELLIGENCE_PRODUCTS;

export const stateSelector = {
  competitorListLoading: createSelector(
    state => state[reducerKey],
    state => state?.competitorListLoading,
  ),
  excelExport: createSelector(
    state => state[reducerKey],
    state => state?.excelExport,
  ),
  tableData: createSelector(
    state => state[reducerKey],
    state => state?.tableData,
  ),
  productMatchDataLoading: createSelector(
    state => state[reducerKey],
    state => state?.productMatchDataLoading,
  ),
};

export const listSelector = {
  competitorList: createSelector(
    state => state[reducerKey],
    state => state?.competitorList,
  ),
  getirCategoryList: createSelector(
    state => state[reducerKey],
    state => state?.getirCategoryList,
  ),
  getirSubCategoryList: createSelector(
    state => state[reducerKey],
    state => state?.getirSubCategoryList,
  ),
  competitorCategoryList: createSelector(
    state => state[reducerKey],
    state => state?.competitorCategoryList,
  ),
};
