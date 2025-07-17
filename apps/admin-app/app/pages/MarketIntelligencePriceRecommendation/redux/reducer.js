import _ from 'lodash';
import { createReducer } from 'reduxsauce';

import {
  PRICE_TYPE,
  FILTER_KEY,
  TABLE_FILTER_RULES,
  EXCEL_EXPORT_BUNDLE_TITLES,
  NO_FAMILY_PRODUCT_KEY,
  INTEGRATION_LIST,
} from '../constants';
import { formattedTableData } from '../utils/formattedTableData';
import { Types } from './actions';

export const INITIAL_STATE = {
  tableData: [],
  tableDataBackup: [],
  filteredTableData: [],
  simulateData: [],
  excelExportDataTitles: [],
  excelExportDataColumns: [],

  excelExportBundleDataTitles: EXCEL_EXPORT_BUNDLE_TITLES,
  excelExportBundleDataColumns: [],

  ruleData: {},
  guardrailData: {},

  competitorList: [],
  subcategoryPercentage: 0,
  priceType: PRICE_TYPE,
  integrationType: INTEGRATION_LIST.GETIR[0]?.toLowerCase(),

  updateList: [],
  historicUpdateList: [],

  calculatedRuleList: [],

  groupedFamilyList: {},

  productList: [],
  manufacturerList: [],
  supplierList: [],
  brandList: [],
  categoryRoleList: [],
  globalCategoryList: [],
  categoryPlanningList: [],
  kviList: [],
  familyList: [],

  productListBackup: [],
  manufacturerListBackup: [],
  supplierListBackup: [],
  brandListBackup: [],
  categoryRoleListBackup: [],
  globalCategoryListBackup: [],
  categoryPlanningListBackup: [],
  kviListBackup: [],
  familyListBackup: [],

  excelAllData: false,
  loading: null,
  isLoadingPricingRules: null,
  simulateDataLoading: null,
  isSuccessCall: null,
  isLoadingCompetitorFilter: null,
};

