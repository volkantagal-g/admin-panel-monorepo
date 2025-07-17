import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getGiveawayEvents: {
    data: [],
    isPending: false,
    error: null,
  },
  deliverGiveawayEvent: {
    isPending: false,
    error: null,
  },
  getDrawDiscountCode: {
    isPending: false,
    error: null,
  },
};

export const getGiveawayEventsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getGiveawayEvents: {
      ...INITIAL_STATE.getGiveawayEvents,
      isPending: true,
    },
  };
};

export const getGiveawayEventsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getGiveawayEvents: {
      ...INITIAL_STATE.getGiveawayEvents,
      data: data?.draws,
      isPending: false,
    },
  };
};

export const getGiveawayEventsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getGiveawayEvents: {
      ...INITIAL_STATE.getGiveawayEvents,
      isPending: false,
      error,
    },
  };
};

export const deliverGiveawayEventRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deliverGiveawayEvent: {
      ...INITIAL_STATE.deliverGiveawayEvent,
      isPending: true,
    },
  };
};

export const deliverGiveawayEventSuccess = (state = INITIAL_STATE, { id, isDelivered }) => {
  return {
    ...state,
    deliverGiveawayEvent: {
      ...INITIAL_STATE.deliverGiveawayEvent,
      isPending: false,
    },
    getGiveawayEvents: {
      ...INITIAL_STATE.getGiveawayEvents,
      data: state.getGiveawayEvents.data?.map(draw => {
        if (draw._id === id) {
          return { ...draw, isDelivered };
        }
        return draw;
      }),
    },
  };
};

export const deliverGiveawayEventFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deliverGiveawayEvent: {
      ...INITIAL_STATE.deliverGiveawayEvent,
      isPending: false,
      error,
    },
  };
};
export const getDrawDiscountCodeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getDrawDiscountCode: {
      ...INITIAL_STATE.getDrawDiscountCode,
      isPending: true,
    },
  };
};

export const getDrawDiscountCodeSuccess = (state = INITIAL_STATE, { id, code }) => {
  return {
    ...state,
    getDrawDiscountCode: {
      ...INITIAL_STATE.getDrawDiscountCode,
      isPending: false,
    },
    getGiveawayEvents: {
      ...INITIAL_STATE.getGiveawayEvents,
      data: state.getGiveawayEvents.data?.map(draw => {
        if (draw._id === id) {
          return { ...draw, code };
        }
        return draw;
      }),
    },
  };
};

export const getDrawDiscountCodeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getDrawDiscountCode: {
      ...INITIAL_STATE.getDrawDiscountCode,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_GIVEAWAY_EVENTS_REQUEST]: getGiveawayEventsRequest,
  [Types.GET_GIVEAWAY_EVENTS_SUCCESS]: getGiveawayEventsSuccess,
  [Types.GET_GIVEAWAY_EVENTS_FAILURE]: getGiveawayEventsFailure,
  [Types.DELIVER_GIVEAWAY_EVENT_REQUEST]: deliverGiveawayEventRequest,
  [Types.DELIVER_GIVEAWAY_EVENT_SUCCESS]: deliverGiveawayEventSuccess,
  [Types.DELIVER_GIVEAWAY_EVENT_FAILURE]: deliverGiveawayEventFailure,
  [Types.GET_DRAW_DISCOUNT_CODE_REQUEST]: getDrawDiscountCodeRequest,
  [Types.GET_DRAW_DISCOUNT_CODE_SUCCESS]: getDrawDiscountCodeSuccess,
  [Types.GET_DRAW_DISCOUNT_CODE_FAILURE]: getDrawDiscountCodeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
