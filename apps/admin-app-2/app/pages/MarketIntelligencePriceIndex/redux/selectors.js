import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_INTELLIGENCE_PRICE_INDEX;

export const stateSelector = {
  country: createSelector(
    state => state[reducerKey],
    state => state?.country,
  ),
  countryCurrency: createSelector(
    state => state[reducerKey],
    state => state?.countryCurrency,
  ),
  countryFlag: createSelector(
    state => state[reducerKey],
    state => state?.countryFlag,
  ),
  isLoading: createSelector(
    state => state[reducerKey],
    state => state?.isLoading,
  ),
  tableOverall: createSelector(
    state => state[reducerKey],
    state => state?.tableOverall,
  ),
  tableData: createSelector(
    state => state[reducerKey],
    state => state?.tableData,
  ),
  excelExportCategory: createSelector(
    state => state[reducerKey],
    state => state?.excelExportCategory,
  ),
  indexBy: createSelector(
    state => state[reducerKey],
    state => state?.indexBy,
  ),
  isLoadingFilter: createSelector(
    state => state[reducerKey],
    state => state?.isLoadingFilter,
  ),
  isLoadingCompetitorFilter: createSelector(
    state => state[reducerKey],
    state => state?.isLoadingCompetitorFilter,
  ),
};

export const listSelector = {
  categoryList: createSelector(
    state => state[reducerKey],
    state => state?.categoryList,
  ),
  subCategoryList: createSelector(
    state => state[reducerKey],
    state => state?.subCategoryList,
  ),
  excludeCategoryList: createSelector(
    state => state[reducerKey],
    state => state?.excludeCategoryList,
  ),
  excludeSubCategoryList: createSelector(
    state => state[reducerKey],
    state => state?.excludeSubCategoryList,
  ),
  competitorList: createSelector(
    state => state[reducerKey],
    state => state?.competitorList,
  ),
  productList: createSelector(
    state => state[reducerKey],
    state => state?.productList,
  ),
  brandList: createSelector(
    state => state[reducerKey],
    state => state?.brandList,
  ),
  supplierList: createSelector(
    state => state[reducerKey],
    state => state?.supplierList,
  ),
};
