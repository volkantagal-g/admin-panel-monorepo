// Global type declarations for all modules

// Component Types
declare module './types' {
  export interface DarkStore {
    id: string | number;
    name: string;
    domains: {
      id: number;
      name: string;
      class: string;
    }[];
    type: number;
    city: string;
    region: string;
    demography: string | number;
    demographyClass: string;
    size: string;
    sizeClass: string;
    sizeIcon: string;
    productsCount: number;
    centralWarehousesCount: number;
    suppliersCount: number;
  }

  export interface DarkStoreFilters {
    search?: string;
    domain?: string | number;
    warehouseType?: string | number;
    city?: string | number;
    region?: string | number;
    demography?: string | number;
    size?: string | number;
  }

  export interface TablePagination {
    page: number;
    pageSize: number;
  }

  export interface TableSort {
    field: string;
    order: 'ascend' | 'descend' | null;
  }
}

// Styles
declare module './styles' {
  export const useStyles: () => {
    container: string;
    filtersContainer: string;
    formItem: string;
    table: string;
    domainTag: string;
    demographyBadge: string;
    sizeBadge: string;
    [key: string]: string;
  };
}

// Redux modules
// Constants
declare module './redux/constants' {
  export const FETCH_DARK_STORES_REQUEST: string;
  export const FETCH_LOOKUPS_REQUEST: string;
}

// Types
declare module './redux/types' {
  export interface FetchDarkStoresRequestAction {
    type: string;
    payload: {
      filters: any;
      pagination: {
        page: number;
        pageSize: number;
      };
      sort?: {
        field: string;
        order?: 'ascend' | 'descend' | null;
      };
    };
  }
}

// Actions
declare module './redux/actions' {
  export function fetchDarkStoresSuccess(data: any): any;
  export function fetchDarkStoresFailure(error: any): any;
  export function fetchLookupsSuccess(data: any): any;
  export function fetchLookupsFailure(error: any): any;
}

// Redux
declare module './redux/reducer' {
  const reducer: any;
  export default reducer;
}

declare module './redux/saga' {
  const saga: any;
  export default saga;
}

declare module './redux/selectors' {
  export const selectDarkStores: any;
  export const selectLoading: any;
  export const selectTotalCount: any;
  export const selectFilters: any;
  export const selectPagination: any;
  export const selectSort: any;
  export const selectCities: any;
  export const selectRegions: any;
  export const selectDemographies: any;
  export const selectSizes: any;
  export const selectLookupsLoading: any;
  export const selectDomains: any;
}
