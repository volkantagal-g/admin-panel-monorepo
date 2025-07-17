import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  autoSegments: {
    isPending: false,
    data: [],
  },
  autoSegmentTemplate: {
    isPending: false,
    data: {},
  },
  clientListTemplates: {
    isPending: false,
    data: [],
  },
};

const autoSegmentsRequest = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    isPending: true,
    data: [],
  },
});

const autoSegmentsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    isPending: false,
    data,
  },
});

const autoSegmentsFailure = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    isPending: false,
  },
});

const activateAutoSegmentTemplateRequest = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: { ...state.autoSegments },
});

const activateAutoSegmentTemplateSuccess = (state = INITIAL_STATE, { autoSegmentTemplate }) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    data: state.autoSegments.data.map(item => {
      if (item._id === autoSegmentTemplate._id) {
        return autoSegmentTemplate;
      }

      return item;
    }),
  },
});

const activateAutoSegmentTemplateFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    error,
  },
});

const deactivateAutoSegmentTemplateRequest = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: { ...state.autoSegments },
});

const deactivateAutoSegmentTemplateSuccess = (state = INITIAL_STATE, { autoSegmentTemplate }) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    data: state.autoSegments.data.map(item => {
      if (item._id === autoSegmentTemplate._id) {
        return autoSegmentTemplate;
      }

      return item;
    }),
  },
});

const deactivateAutoSegmentTemplateFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    error,
  },
});

const getSegmentClientCountsRequest = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: { ...state.autoSegments },
});

const getSegmentClientCountsSuccess = (state = INITIAL_STATE, { autoSegmentId, count }) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    data: state.autoSegments.data.map(item => {
      if (item._id === autoSegmentId) {
        // eslint-disable-next-line no-param-reassign
        item.count = count;
      }

      return item;
    }),
  },
});

const getSegmentClientCountsFailure = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: { ...state.autoSegments },
});

const clientListTemplatesRequest = (state = INITIAL_STATE) => ({
  ...state,
  clientListTemplates: {
    ...state.clientListTemplates,
    isPending: true,
    data: [],
  },
});

const clientListTemplatesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  clientListTemplates: {
    ...state.clientListTemplates,
    isPending: false,
    data,
  },
});

const clientListTemplatesFailure = (state = INITIAL_STATE) => ({
  ...state,
  clientListTemplates: {
    ...state.clientListTemplates,
    isPending: false,
  },
});

const getAutoSegmentTemplateRequest = state => ({
  ...state,
  autoSegmentTemplate: {
    ...state.autoSegmentTemplate,
    isPending: true,
    data: {},
  },
});

const getAutoSegmentTemplateSuccess = (state, { data }) => ({
  ...state,
  autoSegmentTemplate: {
    ...state.autoSegmentTemplate,
    isPending: false,
    data,
  },
});

const getAutoSegmentTemplateFailure = state => ({
  ...state,
  autoSegmentTemplate: {
    ...state.autoSegmentTemplate,
    isPending: false,
  },
});

const createAutoSegmentRequest = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: { ...state.autoSegments },
});

const createAutoSegmentSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    data: [data, ...state.autoSegments.data],
  },
});

const createAutoSegmentFailure = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: { ...state.autoSegments },
});

const updateAutoSegmentRequest = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    isPending: true,
  },
});

const updateAutoSegmentSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    isPending: false,
    data: state.autoSegments.data.map(item => {
      if (item._id === data._id) {
        return data;
      }

      return item;
    }),
  },
});

const updateAutoSegmentFailure = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    isPending: false,
  },
});

const activateAutoSegmentTemplateVersionRequest = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    isPending: true,
  },
});

const activateAutoSegmentTemplateVersionSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    isPending: false,
    data: state.autoSegments.data.map(item => {
      if (item._id === data._id) {
        return data;
      }

      return item;
    }),
  },
});

const activateAutoSegmentTemplateVersionFailure = (state = INITIAL_STATE) => ({
  ...state,
  autoSegments: {
    ...state.autoSegments,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_AUTO_SEGMENTS_REQUEST]: autoSegmentsRequest,
  [Types.GET_AUTO_SEGMENTS_SUCCESS]: autoSegmentsSuccess,
  [Types.GET_AUTO_SEGMENTS_FAILURE]: autoSegmentsFailure,

  [Types.CREATE_AUTO_SEGMENT_REQUEST]: createAutoSegmentRequest,
  [Types.CREATE_AUTO_SEGMENT_SUCCESS]: createAutoSegmentSuccess,
  [Types.CREATE_AUTO_SEGMENT_FAILURE]: createAutoSegmentFailure,

  [Types.UPDATE_AUTO_SEGMENT_REQUEST]: updateAutoSegmentRequest,
  [Types.UPDATE_AUTO_SEGMENT_SUCCESS]: updateAutoSegmentSuccess,
  [Types.UPDATE_AUTO_SEGMENT_FAILURE]: updateAutoSegmentFailure,

  [Types.ACTIVATE_AUTO_SEGMENT_TEMPLATE_VERSION_REQUEST]: activateAutoSegmentTemplateVersionRequest,
  [Types.ACTIVATE_AUTO_SEGMENT_TEMPLATE_VERSION_SUCCESS]: activateAutoSegmentTemplateVersionSuccess,
  [Types.ACTIVATE_AUTO_SEGMENT_TEMPLATE_VERSION_FAILURE]: activateAutoSegmentTemplateVersionFailure,

  [Types.ACTIVATE_AUTO_SEGMENT_TEMPLATE_REQUEST]: activateAutoSegmentTemplateRequest,
  [Types.ACTIVATE_AUTO_SEGMENT_TEMPLATE_SUCCESS]: activateAutoSegmentTemplateSuccess,
  [Types.ACTIVATE_AUTO_SEGMENT_TEMPLATE_FAILURE]: activateAutoSegmentTemplateFailure,

  [Types.DEACTIVATE_AUTO_SEGMENT_TEMPLATE_REQUEST]: deactivateAutoSegmentTemplateRequest,
  [Types.DEACTIVATE_AUTO_SEGMENT_TEMPLATE_SUCCESS]: deactivateAutoSegmentTemplateSuccess,
  [Types.DEACTIVATE_AUTO_SEGMENT_TEMPLATE_FAILURE]: deactivateAutoSegmentTemplateFailure,

  [Types.GET_SEGMENT_CLIENT_COUNTS_REQUEST]: getSegmentClientCountsRequest,
  [Types.GET_SEGMENT_CLIENT_COUNTS_SUCCESS]: getSegmentClientCountsSuccess,
  [Types.GET_SEGMENT_CLIENT_COUNTS_FAILURE]: getSegmentClientCountsFailure,

  [Types.GET_CLIENT_LIST_TEMPLATES_REQUEST]: clientListTemplatesRequest,
  [Types.GET_CLIENT_LIST_TEMPLATES_SUCCESS]: clientListTemplatesSuccess,
  [Types.GET_CLIENT_LIST_TEMPLATES_FAILURE]: clientListTemplatesFailure,

  [Types.GET_AUTO_SEGMENT_TEMPLATE_REQUEST]: getAutoSegmentTemplateRequest,
  [Types.GET_AUTO_SEGMENT_TEMPLATE_SUCCESS]: getAutoSegmentTemplateSuccess,
  [Types.GET_AUTO_SEGMENT_TEMPLATE_FAILURE]: getAutoSegmentTemplateFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
