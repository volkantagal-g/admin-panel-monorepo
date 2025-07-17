import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_INTELLIGENCE_PRICE_RECOMMENDATION;

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
  excelExportDataColumns: createSelector(
    state => state[reducerKey],
    state => state?.excelExportDataColumns,
  ),
  excelExportDataTitles: createSelector(
    state => state[reducerKey],
    state => state?.excelExportDataTitles,
  ),
  guardrailData: createSelector(
    state => state[reducerKey],
    state => state?.guardrailData,
  ),
  ruleData: createSelector(
    state => state[reducerKey],
    state => state?.ruleData,
  ),
  isLoadingPricingRules: createSelector(
    state => state[reducerKey],
    state => state?.isLoadingPricingRules,
  ),
  isLoadingCompetitorFilter: createSelector(
    state => state[reducerKey],
    state => state?.isLoadingCompetitorFilter,
  ),
  excelExportBundleDataTitles: createSelector(
    state => state[reducerKey],
    state => state?.excelExportBundleDataTitles,
  ),
  excelExportBundleDataColumns: createSelector(
    state => state[reducerKey],
    state => state?.excelExportBundleDataColumns,
  ),
  integrationType: createSelector(
    state => state[reducerKey],
    state => state?.integrationType,
  ),
};

export const listSelector = {
  categoryRoleList: createSelector(
    state => state[reducerKey],
    state => state?.categoryRoleList,
  ),
  globalCategoryList: createSelector(
    state => state[reducerKey],
    state => state?.globalCategoryList,
  ),
  categoryPlanningList: createSelector(
    state => state[reducerKey],
    state => state?.categoryPlanningList,
  ),
  kviList: createSelector(
    state => state[reducerKey],
    state => state?.kviList,
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
  familyList: createSelector(
    state => state[reducerKey],
    state => state?.familyList,
  ),
  updateList: createSelector(
    state => state[reducerKey],
    state => state?.updateList,
  ),
  historicUpdateList: createSelector(
    state => state[reducerKey],
    state => state?.historicUpdateList,
  ),
  calculatedRuleList: createSelector(
    state => state[reducerKey],
    state => state?.calculatedRuleList,
  ),
  groupedFamilyList: createSelector(
    state => state[reducerKey],
    state => state?.groupedFamilyList,
  ),
};
