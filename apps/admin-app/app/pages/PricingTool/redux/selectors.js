import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PRICING_TOOL;

export const stateSelector = {
  filteredTableData: createSelector(
    state => state[reducerKey],
    state => state?.filteredTableData,
  ),
  subcategoryPercentage: createSelector(
    state => state[reducerKey],
    state => state?.subcategoryPercentage,
  ),
  currentProduct: createSelector(
    state => state[reducerKey],
    state => state?.currentProduct,
  ),
  priceType: createSelector(
    state => state[reducerKey],
    state => state?.priceType,
  ),
  loading: createSelector(
    state => state[reducerKey],
    state => state?.loading,
  ),
  isSuccessCall: createSelector(
    state => state[reducerKey],
    state => state?.isSuccessCall,
  ),
  tableData: createSelector(
    state => state[reducerKey],
    state => state?.tableData,
  ),
  showAandM: createSelector(
    state => state[reducerKey],
    state => state?.showAandM,
  ),
  simulateData: createSelector(
    state => state[reducerKey],
    state => state?.simulateData,
  ),
  simulateDataLoading: createSelector(
    state => state[reducerKey],
    state => state?.simulateDataLoading,
  ),
};

export const listSelector = {
  categoryList: createSelector(
    state => state[reducerKey],
    state => state?.categoryList,
  ),
  subcategoryList: createSelector(
    state => state[reducerKey],
    state => state?.subcategoryList,
  ),
  productList: createSelector(
    state => state[reducerKey],
    state => state?.productList,
  ),
  manufacturerList: createSelector(
    state => state[reducerKey],
    state => state?.manufacturerList,
  ),
  supplierList: createSelector(
    state => state[reducerKey],
    state => state?.supplierList,
  ),
  brandList: createSelector(
    state => state[reducerKey],
    state => state?.brandList,
  ),
  competitorList: createSelector(
    state => state[reducerKey],
    state => state?.competitorList,
  ),
  updateList: createSelector(
    state => state[reducerKey],
    state => state?.updateList,
  ),
};
