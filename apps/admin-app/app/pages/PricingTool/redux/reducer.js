import { createReducer } from 'reduxsauce';

import { PRICE_TYPE, FILTER_KEY } from '../constants';
import { formattedTableData } from '../utils/formattedTableData';
import { Types } from './actions';

export const INITIAL_STATE = {
  tableData: [],
  filteredTableData: [],
  simulateData: [],

  competitorList: [],
  subcategoryPercentage: 0,
  priceType: PRICE_TYPE,

  categoryList: [],
  subcategoryList: [],
  productList: [],
  manufacturerList: [],
  supplierList: [],
  brandList: [],

  updateList: [],

  loading: null,
  simulateDataLoading: null,
  isSuccessCall: null,
};

export const setFilterList = (state = INITIAL_STATE, { filters, hasFilter }) => {
  const tableData = state.tableData.map(item => ({ ...item }));

  const categoryList = [];
  const subcategoryList = [];
  const productList = [];
  const manufacturerList = [];
  const brandList = [];

  let filteredData = [];
  if (hasFilter) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value?.length > 0) {
        if (FILTER_KEY[key] !== FILTER_KEY.supplier) {
          filteredData = Object.values(filteredData.length > 0 ? filteredData : tableData)?.filter(element => element[FILTER_KEY[key]] === value);
        }
        else {
          value?.forEach(item => {
            filteredData = Object.values(filteredData.length > 0 ? filteredData : tableData)?.filter(element => (element[FILTER_KEY[key]].includes(item)));
          });
        }
      }
    });
  }
  else filteredData = state.tableData.map(item => ({ ...item }));

  if (filteredData && filteredData?.length > 0) {
    filteredData.forEach(element => {
      if (!categoryList.includes(element[FILTER_KEY.category])) categoryList.push(element[FILTER_KEY.category]);
      if (!subcategoryList.includes(element[FILTER_KEY.subcategory])) subcategoryList.push(element[FILTER_KEY.subcategory]);
      if (!brandList.includes(element[FILTER_KEY.brand])) brandList.push(element[FILTER_KEY.brand]);
      if (!productList.includes(element[FILTER_KEY.product])) productList.push(element[FILTER_KEY.product]);
      if (!manufacturerList.includes(element[FILTER_KEY.manufacturer])) manufacturerList.push(element[FILTER_KEY.manufacturer]);
    });
  }

  return {
    ...state,
    categoryList,
    subcategoryList,
    productList,
    manufacturerList,
    brandList,
    filteredTableData: filteredData,
    subcategoryPercentage: 0,
  };
};

export const setFilteredTableData = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    filteredTableData: data,
  };
};

export const setExcelData = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    filteredTableData: data,
  };
};

export const setUpdateList = (state = INITIAL_STATE) => {
  const tableData = state.tableData.map(item => ({ ...item }));
  const filteredTableData = state.filteredTableData.map(item => ({ ...item }));

  const updateList = [];
  tableData.forEach(baseElement => {
    filteredTableData.forEach(changedElement => {
      if (baseElement.product_id === changedElement.product_id) {
        const difference = Object.entries(baseElement).some(([key, value]) => key === 'new_price' && value !== changedElement.new_price);
        if (difference) {
          updateList.push({
            getir_product_id: changedElement.product_id,
            getir_price: changedElement.price,
            g_disc_price: changedElement.new_price,
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

export const setPriceType = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    priceType: data,
  };
};

export const setClearFilteredData = (state = INITIAL_STATE) => {
  return {
    ...state,
    filteredTableData: state.tableData,
  };
};

export const getElasticityDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    tableData: [...INITIAL_STATE.tableData],
    filteredTableData: [...INITIAL_STATE.filteredTableData],
    competitorList: [...INITIAL_STATE.competitorList],
    manufacturerList: [...INITIAL_STATE.manufacturerList],
    brandList: [...INITIAL_STATE.brandList],
    supplierList: [...INITIAL_STATE.supplierList],
    categoryList: [...INITIAL_STATE.categoryList],
    subcategoryList: [...INITIAL_STATE.subcategoryList],
    productList: [...INITIAL_STATE.productList],
    isSuccessCall: null,
    loading: true,
  };
};

export const getElasticityDataSuccess = (state = INITIAL_STATE, { data, showAandM }) => {
  const categoryList = [];
  const subcategoryList = [];
  const productList = [];
  const manufacturerList = [];
  const supplierList = [];
  const brandList = [];

  let currentData = data?.data?.data;
  currentData?.forEach(element => {
    if (!categoryList.includes(element[FILTER_KEY.category])) categoryList.push(element[FILTER_KEY.category]);
    if (!subcategoryList.includes(element[FILTER_KEY.subcategory])) subcategoryList.push(element[FILTER_KEY.subcategory]);
    if (!brandList.includes(element[FILTER_KEY.brand])) brandList.push(element[FILTER_KEY.brand]);
    if (!productList.includes(element[FILTER_KEY.product])) productList.push(element[FILTER_KEY.product]);
    if (!manufacturerList.includes(element[FILTER_KEY.manufacturer])) manufacturerList.push(element[FILTER_KEY.manufacturer]);
    element[FILTER_KEY.supplier].map(supplier => (!supplierList.includes(supplier) ? supplierList.push(supplier) : ''));
  });

  currentData = formattedTableData(currentData, showAandM);
  return {
    ...state,
    tableData: currentData,
    filteredTableData: currentData,
    competitorList: data.competitorList,
    isSuccessCall: true,
    loading: false,
    categoryList,
    subcategoryList,
    productList,
    manufacturerList,
    brandList,
    supplierList,
  };
};

export const getElasticityDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    filteredTableData: [...INITIAL_STATE.filteredTableData],
    tableData: [...INITIAL_STATE.tableData],
    competitorList: [...INITIAL_STATE.competitorList],
    manufacturerList: [...INITIAL_STATE.manufacturerList],
    brandList: [...INITIAL_STATE.brandList],
    supplierList: [...INITIAL_STATE.supplierList],
    categoryList: [...INITIAL_STATE.categoryList],
    subcategoryList: [...INITIAL_STATE.subcategoryList],
    productList: [...INITIAL_STATE.productList],
    isSuccessCall: false,
    loading: false,
    error,
  };
};

export const getSimulateIndexRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    simulateData: [...INITIAL_STATE.simulateData],
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
  [Types.SET_EXCEL_DATA]: setExcelData,
  [Types.SET_CLEAR_FILTERED_DATA]: setClearFilteredData,
  [Types.SET_UPDATE_LIST]: setUpdateList,

  [Types.GET_ELASTICITY_DATA_REQUEST]: getElasticityDataRequest,
  [Types.GET_ELASTICITY_DATA_SUCCESS]: getElasticityDataSuccess,
  [Types.GET_ELASTICITY_DATA_FAILURE]: getElasticityDataFailure,

  [Types.GET_SIMULATE_INDEX_REQUEST]: getSimulateIndexRequest,
  [Types.GET_SIMULATE_INDEX_SUCCESS]: getSimulateIndexSuccess,
  [Types.GET_SIMULATE_INDEX_FAILURE]: getSimulateIndexFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