export const setFilterList = (
  state = INITIAL_STATE,
  { filters, hasFilter },
) => {
  const tableData = state.tableData.map(item => ({ ...item }));
  const filteredTableData = state.filteredTableData.map(item => ({ ...item }));
  const allList = {
    productList: { data: [], filterKey: FILTER_KEY.product },
    manufacturerList: { data: [], filterKey: FILTER_KEY.manufacturer },
    brandList: { data: [], filterKey: FILTER_KEY.brand },
    supplierList: { data: [], filterKey: FILTER_KEY.supplier },
    categoryRoleList: { data: [], filterKey: FILTER_KEY.categoryRole },
    globalCategoryList: { data: [], filterKey: FILTER_KEY.globalCategory },
    categoryPlanningList: { data: [], filterKey: FILTER_KEY.categoryPlanning },
    kviList: { data: [], filterKey: FILTER_KEY.kvi },
    familyList: { data: [], filterKey: FILTER_KEY.family },
  };
  tableData.forEach((baseElement, baseElementIndex) => {
    filteredTableData.forEach(changedElement => {
      if (
        baseElement?.getir_product_id === changedElement?.getir_product_id &&
        changedElement?.new_price !== baseElement?.new_price
      ) {
        tableData[baseElementIndex] = changedElement;
      }
    });
  });

  let filteredData = [];
  if (hasFilter) {
    Object.entries(filters).forEach(([key, value]) => {
      if (
        key !== FILTER_KEY.tableFilter &&
        value &&
        value !== '' &&
        value?.length > 0
      ) {
        filteredData = (
          filteredData?.length > 0 ? filteredData : tableData
        ).reduce((a, b) => {
          const allFilteredData = {
            categoryPlanningData: {
              data: b[FILTER_KEY.categoryPlanning],
              hasValue: true,
              filterKey: FILTER_KEY.categoryPlanning,
            },
            categoryRoleData: {
              data: b[FILTER_KEY.categoryRole],
              hasValue: true,
              filterKey: FILTER_KEY.categoryRole,
            },
            brandData: {
              data: b[FILTER_KEY.brand],
              hasValue: true,
              filterKey: FILTER_KEY.brand,
            },
            globalCategoryData: {
              data: b[FILTER_KEY.globalCategory],
              hasValue: true,
              filterKey: FILTER_KEY.globalCategory,
            },
            kviData: {
              data: b[FILTER_KEY.kvi],
              hasValue: true,
              filterKey: FILTER_KEY.kvi,
            },
            manufacturerData: {
              data: b[FILTER_KEY.manufacturer],
              hasValue: true,
              filterKey: FILTER_KEY.manufacturer,
            },
            supplierData: {
              data: b[FILTER_KEY.supplier],
              hasValue: true,
              filterKey: FILTER_KEY.supplier,
            },
            productData: {
              data: b[FILTER_KEY.product],
              hasValue: true,
              filterKey: FILTER_KEY.product,
            },
            familyData: {
              data: b[FILTER_KEY.family],
              hasValue: true,
              filterKey: FILTER_KEY.family,
            },
          };

          const noFamilyProduct = (filteredValue, item) => (item === NO_FAMILY_PRODUCT_KEY
            ? !filteredValue?.data || filteredValue?.data === ''
            : filteredValue?.data === item);

          Object.entries(allFilteredData).forEach(([filteredKey, filteredValue]) => {
            allFilteredData[filteredKey].hasValue =
              filters[filteredValue.filterKey]?.length > 0
                ? filters[filteredValue.filterKey].some(item => {
                  return filteredValue.filterKey === FILTER_KEY.family
                    ? noFamilyProduct(filteredValue, item)
                    : filteredValue?.data?.includes(item);
                })
                : true;
          });

          return Object.values(allFilteredData).every(
            detail => detail.hasValue,
          )
            ? [...a, b]
            : a;
        }, []);
      }

      if (key === FILTER_KEY.tableFilter) {
        Object.entries(value).forEach(([tableFilterKey, tableFilterValue]) => {
          if (
            tableFilterKey === FILTER_KEY.matchedProduct &&
            tableFilterValue &&
            Object.values(tableFilterValue).some(item => item?.length > 0)
          ) {
            const currentTableData =
              filteredData?.length > 0 ? filteredData : tableData;
            currentTableData?.forEach((currentValue, currentKey) => {
              currentTableData[currentKey] = {
                ...currentValue,
                hasValue: false,
              };
              Object.entries(tableFilterValue)?.forEach(
                ([tableKey, tableValue]) => {
                  if (
                    tableValue?.length > 0 &&
                    ((tableKey === FILTER_KEY.directMatchedProduct &&
                      currentValue?.is_direct_match === true) ||
                      (tableKey === FILTER_KEY.inDirectMatchedProduct &&
                        currentValue?.is_direct_match === false)) &&
                    Object.keys(currentValue?.competitor_product_infos)?.some(
                      competitor => tableValue?.includes(competitor),
                    )
                  ) {
                    currentTableData[currentKey] = {
                      ...currentValue,
                      hasValue: true,
                    };
                  }
                  else if (
                    tableKey === FILTER_KEY.notMatchedProduct &&
                    tableValue?.length > 0 &&
                    (Object.keys(currentValue.competitor_product_infos) === 0 ||
                      currentValue.competitor_product_infos === '')
                  ) {
                    currentTableData[currentKey] = {
                      ...currentValue,
                      hasValue: true,
                    };
                  }
                },
              );
              filteredData = currentTableData.filter(element => element.hasValue);
            });
          }
          else if (tableFilterKey === FILTER_KEY.activeRule && tableFilterValue &&
            tableFilterValue?.length > 0) {
            tableFilterValue.forEach(rule => {
              filteredData = Object.values(
                filteredData?.length > 0 ? filteredData : tableData,
              )?.filter(element => element.calculated_rule === rule);
            });
          }
          else {
            TABLE_FILTER_RULES.forEach(option => {
              if (
                tableFilterKey === option.tableFilterKey &&
                tableFilterValue.includes(option.tableFilterValue) &&
                tableFilterValue.includes(option.notTableFilterValue)
              ) {
                filteredData = Object.values(
                  filteredData?.length > 0 ? filteredData : tableData,
                );
              }
              else if (
                tableFilterKey === option.tableFilterKey &&
                tableFilterValue.includes(option.tableFilterValue) &&
                !tableFilterValue.includes(option.notTableFilterValue)
              ) {
                filteredData = Object.values(
                  filteredData?.length > 0 ? filteredData : tableData,
                )?.filter(element => option.rule(element));
              }
              else if (
                tableFilterKey === option.tableFilterKey &&
                !tableFilterValue.includes(option.tableFilterKey) &&
                tableFilterValue.includes(option.notTableFilterValue)
              ) {
                filteredData = Object.values(
                  filteredData?.length > 0 ? filteredData : tableData,
                )?.filter(element => !option.rule(element));
              }
            });
          }
        });
      }
    });
  }
  else {
    filteredData = tableData;
  }

  if (filteredData && filteredData?.length > 0) {
    filteredData.forEach(element => {
      Object.entries(allList).forEach(([key, value]) => {
        if (
          element[value?.filterKey] &&
          (!filters[value?.filterKey] ||
            filters[value?.filterKey] === '' ||
            filters[value?.filterKey]?.length === 0)
        ) {
          if (value?.filterKey === FILTER_KEY.supplier) {
            element[value?.filterKey].map(
              item => !allList[key]?.data.includes(item) &&
                item !== '' &&
                allList[key]?.data.push(item),
            );
          }
          else if (
            !allList[key]?.data?.includes(element[value?.filterKey]) &&
            element[value?.filterKey] !== ''
          ) {
            allList[key]?.data.push(element[value?.filterKey]);
          }
        }
        else allList[key].data = state[`${key}Backup`];
      });
    });
  }
  return {
    ...state,
    productList: allList?.productList?.data?.sort((a, b) => a?.localeCompare(b)),
    manufacturerList: allList?.manufacturerList?.data?.sort((a, b) => a?.localeCompare(b)),
    brandList: allList?.brandList?.data?.sort((a, b) => a?.localeCompare(b)),
    categoryRoleList: allList?.categoryRoleList?.data?.sort((a, b) => a?.localeCompare(b)),
    globalCategoryList: allList?.globalCategoryList?.data?.sort((a, b) => a?.localeCompare(b)),
    categoryPlanningList: allList?.categoryPlanningList?.data?.sort((a, b) => a?.localeCompare(b)),
    kviList: allList?.kviList?.data?.sort((a, b) => a?.localeCompare(b)),
    familyList: allList?.familyList?.data,
    supplierList: allList?.supplierList?.data?.sort((a, b) => a?.localeCompare(b)),
    filteredTableData: filteredData,
    tableData,
    subcategoryPercentage: 0,
  };
};

