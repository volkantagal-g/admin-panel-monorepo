import { createActions } from 'reduxsauce';

import { Chain, ChainResponse } from './types';
import { UpdateChainAction } from '../Detail/redux/types';

const { Types, Creators } = createActions({
  // Initialize actions
  initPage: null,
  destroyPage: null,

  // Get chain list
  getChainListRequest: null,
  getChainListSuccess: ['data'],
  getChainListFailure: ['error'],

  // Filter chains
  filterChainsRequest: ['filterParams'],
  filterChainsSuccess: ['data', 'total', 'filterParams'],
  filterChainsFailure: ['error'],

  // Form values change action
  handleFormValuesChangeRequest: ['changedValues', 'allValues'],

  // Load more chains (pagination)
  // loadMoreChainsRequest: ['page'],
  // loadMoreChainsSuccess: ['data', 'page', 'totalItems'],
  // loadMoreChainsFailure: ['error'],

  // Selected chains management
  setSelectedChains: ['chainIds'],
  clearSelectedChains: null,
  setBulkEditMode: ['isBulkEditMode'],
  openBulkEditDrawer: null,

  // Sort actions
  setSortConfig: ['sortConfig'],

  // Bulk edit actions
  bulkEditChainsRequest: ['updates'],
  bulkEditChainsSuccess: ['data'],
  bulkEditChainsFailure: ['error'],
  closeEditDrawer: null,

  // Chain active status update
  updateChainActiveRequest: ['chainId', 'isActive', 'domainType', 'uniqueId'],
  updateChainActiveSuccess: ['chains', 'uniqueId'],
  updateChainActiveFailure: ['error', 'uniqueId'],

  // Category options
  getCategoryOptionsRequest: null,
  getCategoryOptionsSuccess: ['options'],
  getCategoryOptionsFailure: ['error'],

  getL4CategoryOptionsRequest: ['l3CategoryIds'],
  getL4CategoryOptionsSuccess: ['options'],
  getL4CategoryOptionsFailure: ['error'],

  setLoading: ['loading'],

  // Chain nodes
  getChainNodesRequest: ['edgeType'],
  getChainNodesSuccess: ['edgeType', 'data'],
  getChainNodesFailure: ['error'],

  // Domain types lookup
  getDomainTypesRequest: null,
  getDomainTypesSuccess: ['data'],
  getDomainTypesFailure: ['error'],

  // Product lookup
  searchProductsRequest: ['searchTerm'],
  searchProductsSuccess: ['data'],
  searchProductsFailure: ['error'],
  setProductSearchLoading: ['isLoading'],
});

export { Types, Creators };
