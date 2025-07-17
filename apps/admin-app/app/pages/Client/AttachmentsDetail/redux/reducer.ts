import { createReducer } from 'reduxsauce';
import { Reducer } from 'redux';

import { Types } from './actions';
import { AllowedMimeType } from '../types';

type AttachmentViewURL = {
  type: AllowedMimeType,
  url: string,
};

export type State = {
  attachmentURL: {
    isPending: boolean,
    data?: AttachmentViewURL,
  },
};

export const INITIAL_STATE: State = {
  attachmentURL: {
    isPending: false,
    data: undefined,
  },
};

const attachmentURLRequest: Reducer<State> = (state = INITIAL_STATE) => ({
  ...state,
  attachmentURL: {
    ...state.attachmentURL,
    isPending: true,
    data: undefined,
  },
});

const attachmentURLSuccess: Reducer<State> = (state, { data }) => ({
  ...state,
  attachmentURL: {
    ...state?.attachmentURL,
    isPending: false,
    data,
  },
});

const attachmentURLFailure: Reducer<State> = (state = INITIAL_STATE) => ({
  ...state,
  attachmentURL: {
    ...state?.attachmentURL,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ATTACHMENT_URL_REQUEST]: attachmentURLRequest,
  [Types.GET_ATTACHMENT_URL_SUCCESS]: attachmentURLSuccess,
  [Types.GET_ATTACHMENT_URL_FAILURE]: attachmentURLFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer<State>(INITIAL_STATE, HANDLERS);
