import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.WAREHOUSE_PROPOSAL.CREATE;

export const createWarehouseProposalSelector = {
  getIsPending: state => state[reduxKey]?.createWarehouseProposal.isPending,
  getPendingStateForImageUploadToS3: state => state[reduxKey]?.createWarehouseProposal.isPendingStateForImageUploadToS3,
};
