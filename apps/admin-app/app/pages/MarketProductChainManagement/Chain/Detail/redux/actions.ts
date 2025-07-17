import { createActions } from 'reduxsauce';

import { ChainDetail, ChainDetailResponse } from './types';

const { Types, Creators } = createActions({
  // Get chain detail
  getChainDetailRequest: ['chainId', 'domainType'],
  getChainDetailSuccess: ['data'],
  getChainDetailFailure: ['error'],

  // Update chain
  updateChainRequest: ['chainId', 'updates', 'domainType'],
  updateChainSuccess: ['data'],
  updateChainFailure: ['error'],

  // Edit mode
  setEditMode: ['isEditMode'],

  // Cleanup
  destroyPage: null,
});

export { Types, Creators };
