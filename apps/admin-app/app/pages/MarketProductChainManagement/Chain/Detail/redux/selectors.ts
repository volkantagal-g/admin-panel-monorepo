import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { ChainDetailState } from './types';

// Define RootState interface locally to avoid circular dependencies
interface RootState {
  [key: string]: ChainDetailState;
}

// Selectors
export const selectChainDetail = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN_DETAIL]?.chain || null;
export const selectProductDetail = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN_DETAIL]?.product || null;
export const selectSupplierDetail = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN_DETAIL]?.supplier || null;
export const selectLocationDetail = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN_DETAIL]?.location || null;
export const selectDomainDetail = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN_DETAIL]?.domain || null;
export const selectChainDetailLoading = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN_DETAIL]?.isLoading || false;
export const selectChainDetailError = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN_DETAIL]?.error || null;
export const selectIsEditMode = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN_DETAIL]?.isEditMode || false;

// Combined selectors
export const selectChainDetailData = (state: RootState) => {
  const chainState = state[REDUX_STORE_KEYS.CHAIN_DETAIL];
  if (!chainState?.chain) return null;

  return {
    ...chainState.chain,
    product: chainState.product,
    supplier: chainState.supplier,
    location: chainState.location,
    domain: chainState.domain,
  };
};
