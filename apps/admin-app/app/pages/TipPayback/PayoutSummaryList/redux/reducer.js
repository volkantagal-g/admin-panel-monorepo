import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  summaries: {
    isPending: false,
    data: [],
    error: null,
  },
  cancelPayout: { data: [] },
  calculate: { data: [], error: null, isPending: false },
  payout: { data: [] },
  statusUpdate: { data: [] },
  triggerReport: { data: [] },
  pendingList: { cancel: {}, payout: {}, statusUpdate: {}, triggerReport: {} },
};

export const summariesRequest = (state = INITIAL_STATE) => ({
  ...state,
  summaries: {
    ...state.summaries,
    isPending: true,
    data: [],
  },
});

export const summariesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  summaries: {
    ...state.summaries,
    isPending: false,
    data,
  },
});

export const summariesFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  summaries: {
    ...state.summaries,
    isPending: false,
    error,
  },
});

export const cancelPayoutRequest = (state = INITIAL_STATE, { id }) => ({
  ...state,
  cancelPayout: {
    ...state.cancelPayout,
    data: [],
  },
  pendingList: {
    ...state.pendingList,
    cancel: {
      ...state.pendingList?.cancel,
      ...(id ? { [id]: true } : ''),

    },
  },
});

export const cancelPayoutSuccess = (state = INITIAL_STATE, { data, id }) => ({
  ...state,
  cancelPayout: {
    ...state.cancelPayout,
    data,
  },
  pendingList: {
    ...state.pendingList,
    cancel: {
      ...state.pendingList?.cancel,
      ...(id ? { [id]: false } : ''),
    },
  },
});

export const cancelPayoutFailure = (state = INITIAL_STATE, { id }) => ({
  ...state,
  cancelPayout: { ...state.cancelPayout },
  pendingList: {
    ...state.pendingList,
    cancel: {
      ...state.pendingList?.cancel,
      [id]: false,
    },
  },
});

export const calculateRequest = (state = INITIAL_STATE) => ({
  ...state,
  calculate: {
    ...state.calculate,
    isPending: true,
    data: [],
  },
});

export const calculateSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  calculate: {
    ...state.calculate,
    isPending: false,
    data,
  },
});

export const calculateFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  calculate: {
    ...state.calculate,
    isPending: false,
    error,
  },
});

export const payoutRequest = (state = INITIAL_STATE, { id }) => {
  return {
    ...state,
    payout: {
      ...state.payout,
      data: [],
    },
    pendingList: {
      ...state.pendingList,
      payout: {
        ...state.pendingList?.payout,
        ...(id ? { [id]: true } : ''),
      },
    },
  };
};

export const payoutSuccess = (state = INITIAL_STATE, { data, id }) => {
  return {
    ...state,
    payout: {
      ...state.payout,
      data,
    },
    pendingList: {
      ...state.pendingList,
      payout: {
        ...state.pendingList?.payout,
        ...(id ? { [id]: false } : ''),
      },
    },
  };
};

export const payoutFailure = (state = INITIAL_STATE, { id }) => {
  return {
    ...state,
    payout: { ...state.payout },
    pendingList: {
      ...state.pendingList,
      payout: {
        ...state.pendingList?.payout,
        ...(id ? { [id]: false } : ''),
      },
    },
  };
};

export const statusUpdateRequest = (state = INITIAL_STATE, { id }) => ({
  ...state,
  statusUpdate: {
    ...state.statusUpdate,
    data: [],
  },
  pendingList: {
    ...state.pendingList,
    statusUpdate: {
      ...state.pendingList?.statusUpdate,
      [id]: true,
    },
  },
});

export const statusUpdateSuccess = (state = INITIAL_STATE, { data, id }) => ({
  ...state,
  statusUpdate: {
    ...state.statusUpdate,
    data,
  },
  pendingList: {
    ...state.pendingList,
    statusUpdate: {
      ...state.pendingList?.statusUpdate,
      [id]: false,
    },
  },
});

export const statusUpdateFailure = (state = INITIAL_STATE, { id }) => ({
  ...state,
  statusUpdate: { ...state.statusUpdate },
  pendingList: {
    ...state.pendingList,
    statusUpdate: {
      ...state.pendingList?.statusUpdate,
      [id]: false,
    },
  },
});

export const triggerReportRequest = (state = INITIAL_STATE, { id }) => ({
  ...state,
  triggerReport: {
    ...state.triggerReport,
    data: [],
  },
  pendingList: {
    ...state.pendingList,
    triggerReport: {
      ...state.pendingList?.triggerReport,
      [id]: true,
    },
  },
});

export const triggerReportSuccess = (state = INITIAL_STATE, { data, id }) => ({
  ...state,
  triggerReport: {
    ...state.triggerReport,
    data,
  },
  pendingList: {
    ...state.pendingList,
    triggerReport: {
      ...state.pendingList?.triggerReport,
      [id]: false,
    },
  },
});

export const triggerReportFailure = (state = INITIAL_STATE, { id }) => ({
  ...state,
  triggerReport: { ...state.triggerReport },
  pendingList: {
    ...state.pendingList,
    triggerReport: {
      ...state.pendingList?.triggerReport,
      [id]: false,
    },
  },
});
const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_SUMMARIES_REQUEST]: summariesRequest,
  [Types.GET_SUMMARIES_SUCCESS]: summariesSuccess,
  [Types.GET_SUMMARIES_FAILURE]: summariesFailure,

  [Types.CANCEL_PAYOUT_REQUEST]: cancelPayoutRequest,
  [Types.CANCEL_PAYOUT_SUCCESS]: cancelPayoutSuccess,
  [Types.CANCEL_PAYOUT_FAILURE]: cancelPayoutFailure,

  [Types.CALCULATE_REQUEST]: calculateRequest,
  [Types.CALCULATE_SUCCESS]: calculateSuccess,
  [Types.CALCULATE_FAILURE]: calculateFailure,

  [Types.PAYOUT_REQUEST]: payoutRequest,
  [Types.PAYOUT_SUCCESS]: payoutSuccess,
  [Types.PAYOUT_FAILURE]: payoutFailure,

  [Types.STATUS_UPDATE_REQUEST]: statusUpdateRequest,
  [Types.STATUS_UPDATE_SUCCESS]: statusUpdateSuccess,
  [Types.STATUS_UPDATE_FAILURE]: statusUpdateFailure,

  [Types.TRIGGER_REPORT_REQUEST]: triggerReportRequest,
  [Types.TRIGGER_REPORT_SUCCESS]: triggerReportSuccess,
  [Types.TRIGGER_REPORT_FAILURE]: triggerReportFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