export const setFilteredTableData = (state = INITIAL_STATE, { data }) => {
  const tableData = state.tableData.map(item => ({ ...item }));

  tableData.forEach((baseElement, baseElementIndex) => {
    data.forEach(changedElement => {
      if (baseElement?.getir_product_id === changedElement?.getir_product_id) {
        tableData[baseElementIndex] = changedElement;
      }
    });
  });

  return {
    ...state,
    filteredTableData: data,
    tableData,
  };
};

export const setUpdateList = (state = INITIAL_STATE) => {
  const tableData = state.tableDataBackup.map(item => ({ ...item }));
  const filteredTableData = state.tableData.map(item => ({ ...item }));

  const updateList = [];
  tableData.forEach(baseElement => {
    filteredTableData.forEach(changedElement => {
      if (baseElement?.getir_product_id === changedElement?.getir_product_id) {
        const difference = Object.entries(baseElement).some(
          ([key, value]) => key === 'new_price' && value !== changedElement?.new_price,
        );
        if (
          difference &&
          changedElement?.new_price &&
          changedElement?.new_price !== ''
        ) {
          updateList.push({
            getir_product_id: changedElement?.getir_product_id,
            new_getir_price: changedElement?.new_price,
            is_updated: true,
          });
        }
      }
    });
  });
  return {
    ...state,
    updateList,
  };
};

export const setSubcategoryPercentage = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    subcategoryPercentage: data,
  };
};

export const setIntegrationType = (state = INITIAL_STATE, { integrationType }) => {
  return {
    ...state,
    integrationType: integrationType?.toLowerCase(),
  };
};

