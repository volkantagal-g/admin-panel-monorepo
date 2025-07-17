import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createWarehouseProposal: {
    isPending: false,
    isPendingStateForImageUploadToS3: false,
  },
};

const createWarehouseProposalRequest = state => ({
  ...state,
  createWarehouseProposal: {
    ...state.createWarehouseProposal,
    isPending: true,
  },
});

const createWarehouseProposalSuccess = state => ({
  ...state,
  createWarehouseProposal: {
    ...state.createWarehouseProposal,
    isPending: false,
  },
});

const createWarehouseProposalFailure = state => ({
  ...state,
  createWarehouseProposal: {
    ...state.createWarehouseProposal,
    isPending: false,
  },
});

export const uploadWarehouseProposalImageRequest = state => {
  return { ...state };
};

export const uploadWarehouseProposalImageSuccess = state => {
  return { ...state };
};

export const uploadWarehouseProposalImageFailure = state => {
  return { ...state };
};

export const uploadCourierTaskImageRequest = state => {
  return {
    ...state,
    createCourierGamificationTask: {
      ...state.createCourierGamificationTask,
      isPendingStateForImageUploadToS3: true,
    },
  };
};

export const uploadCourierTaskImageSuccess = (state, { uploadedImageCdnUrl, uploadedThumbnailImageCdnUrl }) => {
  return {
    ...state,
    createCourierGamificationTask: {
      ...state.createCourierGamificationTask,
      isPendingStateForImageUploadToS3: false,
      data: {
        ...state.createCourierGamificationTask.data,
        uploadedImageCdnUrl,
        uploadedThumbnailImageCdnUrl,
      },
    },
  };
};

export const uploadCourierTaskImageFailure = state => {
  return {
    ...state,
    createCourierGamificationTask: {
      ...state.createCourierGamificationTask,
      isPending: false,
      isPendingStateForImageUploadToS3: false,
      data: {
        ...state.createCourierGamificationTask.data,
        uploadedImageCdnUrl: '',
        uploadedThumbnailImageCdnUrl: '',
      },
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.CREATE_WAREHOUSE_PROPOSAL_REQUEST]: createWarehouseProposalRequest,
  [Types.CREATE_WAREHOUSE_PROPOSAL_SUCCESS]: createWarehouseProposalSuccess,
  [Types.CREATE_WAREHOUSE_PROPOSAL_FAILURE]: createWarehouseProposalFailure,
  [Types.UPLOAD_WAREHOUSE_PROPOSAL_IMAGE_REQUEST]: uploadWarehouseProposalImageRequest,
  [Types.UPLOAD_WAREHOUSE_PROPOSAL_IMAGE_SUCCESS]: uploadWarehouseProposalImageSuccess,
  [Types.UPLOAD_WAREHOUSE_PROPOSAL_IMAGE_FAILURE]: uploadWarehouseProposalImageFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};
export default createReducer(INITIAL_STATE, HANDLERS);
