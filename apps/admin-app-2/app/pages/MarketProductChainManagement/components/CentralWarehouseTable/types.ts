import { TablePaginationConfig } from 'antd/lib/table';
import { SorterResult } from 'antd/lib/table/interface';

export interface CentralWarehouse {
  id: string;
  name: string;
  domain?: string;
  city?: string;
  region?: string;
}

export interface FilterOption {
  id: string;
  name: string;
  value?: string;
  label?: string;
}

export interface CentralWarehouseFilters {
  search?: string;
  domain?: string | null;
  city?: string | null;
  region?: string | null;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  field?: string;
  order?: 'ascend' | 'descend' | string;
}

export interface FormValues {
  filters: CentralWarehouseFilters;
  pagination: PaginationParams;
  sort?: SortParams;
}

export interface CentralWarehouseTableProps {
  data?: CentralWarehouse[];
  loading?: boolean;
  error?: Error | null;
  totalCount?: number;
  filters: CentralWarehouseFilters;
  pagination: PaginationParams;
  sort?: SortParams;
  fetchData: (params: {
    filters?: CentralWarehouseFilters;
    pagination?: PaginationParams;
    sort?: SortParams
  }) => void;
  cities?: FilterOption[];
  citiesLoading?: boolean;
  onCitySearch?: (search: string) => void;
  regions?: FilterOption[];
  regionsLoading?: boolean;
  onRegionSearch?: (search: string) => void;
  domainTypes?: FilterOption[];
  domainTypesLoading?: boolean;
}
