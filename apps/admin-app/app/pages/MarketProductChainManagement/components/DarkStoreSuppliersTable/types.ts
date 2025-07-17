export interface DarkStoreSuppliersTableProps {
    darkStoreVertexId?: string;
    onTotalCountChange?: (count: number) => void;
  }

export interface Supplier {
    id: string;
    name: string;
    type: string;
    categories: number;
    products: number;
    centralWarehouses: number;
  }

export interface SupplierFilters {
    search?: string;
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
    filters?: SupplierFilters;
    pagination?: PaginationParams;
    sort?: SortParams;
    darkStoreVertexId?: string;
    onTotalCountChange?: (count: number) => void;
  }

export interface SupplierState {
    data: Supplier[];
    loading: boolean;
    error: Error | null;
    totalCount: number;
    filters: SupplierFilters;
    pagination: PaginationParams;
    sort: SortParams;
    domains: FilterOption[];
    cities: FilterOption[];
    lookupsLoading: boolean;
  }
