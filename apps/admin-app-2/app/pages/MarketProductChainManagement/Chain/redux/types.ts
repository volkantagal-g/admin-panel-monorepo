import { FORM_FIELDS } from '../constants';
import { Types } from './actions';

export interface CategoryOption {
  id: string;
  name: string;
}

export interface CategoryOptions {
  [FORM_FIELDS.CATEGORY_LEVEL_3]: CategoryOption[];
  [FORM_FIELDS.CATEGORY_LEVEL_4]: CategoryOption[];
}

export interface ChainRawData {
  chain: {
    id: string;
    chainType: string;
    introductionDate: string;
    terminationDate: string;
    createdAt: string;
    updatedAt: string;
    updatedBy?: string;
    name: string;
    status: string;
    transferBoxCount: number;
    minOrderQuantity: number;
    minStock: number;
    batchSize?: number;
    segment: string;
    segment2: string;
    planningSegment: string;
    direct: boolean;
    isEnabled?: boolean;
    active?: boolean;
    productSegmentPlanning?: number;
    productSegmentLogistic?: number;
  };
  product: {
    id: string;
    productId: string;
    nameTR: string;
    nameEN: string;
  };
  supplier: {
    id: string;
    warehouseId: string;
    name: string;
    type: string;
  };
  location: {
    id: string;
    warehouseId: string;
    name: string;
    type: string;
  };
  domain: {
    id: string;
    name: string;
  };
}

export interface Chain {
  id: string;
  product: string;
  supplier: string;
  location: string;
  transferBoxCount: number;
  minOrderQuantity: number;
  minStock: number;
  segment: string;
  segment2: string;
  planningSegment: string;
  direct: boolean;
  active: boolean;
  domain: string;
  name?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
  chainType?: string;
  batchSize?: number;
  introductionDate?: string;
  terminationDate?: string;
  productId?: string;
  supplierType?: string;
  locationType?: string;
  rawData: ChainRawData;
  uniqueId?: string;
}

export interface ChainResponse {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  product: string;
  supplier: string;
  location: string;
  transferBoxCount: number;
  minOrderQuantity: number;
  minStock: number;
  segment: string;
  segment2: string;
  planningSegment: string;
  direct: boolean;
  active: boolean;
  domain?: string;
}

export interface ChainListResponse {
  data: ChainResponse[];
  total: number;
  page: number;
  pageSize: number;
}

export type ValidSortField =
  | 'productName'
  | 'supplierName'
  | 'locationName'
  | 'storageType'
  | 'batchSize'
  | 'minOrderQuantity'
  | 'minStock'
  | 'productSegmentPlanning'
  | 'productSegmentLogistic'
  | 'planningSegment'
  | 'introductionDate'
  | 'terminationDate'
  | 'createdAt'
  | 'updatedAt'
  | 'isEnabled'
  | 'status'
  | 'domainType';

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface Sort {
  field: ValidSortField;
  order: 'asc' | 'desc';
}

export interface FilterParams {
  page?: number;
  pageSize?: number;
  sortBy?: ValidSortField | string;
  sortOrder?: 'asc' | 'desc';
  products?: string[];
  suppliers?: string[];
  locations?: string[];
  domains?: string[];
  isEnabled?: boolean;
  search?: string;
  storageType?: string;
  locationTypes?: string[];
  supplierTypes?: string[];
  categories?: string[];
}

export interface SortConfig {
  field: string;
  order: 'asc' | 'desc';
}

export interface ChainNode {
  id: string;
  legacyId: string;
  name: {
    en: string;
    tr: string;
  };
}

export interface L4Category {
  id: string;
  legacyId: string;
  name: {
    tr: string;
    en: string;
  };
  parent: string;
}

export interface ChainState {
  chains: Chain[];
  isLoading: boolean;
  selectedChainIds: string[];
  isBulkEditMode: boolean;
  isDrawerOpen: boolean;
  isBulkEditing: boolean;
  error: string | null;
  sortConfig: SortConfig | null;
  nextCursor: string | null;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
  total: number;
  filterParams: FilterParams;
  categoryOptions: {
    [key: string]: any[];
  };
  chainNodeOptions: {
    supplier: ChainNode[];
    location: ChainNode[];
    domain: ChainNode[];
  };
  domainTypes: ChainNode[];
  productSearchOptions: Array<{ value: string; label: string }>;
  isSearchingProducts: boolean;
  updatingChains: Record<string, boolean>;
}

export interface RootState {
  [key: string]: ChainState;
}

// Action Types
export interface GetChainListAction {
  type: typeof Types.GET_CHAIN_LIST_REQUEST;
}

export interface FilterChainsAction {
  type: typeof Types.FILTER_CHAINS_REQUEST;
  filterParams: FilterParams;
}

// Form değerleri için tip tanımı
export interface ChainFormValues {
  storageType?: string;
  isEnabled?: boolean;
  minStock?: number;
  batchSize?: number;
  pickedToZero?: boolean;
  introductionDate?: any; // Moment nesnesi
  minOrderQuantity?: number;
  segment?: string;
  segment2?: string;
  terminationDate?: any; // Moment nesnesi
  planningSegment?: string;
}

export interface ChainDetail {
  chainId: string;
  domainTypeId?: string | number;
}

export interface BulkEditChainsAction {
  type: typeof Types.BULK_EDIT_CHAINS_REQUEST;
  updates: {
    chainDetails: ChainDetail[];
    formValues: ChainFormValues;
  };
}

export const INITIAL_STATE: ChainState = {
  chains: [],
  isLoading: false,
  selectedChainIds: [],
  isBulkEditMode: false,
  isDrawerOpen: false,
  isBulkEditing: false,
  error: null,
  sortConfig: null,
  nextCursor: null,
  hasNextPage: false,
  currentPage: 1,
  totalPages: 1,
  total: 0,
  filterParams: {
    pageSize: 20,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
  categoryOptions: {},
  chainNodeOptions: {
    supplier: [],
    location: [],
    domain: [],
  },
  domainTypes: [],
  productSearchOptions: [],
  isSearchingProducts: false,
  updatingChains: {},
};
