import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/MarketIntelligenceProducts/redux/actions';

export const INITIAL_STATE = {
  competitorList: [],
  competitorListLoading: null,
  excelExport: {},
  tableData: [],
  getirCategoryList: [],
  getirSubCategoryList: [],
  competitorCategoryList: [],
  productMatchDataLoading: null,
};

export const getCompetitorListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    competitorList: [...INITIAL_STATE.competitorList],
    competitorListLoading: true,
  };
};

export const getCompetitorListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    competitorList: data,
    competitorListLoading: false,
  };
};

export const getCompetitorListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    competitorList: [...INITIAL_STATE.competitorList],
    competitorListLoading: false,
    error,
  };
};

export const postProductMatchDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    tableData: [...INITIAL_STATE.tableData],
    getirCategoryList: [...INITIAL_STATE.getirCategoryList],
    getirSubCategoryList: [...INITIAL_STATE.getirSubCategoryList],
    competitorCategoryList: [...INITIAL_STATE.competitorCategoryList],
    excelExport: { ...INITIAL_STATE.excelExport },
    productMatchDataLoading: true,
  };
};

export const postProductMatchDataSuccess = (state = INITIAL_STATE, { data }) => {
  const competitorCategoryList = Array.from(
    new Set(data.data?.map(product => product.category)),
  ).sort();
  const getirCategoryList = Array.from(
    new Set(data.data?.map(product => product.pred_category)),
  ).sort().filter(
    category => category !== '',
  );
  const getirSubCategoryList = Array.from(
    new Set(data.data?.map(product => product.pred_subcategory)),
  ).sort().filter(
    subcategory => subcategory !== '',
  );

  return {
    ...state,
    tableData: data.data,
    getirCategoryList,
    getirSubCategoryList,
    competitorCategoryList,
    excelExport: { data: data.data, columns: data.columns },
    productMatchDataLoading: false,
  };
};

export const postProductMatchDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    tableData: [...INITIAL_STATE.tableData],
    getirCategoryList: [...INITIAL_STATE.getirCategoryList],
    getirSubCategoryList: [...INITIAL_STATE.getirSubCategoryList],
    competitorCategoryList: [...INITIAL_STATE.competitorCategoryList],
    excelExport: { ...INITIAL_STATE.excelExport },
    productMatchDataLoading: false,
    error,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COMPETITOR_LIST_REQUEST]: getCompetitorListRequest,
  [Types.GET_COMPETITOR_LIST_SUCCESS]: getCompetitorListSuccess,
  [Types.GET_COMPETITOR_LIST_FAILURE]: getCompetitorListFailure,

  [Types.POST_PRODUCT_MATCH_DATA_REQUEST]: postProductMatchDataRequest,
  [Types.POST_PRODUCT_MATCH_DATA_SUCCESS]: postProductMatchDataSuccess,
  [Types.POST_PRODUCT_MATCH_DATA_FAILURE]: postProductMatchDataFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