export const setExcelData = (state = INITIAL_STATE, { data, bundleData }) => {
  return {
    ...state,
    excelExportDataColumns: data,
    excelExportBundleDataColumns: bundleData,
  };
};

export const setPriceType = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    priceType: data,
  };
};

export const setClearFilteredData = (state = INITIAL_STATE) => {
  return {
    ...state,
    filteredTableData: state.tableDataBackup,
    tableData: state.tableDataBackup,
  };
};

export const getPricingRulesDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    ruleData: { ...INITIAL_STATE.ruleData },
    guardrailData: { ...INITIAL_STATE.guardrailData },
    isLoadingPricingRules: true,
  };
};

export const getPricingRulesDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    ruleData: data?.rules,
    guardrailData: data?.guardrails,
    isLoadingPricingRules: false,
  };
};

export const getPricingRulesDataFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    ruleData: { ...INITIAL_STATE.ruleData },
    guardrailData: { ...INITIAL_STATE.guardrailData },
    isLoadingPricingRules: false,
    error,
  };
};

export const getRecommendationDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    tableData: [...INITIAL_STATE.tableData],
    tableDataBackup: [...INITIAL_STATE.tableDataBackup],
    filteredTableData: [...INITIAL_STATE.filteredTableData],
    excelExportDataTitles: [...INITIAL_STATE.excelExportDataTitles],
    excelExportDataColumns: [...INITIAL_STATE.excelExportDataColumns],
    manufacturerList: [...INITIAL_STATE.manufacturerList],
    brandList: [...INITIAL_STATE.brandList],
    supplierList: [...INITIAL_STATE.supplierList],
    categoryRoleList: [...INITIAL_STATE.categoryRoleList],
    globalCategoryList: [...INITIAL_STATE.globalCategoryList],
    categoryPlanningList: [...INITIAL_STATE.categoryPlanningList],
    kviList: [...INITIAL_STATE.kviList],
    familyList: [...INITIAL_STATE.familyList],
    productList: [...INITIAL_STATE.productList],
    manufacturerListBackup: [...INITIAL_STATE.manufacturerListBackup],
    brandListBackup: [...INITIAL_STATE.brandListBackup],
    supplierListBackup: [...INITIAL_STATE.supplierListBackup],
    categoryRoleListBackup: [...INITIAL_STATE.categoryRoleListBackup],
    globalCategoryListBackup: [...INITIAL_STATE.globalCategoryListBackup],
    categoryPlanningListBackup: [...INITIAL_STATE.categoryPlanningListBackup],
    kviListBackup: [...INITIAL_STATE.kviListBackup],
    productListBackup: [...INITIAL_STATE.productListBackup],
    familyListBackup: [...INITIAL_STATE.familyListBackup],
    subcategoryPercentage: 0,
    isSuccessCall: null,
    loading: true,
  };
};

