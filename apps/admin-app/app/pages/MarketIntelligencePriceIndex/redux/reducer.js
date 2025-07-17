import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/MarketIntelligencePriceIndex/redux/actions';
import {
  FILTER_KEY,
  INDEX_BY_LIST,
} from '@app/pages/MarketIntelligencePriceIndex/constants';

export const INITIAL_STATE = {
  categoryList: [],
  subCategoryList: [],
  brandList: [],
  supplierList: [],
  productList: [],

  categoryListBackup: [],
  subCategoryListBackup: [],
  brandListBackup: [],
  supplierListBackup: [],
  productListBackup: [],

  excludeCategoryList: [],
  excludeSubCategoryList: [],

  competitorList: [],

  isLoading: null,
  isLoadingFilter: null,
  isLoadingCompetitorFilter: null,

  tableOverall: {},
  tableData: [],
  tableDataBackup: [],
  excelExportCategory: {},
  indexBy: 'Category',
  country: 'TR',
  countryCurrency: '₺',
  selectedProduct: {},
};

export const setCompetitorList = (state = INITIAL_STATE) => {
  return {
    ...state,
    competitorList: state.competitorList,
  };
};

export const setIndexBy = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    indexBy: data,
  };
};

export const setInitialTable = (state = INITIAL_STATE) => {
  return {
    ...state,
    tableData: [],
    tableDataBackup: [],
    tableOverall: {},
    excelExportCategory: {},
  };
};

export const setClearFilter = (state = INITIAL_STATE) => {
  return {
    ...state,
    tableData: state.tableDataBackup,
    categoryList: state.categoryListBackup,
    subCategoryList: state.subCategoryListBackup,
    brandList: state.brandListBackup,
    supplierList: state.supplierListBackup,
    productList: state.productListBackup,
  };
};

export const setSelectedProduct = (
  state = INITIAL_STATE,
  { selectedProduct },
) => {
  const tempTableData = state.tableData.map(item => ({ ...item }));
  const tableData = tempTableData.filter(
    item => item?.key === selectedProduct?.key,
  );

  return {
    ...state,
    selectedProduct,
    tableData: tableData?.length > 0 ? tableData : state.tableDataBackup,
  };
};

export const setFilterList = (
  state = INITIAL_STATE,
  { filters, hasFilter },
) => {
  const tableDataBackup = state.tableDataBackup.map(item => ({ ...item }));

  const allList = {
    productList: { data: [], filterKey: FILTER_KEY.PRODUCT },
    brandList: { data: [], filterKey: FILTER_KEY.BRAND },
    supplierList: { data: [], filterKey: FILTER_KEY.SUPPLIER },
    categoryList: { data: [], filterKey: FILTER_KEY.CATEGORY },
    subCategoryList: { data: [], filterKey: FILTER_KEY.SUBCATEGORY },
  };

  let filteredData = [];
  if (hasFilter) {
    Object.entries(filters).forEach(value => {
      if (value && value !== '' && value?.length > 0) {
        filteredData = (
          filteredData?.length > 0 ? filteredData : tableDataBackup
        ).reduce((a, b) => {
          const allFilteredData = {
            productData: {
              data: b[FILTER_KEY.PRODUCT],
              hasValue: true,
              filterKey: FILTER_KEY.PRODUCT,
            },
            brandData: {
              data: b[FILTER_KEY.BRAND],
              hasValue: true,
              filterKey: FILTER_KEY.BRAND,
            },
            supplierData: {
              data: b[FILTER_KEY.SUPPLIER],
              hasValue: true,
              filterKey: FILTER_KEY.SUPPLIER,
            },
            categoryData: {
              data: b[FILTER_KEY.CATEGORY],
              hasValue: true,
              filterKey: FILTER_KEY.CATEGORY,
            },
            subCategoryData: {
              data: b[FILTER_KEY.SUBCATEGORY],
              hasValue: true,
              filterKey: FILTER_KEY.SUBCATEGORY,
            },
          };
          Object.entries(allFilteredData).forEach(
            ([filteredKey, filteredValue]) => {
              allFilteredData[filteredKey].hasValue =
                filters[filteredValue.filterKey]?.length > 0
                  ? filters[filteredValue.filterKey].some(item => {
                    return filteredValue?.data?.includes(item);
                  })
                  : true;
            },
          );
          return Object.values(allFilteredData).every(
            detail => detail.hasValue,
          )
            ? [...a, b]
            : a;
        }, []);
      }
    });
  }
  else {
    filteredData = tableDataBackup;
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
          if (value?.filterKey === FILTER_KEY.SUPPLIER) {
            element[value?.filterKey].map(item => (!allList[key]?.data.includes(item) && item !== ''
              ? allList[key]?.data.push(item)
              : null));
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
    brandList: allList?.brandList?.data?.sort((a, b) => a?.localeCompare(b)),
    categoryList: allList?.categoryList?.data?.sort((a, b) => a?.localeCompare(b)),
    supplierList: allList?.supplierList?.data?.sort((a, b) => a?.localeCompare(b)),
    subCategoryList: allList?.subCategoryList?.data?.sort((a, b) => a?.localeCompare(b)),
    tableData: filteredData,
  };
};
export const getCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    excludeCategoryList: [...INITIAL_STATE.excludeCategoryList],
    isLoadingFilter: true,
  };
};

export const getCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    excludeCategoryList: data,
    isLoadingFilter: false,
  };
};

