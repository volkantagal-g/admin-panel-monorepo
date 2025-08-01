export interface DarkStoreProductsTableProps {
  darkStoreVertexId?: string;
  onTotalCountChange?: (count: number) => void;
}

export interface DemographyValue {
  id: string;
  value: number;
  name: string;
  class: string;
}

export interface SizeValue {
  id: string;
  value: number;
  name: string;
  class: string;
}

export interface Products {
  id: string;
  name: string;
  domain: string;
  domainClasses?: string[];
  city: string;
  region: string;
  state?: string;
  demography: string | number;
  demographyClass?: string;
  demographyValues?: DemographyValue[];
  size: string;
  sizeClass?: string;
  sizeValues?: SizeValue[];
  category: string;
  segment: number | null;
  local: boolean | null;
}

export interface ProductsFilters {
  search?: string;
  city?: number;
  region?: number;
  domain?: string | number;
  type?: string | number;
  preferred?: boolean;
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
  darkStoreVertexId?: string;
  filters?: ProductsFilters;
  pagination?: PaginationParams;
  sort?: SortParams;
}

export interface ProductsState {
  data: Products[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  filters: ProductsFilters;
  pagination: PaginationParams;
  sort: SortParams;
}
