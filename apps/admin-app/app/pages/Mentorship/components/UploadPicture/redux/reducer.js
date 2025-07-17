import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  uploadPicture: {
    isPending: false,
    url: '',
  },
};

const uploadPictureURLRequest = state => ({
  ...state,
  uploadPicture: {
    ...state.uploadPicture,
    isPending: true,
    url: '',
  },
});

const uploadPictureURLSuccess = (state, { url }) => ({
  ...state,
  uploadPicture: {
    ...state.uploadPicture,
    isPending: false,
    url,
  },
});

const uploadPictureURLFailure = state => ({
  ...state,
  uploadPicture: {
    ...state.uploadPicture,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_UPLOAD_PICTURE_URL_REQUEST]: uploadPictureURLRequest,
  [Types.GET_UPLOAD_PICTURE_URL_SUCCESS]: uploadPictureURLSuccess,
  [Types.GET_UPLOAD_PICTURE_URL_FAILURE]: uploadPictureURLFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
