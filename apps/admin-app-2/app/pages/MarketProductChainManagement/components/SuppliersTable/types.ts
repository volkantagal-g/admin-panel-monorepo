export interface FilterOption {
  id: string;
  name: string;
}

export interface Supplier {
  id: string;
  key: string;
  name: string;
  supplierId: string;
  isManufacturer: boolean;
  isSupplier: boolean;
  netBuyingPrice: number | null;
  bonuses: number;
  isPreferred: boolean;
  // Computed properties
  type: 'manufacturer' | 'supplier';
  preferred: boolean;
}

export interface SupplierFilters {
  search?: string;
  type?: string | undefined;
  preferred?: string | undefined;
  status?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  field: string;
  order: 'ascend' | 'descend' | undefined;
}

export interface TableParams {
  productId: string;
  filters?: SupplierFilters;
  pagination?: PaginationParams;
  sort?: SortParams;
}

export interface SuppliersState {
  data: Supplier[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  filters: SupplierFilters;
  pagination: PaginationParams;
  sort: SortParams;
}
