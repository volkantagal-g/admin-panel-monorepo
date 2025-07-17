import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getWarehouseProposalRequest: { id: null },
  getWarehouseProposalSuccess: { warehouseProposal: {} },
  getWarehouseProposalFailure: { error: null },
  updateWarehouseProposalRequest: { id: null, warehouseProposal: {}, firstPhotosState: [] },
  updateWarehouseProposalSuccess: {},
  updateWarehouseProposalFailure: { error: null },
  updateWarehouseProposalStatusRequest: { status: null },
  updateWarehouseProposalStatusSuccess: {},
  updateWarehouseProposalStatusFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.WAREHOUSE_PROPOSAL.DETAIL}_` });