export const getRecommendationDataSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  const productList = [];
  const manufacturerList = [];
  const supplierList = [];
  const brandList = [];
  const categoryRoleList = [];
  const globalCategoryList = [];
  const categoryPlanningList = [];
  const kviList = [];
  const familyList = [NO_FAMILY_PRODUCT_KEY];
  const calculatedRuleList = [];

  let currentData = data?.data?.data;
  currentData?.forEach(element => {
    if (
      !calculatedRuleList.includes(element[FILTER_KEY.activeRule]) &&
      element[FILTER_KEY.activeRule]
    ) {
      calculatedRuleList.push(element[FILTER_KEY.activeRule]);
    }
    if (
      !brandList.includes(element[FILTER_KEY.brand]) &&
      element[FILTER_KEY.brand]
    ) {
      brandList.push(element[FILTER_KEY.brand]);
    }
    if (
      !productList.includes(element[FILTER_KEY.product]) &&
      element[FILTER_KEY.product]
    ) {
      productList.push(element[FILTER_KEY.product]);
    }
    if (
      !manufacturerList.includes(element[FILTER_KEY.manufacturer]) &&
      element[FILTER_KEY.manufacturer]
    ) {
      manufacturerList.push(element[FILTER_KEY.manufacturer]);
    }
    if (
      !categoryRoleList.includes(element[FILTER_KEY.categoryRole]) &&
      element[FILTER_KEY.categoryRole]
    ) {
      categoryRoleList.push(element[FILTER_KEY.categoryRole]);
    }
    if (
      !globalCategoryList.includes(element[FILTER_KEY.globalCategory]) &&
      element[FILTER_KEY.globalCategory]
    ) {
      globalCategoryList.push(element[FILTER_KEY.globalCategory]);
    }
    if (
      !categoryPlanningList.includes(element[FILTER_KEY.categoryPlanning]) &&
      element[FILTER_KEY.categoryPlanning]
    ) {
      categoryPlanningList.push(element[FILTER_KEY.categoryPlanning]);
    }
    if (!kviList.includes(element[FILTER_KEY.kvi]) && element[FILTER_KEY.kvi]) {
      kviList.push(element[FILTER_KEY.kvi]);
    }

    if (
      !familyList.includes(element[FILTER_KEY.family]) &&
      element[FILTER_KEY.family]
    ) {
      familyList.push(element[FILTER_KEY.family]);
    }
    if (
      typeof element[FILTER_KEY.supplier] !== 'string' &&
      element[FILTER_KEY.supplier]?.length > 0 &&
      element[FILTER_KEY.supplier] !== ''
    ) {
      element[FILTER_KEY.supplier]?.map(supplier => (!supplierList.includes(supplier) &&
        supplier &&
        typeof element[FILTER_KEY.supplier] !== 'string'
        ? supplierList.push(supplier)
        : ''));
    }
  });

  const groupedFamilyList = _.groupBy(currentData, x => x?.family_id);
  const elseFamilySorting = b => ((b?.is_family_lead_product) ? 1 : 0);
  Object.values(groupedFamilyList)?.map(item => item?.sort((a, b) => (a?.is_family_lead_product ? -1 : elseFamilySorting(b))));
  currentData = formattedTableData(currentData);

  return {
    ...state,
    tableData: currentData,
    tableDataBackup: currentData,
    filteredTableData: currentData,
    excelExportDataTitles: data?.columns,
    excelExportDataColumns: currentData,
    isSuccessCall: true,
    loading: false,
    calculatedRuleList,
    groupedFamilyList,
    productList: productList?.sort((a, b) => a?.localeCompare(b)),
    manufacturerList: manufacturerList?.sort((a, b) => a?.localeCompare(b)),
    brandList: brandList?.sort((a, b) => a?.localeCompare(b)),
    supplierList: supplierList?.sort((a, b) => a?.localeCompare(b)),
    categoryRoleList: categoryRoleList?.sort((a, b) => a?.localeCompare(b)),
    globalCategoryList: globalCategoryList?.sort((a, b) => a?.localeCompare(b)),
    categoryPlanningList: categoryPlanningList?.sort((a, b) => a?.localeCompare(b)),
    kviList: kviList?.sort((a, b) => a?.localeCompare(b)),
    familyList,
    productListBackup: productList?.sort((a, b) => a?.localeCompare(b)),
    manufacturerListBackup: manufacturerList?.sort((a, b) => a?.localeCompare(b)),
    brandListBackup: brandList?.sort((a, b) => a?.localeCompare(b)),
    supplierListBackup: supplierList?.sort((a, b) => a?.localeCompare(b)),
    categoryRoleListBackup: categoryRoleList?.sort((a, b) => a?.localeCompare(b)),
    globalCategoryListBackup: globalCategoryList?.sort((a, b) => a?.localeCompare(b)),
    categoryPlanningListBackup: categoryPlanningList?.sort((a, b) => a?.localeCompare(b)),
    kviListBackup: kviList?.sort((a, b) => a?.localeCompare(b)),
    familyListBackup: familyList,
  };
};

