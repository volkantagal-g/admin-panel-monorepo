import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createCourierGamificationTask: {
    isPending: false,
    isPendingStateForImageUploadToS3: false,
    data: {
      personIdsList: [],
      warehouseIds: [],
      requestBody: {},
      uploadedImageCdnUrl: '',
      isSuccess: null,
    },
  },
};

const cleanPersonIds = state => ({
  ...state,
  createCourierGamificationTask: {
    ...state.createCourierGamificationTask,
    isPending: false,
    personIdsList: [],
  },
});

const personIdsListRequest = (state, { warehouseIds }) => ({
  ...state,
  createCourierGamificationTask: {
    ...state.createCourierGamificationTask,
    isPending: true,
    warehouseIds,
  },
});

const personIdsListSuccess = (state, { data }) => ({
  ...state,
  createCourierGamificationTask: {
    ...state.createCourierGamificationTask,
    isPending: false,
    data: { personIdsList: data, warehouseIds: [] },
  },
});

const personIdsListFailure = (state, { error }) => ({
  ...state,
  createCourierGamificationTask: {
    ...state.createCourierGamificationTask,
    isPending: false,
    data: { personIdsList: error },
  },
});

const createCourierGamificationTaskRequest = (state, { requestBody }) => ({
  ...state,
  createCourierGamificationTask: {
    ...state.createCourierGamificationTask,
    isPending: true,
    data: {
      ...state.createCourierGamificationTask.data,
      requestBody: { requestBody },
    },
  },
});
const createCourierGamificationTaskSuccess = (state, resp) => ({
  ...state,
  createCourierGamificationTask: {
    ...state.createCourierGamificationTask,
    isPending: false,
    data: {
      ...state.createCourierGamificationTask.data,
      isSuccess: resp,
    },
  },
});

const createCourierGamificationTaskFailure = state => ({
  ...state,
  createCourierGamificationTask: {
    ...state.createCourierGamificationTask,
    isPending: false,
  },
});

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
  [Types.CREATE_COURIER_GAMIFICATION_TASK_REQUEST]: createCourierGamificationTaskRequest,
  [Types.CREATE_COURIER_GAMIFICATION_TASK_SUCCESS]: createCourierGamificationTaskSuccess,
  [Types.CREATE_COURIER_GAMIFICATION_TASK_FAILURE]: createCourierGamificationTaskFailure,
  [Types.GET_PERSON_IDS_LIST_REQUEST]: personIdsListRequest,
  [Types.GET_PERSON_IDS_LIST_SUCCESS]: personIdsListSuccess,
  [Types.GET_PERSON_IDS_LIST_FAILURE]: personIdsListFailure,
  [Types.UPLOAD_COURIER_TASK_IMAGE_REQUEST]: uploadCourierTaskImageRequest,
  [Types.UPLOAD_COURIER_TASK_IMAGE_SUCCESS]: uploadCourierTaskImageSuccess,
  [Types.UPLOAD_COURIER_TASK_IMAGE_FAILURE]: uploadCourierTaskImageFailure,
  [Types.CLEAN_PERSON_IDS]: cleanPersonIds,
  [Types.DESTROY_PAGE]: destroyPage,
};
export default createReducer(INITIAL_STATE, HANDLERS);
