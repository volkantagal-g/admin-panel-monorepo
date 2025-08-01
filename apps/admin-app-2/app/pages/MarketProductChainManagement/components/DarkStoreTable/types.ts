export interface TableParams {
  productId: string;
  filters?: {
    search?: string;
    domain?: string;
    warehouseType?: number[];
    city?: string;
    region?: string;
    demography?: string;
    size?: string;
  };
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: {
    field?: string;
    order?: string;
  };
}

export type DarkStoreFilters = NonNullable<TableParams['filters']>;
export type PaginationParams = Required<NonNullable<TableParams['pagination']>>;
export type SortParams = NonNullable<TableParams['sort']>;

export interface DarkStore {
  id: string;
  key: string;
  name: string;
  domains: Array<{ id: number; name: string; class: string }>;
  type: number;
  city: string;
  region: string;
  demography: string;
  demographyClass: string;
  size: string;
  sizeClass: string;
  sizeIcon: string;
  categories: number;
  productsCount: number;
  centralWarehousesCount: number;
  suppliersCount: number;
}

export interface DarkStoresState {
  data: DarkStore[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  filters: DarkStoreFilters;
  pagination: PaginationParams;
  sort: SortParams;
  lookups: {
    cities: Array<{ id: string; name: string }>;
    regions: Array<{ id: string; name: string }>;
    domains: Array<{ id: string; name: string }>;
    demographies: Array<{ id: string; name: string }>;
    sizes: Array<{ id: string; name: string }>;
    loading: boolean;
    error: Error | null;
  };
}