export const getRecommendationDataFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    filteredTableData: [...INITIAL_STATE.filteredTableData],
    tableDataBackup: [...INITIAL_STATE.tableDataBackup],
    tableData: [...INITIAL_STATE.tableData],
    manufacturerList: [...INITIAL_STATE.manufacturerList],
    excelExportDataTitles: [...INITIAL_STATE.excelExportDataTitles],
    excelExportDataColumns: [...INITIAL_STATE.excelExportDataColumns],
    brandList: [...INITIAL_STATE.brandList],
    supplierList: [...INITIAL_STATE.supplierList],
    categoryRoleList: [...INITIAL_STATE.categoryRoleList],
    globalCategoryList: [...INITIAL_STATE.globalCategoryList],
    categoryPlanningList: [...INITIAL_STATE.categoryPlanningList],
    kviList: [...INITIAL_STATE.kviList],
    familyList: [...INITIAL_STATE.familyList],
    productList: [...INITIAL_STATE.productList],
    manufacturerListBackup: [...INITIAL_STATE.manufacturerListBackup],
    brandListBackup: [...INITIAL_STATE.brandListBackup],
    supplierListBackup: [...INITIAL_STATE.supplierListBackup],
    categoryRoleListBackup: [...INITIAL_STATE.categoryRoleListBackup],
    globalCategoryListBackup: [...INITIAL_STATE.globalCategoryListBackup],
    categoryPlanningListBackup: [...INITIAL_STATE.categoryPlanningListBackup],
    kviListBackup: [...INITIAL_STATE.kviListBackup],
    productListBackup: [...INITIAL_STATE.productListBackup],
    isSuccessCall: false,
    loading: false,
    error,
  };
};

export const getCompetitorListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    competitorList: [...INITIAL_STATE.competitorList],
    isLoadingCompetitorFilter: true,
  };
};

export const getCompetitorListSuccess = (
  state = INITIAL_STATE,
  { competitorList },
) => {
  return {
    ...state,
    competitorList: competitorList?.sort((a, b) => a?.localeCompare(b)),
    isLoadingCompetitorFilter: false,
  };
};

export const getCompetitorListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    competitorList: [...INITIAL_STATE.competitorList],
    isLoadingCompetitorFilter: false,
    error,
  };
};

export const getSimulateIndexRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    simulateData: [...INITIAL_STATE.simulateData],
    historicUpdateList: state.updateList,
    simulateDataLoading: true,
  };
};

export const getSimulateIndexSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    simulateData: data,
    simulateDataLoading: false,
  };
};

export const getSimulateIndexFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    simulateData: [...INITIAL_STATE.simulateData],
    simulateDataLoading: false,
    error,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SET_FILTERED_TABLE_DATA]: setFilteredTableData,
  [Types.SET_SUBCATEGORY_PERCENTAGE]: setSubcategoryPercentage,
  [Types.SET_PRICE_TYPE]: setPriceType,
  [Types.SET_FILTER_LIST]: setFilterList,
  [Types.SET_CLEAR_FILTERED_DATA]: setClearFilteredData,
  [Types.SET_UPDATE_LIST]: setUpdateList,
  [Types.SET_EXCEL_DATA]: setExcelData,
  [Types.SET_INTEGRATION_TYPE]: setIntegrationType,

  [Types.GET_RECOMMENDATION_DATA_REQUEST]: getRecommendationDataRequest,
  [Types.GET_RECOMMENDATION_DATA_SUCCESS]: getRecommendationDataSuccess,
  [Types.GET_RECOMMENDATION_DATA_FAILURE]: getRecommendationDataFailure,

  [Types.GET_SIMULATE_INDEX_REQUEST]: getSimulateIndexRequest,
  [Types.GET_SIMULATE_INDEX_SUCCESS]: getSimulateIndexSuccess,
  [Types.GET_SIMULATE_INDEX_FAILURE]: getSimulateIndexFailure,

  [Types.GET_COMPETITOR_LIST_REQUEST]: getCompetitorListRequest,
  [Types.GET_COMPETITOR_LIST_SUCCESS]: getCompetitorListSuccess,
  [Types.GET_COMPETITOR_LIST_FAILURE]: getCompetitorListFailure,

  [Types.GET_PRICING_RULES_DATA_REQUEST]: getPricingRulesDataRequest,
  [Types.GET_PRICING_RULES_DATA_SUCCESS]: getPricingRulesDataSuccess,
  [Types.GET_PRICING_RULES_DATA_FAILURE]: getPricingRulesDataFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
