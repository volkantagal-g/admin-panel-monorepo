export interface DarkStoreCentralWarehousesTableProps {
  darkStoreVertexId?: string;
  onTotalCountChange?: (count: number) => void;
}

export interface CentralWarehouse {
  id: string;
  name: string;
  domain: string;
  domainClasses?: string[];
  city: string;
  region: string;
  categories: number;
  products: number;
  suppliers: number;
}

export interface CentralWarehouseFilters {
  search?: string;
  domain?: string | number;
  city?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  field: string;
  order: 'ascend' | 'descend' | undefined;
}

export interface FilterOption {
  id: string;
  name: string;
  value?: string;
}

export interface TableParams {
  filters?: CentralWarehouseFilters;
  pagination?: PaginationParams;
  sort?: SortParams;
  darkStoreVertexId?: string;
  onTotalCountChange?: (count: number) => void;
}

export interface CentralWarehouseState {
  data: CentralWarehouse[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  filters: CentralWarehouseFilters;
  pagination: PaginationParams;
  sort: SortParams;
  domains: FilterOption[];
  cities: FilterOption[];
  lookupsLoading: boolean;
}
