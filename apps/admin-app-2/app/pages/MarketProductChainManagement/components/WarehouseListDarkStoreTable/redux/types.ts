// Dark Store data type
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
  warehouseId?: string;
}

// Dark Store filter types
export interface DarkStoreFilters {
  search?: string;
  domain?: string | number;
  warehouseType?: string | number;
  city?: string | number;
  region?: string | number;
  demography?: string | number;
  size?: string | number;
}

// Pagination settings
export interface TablePagination {
  page: number;
  pageSize: number;
}

// Sorting settings
export interface TableSort {
  field: string;
  order: 'ascend' | 'descend' | null;
}

// Combined table params
export interface TableParams {
  filters?: DarkStoreFilters;
  pagination: TablePagination;
  sort?: TableSort;
}

// Generic action interface
export interface Action {
  type: string;
  payload?: any;
}

// Specific action types
export interface FetchDarkStoresRequestAction extends Action {
  type: string;
  payload: TableParams;
}

export interface FetchDarkStoresSuccessAction extends Action {
  type: string;
  payload: {
    darkStores: DarkStore[];
    totalCount: number;
    filters: DarkStoreFilters;
    pagination: TablePagination;
    sort?: TableSort;
  };
}

export interface FetchDarkStoresFailureAction extends Action {
  type: string;
  payload: Error;
}

export interface FetchLookupsRequestAction extends Action {
  type: string;
}

export interface FetchLookupsSuccessAction extends Action {
  type: string;
  payload: {
    cities: any[];
    regions: any[];
    domains: any[];
    demographies: any[];
    sizes: any[];
    warehouseTypes: any[];
  };
}

export interface FetchLookupsFailureAction extends Action {
  type: string;
  payload: Error;
}