export const getCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    excludeCategoryList: [...INITIAL_STATE.excludeCategoryList],
    isLoadingFilter: false,
    error,
  };
};

export const getSubCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    excludeSubCategoryList: [...INITIAL_STATE.excludeSubCategoryList],
    isLoadingFilter: true,
  };
};

export const getSubCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    excludeSubCategoryList: data.data,
    isLoadingFilter: false,
  };
};

export const getSubCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    excludeSubCategoryList: [...INITIAL_STATE.excludeSubCategoryList],
    isLoadingFilter: false,
    error,
  };
};

export const fetchCompetitorListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    competitorList: [...INITIAL_STATE.competitorList],
    isLoadingCompetitorFilter: true,
    isLoading: true,
  };
};

export const fetchCompetitorListSuccess = (
  state = INITIAL_STATE,
  { competitorList },
) => {
  return {
    ...state,
    competitorList,
    isLoadingCompetitorFilter: false,
  };
};

export const fetchCompetitorListFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    competitorList: [...INITIAL_STATE.competitorList],
    isLoadingCompetitorFilter: false,
    error,
  };
};

export const postIndexByDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    tableDataBackup: [...INITIAL_STATE.tableDataBackup],
    tableData: [...INITIAL_STATE.tableData],
    tableOverall: { ...INITIAL_STATE.tableOverall },
    excelExportCategory: { ...INITIAL_STATE.excelExportCategory },
    isLoading: true,
  };
};

export const postIndexByDataSuccess = (state = INITIAL_STATE, { data }) => {
  const productList = [];
  const supplierList = [];
  const brandList = [];
  const categoryList = [];
  const subCategoryList = [];

  const currentProduct = [];

  data?.result?.forEach(element => {
    if (
      !productList.includes(element[FILTER_KEY.PRODUCT]) &&
      element[FILTER_KEY.PRODUCT]
    ) {
      productList.push(element[FILTER_KEY.PRODUCT]);
    }
    if (
      !categoryList.includes(element[FILTER_KEY.CATEGORY]) &&
      element[FILTER_KEY.CATEGORY]
    ) {
      categoryList.push(element[FILTER_KEY.CATEGORY]);
    }
    if (
      !subCategoryList.includes(element[FILTER_KEY.SUBCATEGORY]) &&
      element[FILTER_KEY.SUBCATEGORY]
    ) {
      subCategoryList.push(element[FILTER_KEY.SUBCATEGORY]);
    }

    if (state.indexBy === INDEX_BY_LIST.PRODUCT[0]) {
      element[FILTER_KEY.SUPPLIER].map(item => (!supplierList.includes(item) && item ? supplierList.push(item) : null));
      if (
        !brandList.includes(element[FILTER_KEY.BRAND]) &&
        element[FILTER_KEY.BRAND]
      ) {
        brandList.push(element[FILTER_KEY.BRAND]);
      }
    }
  });

  if (
    state.selectedProduct &&
    Object.values(state.selectedProduct)?.length > 0
  ) {
    Object.values(data.result).map(
      item => item?.key === state.selectedProduct?.key && currentProduct.push(item),
    );
  }

  return {
    ...state,
    tableDataBackup: data.result,
    tableData: currentProduct?.length > 0 ? currentProduct : data.result,
    tableOverall: data?.overall || {},
    productList,
    brandList,
    supplierList,
    categoryList,
    subCategoryList,
    productListBackup: productList,
    brandListBackup: brandList,
    supplierListBackup: supplierList,
    categoryListBackup: categoryList,
    subCategoryListBackup: subCategoryList,
    excelExportCategory: data.excel_export,
    tableVisible: true,
    isLoading: false,
  };
};

export const postIndexByDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    tableDataBackup: [...INITIAL_STATE.tableDataBackup],
    tableData: [...INITIAL_STATE.tableData],
    tableOverall: { ...INITIAL_STATE.tableOverall },
    excelExportCategory: { ...INITIAL_STATE.excelExportCategory },
    isLoading: false,
    tableVisible: false,
    error,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SET_COMPETITOR_LIST]: setCompetitorList,
  [Types.SET_INITIAL_TABLE]: setInitialTable,
  [Types.SET_INDEX_BY]: setIndexBy,
  [Types.SET_SELECTED_PRODUCT]: setSelectedProduct,
  [Types.SET_FILTER_LIST]: setFilterList,
  [Types.SET_CLEAR_FILTER]: setClearFilter,

  [Types.GET_CATEGORIES_REQUEST]: getCategoriesRequest,
  [Types.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
  [Types.GET_CATEGORIES_FAILURE]: getCategoriesFailure,

  [Types.GET_SUB_CATEGORIES_REQUEST]: getSubCategoriesRequest,
  [Types.GET_SUB_CATEGORIES_SUCCESS]: getSubCategoriesSuccess,
  [Types.GET_SUB_CATEGORIES_FAILURE]: getSubCategoriesFailure,

  [Types.FETCH_COMPETITOR_LIST_REQUEST]: fetchCompetitorListRequest,
  [Types.FETCH_COMPETITOR_LIST_SUCCESS]: fetchCompetitorListSuccess,
  [Types.FETCH_COMPETITOR_LIST_FAILURE]: fetchCompetitorListFailure,

  [Types.POST_INDEX_BY_DATA_REQUEST]: postIndexByDataRequest,
  [Types.POST_INDEX_BY_DATA_SUCCESS]: postIndexByDataSuccess,
  [Types.POST_INDEX_BY_DATA_FAILURE]: postIndexByDataFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
