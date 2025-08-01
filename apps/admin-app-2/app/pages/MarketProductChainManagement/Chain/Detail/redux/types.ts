import { Moment } from 'moment';

import { Types } from './actions';

// Form değerleri için tip tanımı
export interface FormValues {
  chainType?: string;
  storageType?: string;
  productSegmentPlanning?: number;
  productSegmentLogistic?: number;
  introductionDate?: Moment;
  terminationDate?: Moment;
  batchSize?: number;
  minOrderQuantity?: number;
  minStock?: number;
  segment?: string;
  segment2?: string;
  planningSegment?: string;
  pickedToZero?: boolean;
  isEnabled?: boolean;
}

export interface ProductDetail {
  id: string;
  productId: string;
  nameTR: string;
  nameEN: string;
}

export interface SupplierDetail {
  id: string;
  warehouseId: string;
  name: string;
  type: string;
}

export interface LocationDetail {
  id: string;
  warehouseId: string;
  name: string;
  type: string;
}

export interface DomainDetail {
  id: string;
  name: string;
}

export interface ChainDetail {
  id: string;
  chainType: string;
  storageType?: string;
  productSegmentPlanning?: number;
  productSegmentLogistic?: number;
  introductionDate: string;
  terminationDate: string;
  createdAt: string;
  updatedAt: string;
  batchSize?: number;
  minOrderQuantity?: number;
  minStock?: number;
  segment?: string;
  segment2?: string;
  planningSegment?: string;
  pickedToZero?: boolean;
  isEnabled?: boolean;
}

export interface ChainDetailResponse {
  success: boolean;
  data: {
    chain: ChainDetail;
    product: ProductDetail;
    supplier: SupplierDetail;
    location: LocationDetail;
    domain: DomainDetail;
  };
}

export interface ChainDetailState {
  chain: ChainDetail | null;
  product: ProductDetail | null;
  supplier: SupplierDetail | null;
  location: LocationDetail | null;
  domain: DomainDetail | null;
  isLoading: boolean;
  error: string | null;
  isEditMode: boolean;
}

export interface GetChainDetailAction {
  type: typeof Types.GET_CHAIN_DETAIL_REQUEST;
  chainId: string;
  domainType?: string;
}

export interface UpdateChainRequestData {
  chainId: string;
  updates: Partial<ChainDetail>;
  domainType?: string | number;
}

export interface UpdateChainAction {
  type: typeof Types.UPDATE_CHAIN_REQUEST;
  chainId: string;
  updates: FormValues;
  domainType?: string | number;
}

export const INITIAL_STATE: ChainDetailState = {
  chain: null,
  product: null,
  supplier: null,
  location: null,
  domain: null,
  isLoading: false,
  error: null,
  isEditMode: false,
};
