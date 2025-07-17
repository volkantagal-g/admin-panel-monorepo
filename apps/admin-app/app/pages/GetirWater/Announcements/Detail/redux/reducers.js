import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  updateAnnouncement: {
    data: {},
    isPending: false,
    error: null,
  },
  announcementDetail: {
    data: {},
    isPending: false,
  },
  vendors: {
    data: [],
    isPending: false,
    error: null,
  },
  vendorsProducts: {
    data: [],
    isPending: false,
    error: null,
  },
  brands: {
    data: [],
    isPending: false,
    error: null,
  },
  announcements: {
    data: [],
    isPending: false,
    error: null,
  },
  campaignImageUrl: {
    isPending: false,
    error: null,
  },
};

// update announcement

export const updateAnnouncementRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateAnnouncement: {
      ...state.updateAnnouncement,
      isPending: true,
    },
  };
};

export const updateAnnouncementSuccess = (state = INITIAL_STATE, { announcements }) => {
  return {
    ...state,
    updateAnnouncement: {
      ...state.updateAnnouncement,
      data: announcements,
      isPending: false,
    },
  };
};

export const updateAnnouncementFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateAnnouncement: {
      ...state.updateAnnouncement,
      isPending: false,
      error,
    },
  };
};

// get vendors
export const getVendorsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      isPending: true,
    },
  };
};

export const getVendorsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      data,
      isPending: false,
    },
  };
};

export const getVendorsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      isPending: false,
      error,
    },
  };
};

// announcement detail

export const announcementDetailRequest = (state = INITIAL_STATE) => ({
  ...state,
  announcementDetail: {
    data: {},
    isPending: true,
  },
});

export const announcementSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  announcementDetail: {
    ...state.announcementDetail,
    data: data.payload,
    isPending: false,
  },
});

export const announcementFailure = (state = INITIAL_STATE) => ({
  ...state,
  announcementDetail: {
    ...state.announcementDetail,
    data: {},
    isPending: false,
  },
});

// get vendors Product

export const getVendorsProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    vendorsProducts: {
      ...state.vendorsProducts,
      isPending: true,
    },
  };
};

export const getVendorsProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    vendorsProducts: {
      ...state.vendorsProducts,
      data,
      isPending: false,
    },
  };
};

export const getVendorsProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    vendorsProducts: {
      ...state.vendorsProducts,
      isPending: false,
      error,
    },
  };
};

// get brands

export const getBrandsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    brands: {
      ...state.brands,
      isPending: true,
    },
  };
};

export const getBrandsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    brands: {
      ...state.brands,
      data,
      isPending: false,
    },
  };
};

export const getBrandsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    brands: {
      ...state.brands,
      isPending: false,
      error,
    },
  };
};

// get announcements

export const getAnnouncementsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    announcements: {
      ...INITIAL_STATE.announcements,
      isPending: true,
    },
  };
};

export const getAnnouncementsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    announcements: {
      ...INITIAL_STATE.announcements,
      data,
      isPending: false,
    },
  };
};

export const getAnnouncementsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    announcements: {
      ...INITIAL_STATE.announcements,
      isPending: false,
      error,
    },
  };
};

export const campaignImageUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    campaignImageUrl: {
      ...INITIAL_STATE.campaignImageUrl,
      isPending: true,
    },
  };
};

export const campaignImageUrlSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    campaignImageUrl: {
      ...INITIAL_STATE.campaignImageUrl,
      isPending: false,
    },
  };
};

export const campaignImageUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    campaignImageUrl: {
      ...INITIAL_STATE.campaignImageUrl,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.UPDATE_ANNOUNCEMENT_REQUEST]: updateAnnouncementRequest,
  [Types.UPDATE_ANNOUNCEMENT_SUCCESS]: updateAnnouncementSuccess,
  [Types.UPDATE_ANNOUNCEMENT_FAILURE]: updateAnnouncementFailure,
  [Types.GET_ANNOUNCEMENT_DETAIL_REQUEST]: announcementDetailRequest,
  [Types.GET_ANNOUNCEMENT_DETAIL_SUCCESS]: announcementSuccess,
  [Types.GET_ANNOUNCEMENT_DETAIL_FAILURE]: announcementFailure,
  [Types.VENDORS_PRODUCTS_REQUEST]: getVendorsProductsRequest,
  [Types.VENDORS_PRODUCTS_SUCCESS]: getVendorsProductsSuccess,
  [Types.VENDORS_PRODUCTS_FAILURE]: getVendorsProductsFailure,
  [Types.GET_VENDORS_REQUEST]: getVendorsRequest,
  [Types.GET_VENDORS_SUCCESS]: getVendorsSuccess,
  [Types.GET_VENDORS_FAILURE]: getVendorsFailure,
  [Types.GET_BRANDS_REQUEST]: getBrandsRequest,
  [Types.GET_BRANDS_SUCCESS]: getBrandsSuccess,
  [Types.GET_BRANDS_FAILURE]: getBrandsFailure,
  [Types.GET_ANNOUNCEMENTS_REQUEST]: getAnnouncementsRequest,
  [Types.GET_ANNOUNCEMENTS_SUCCESS]: getAnnouncementsSuccess,
  [Types.GET_ANNOUNCEMENTS_FAILURE]: getAnnouncementsFailure,
  [Types.CAMPAIGN_IMAGE_URL_REQUEST]: campaignImageUrlRequest,
  [Types.CAMPAIGN_IMAGE_URL_SUCCESS]: campaignImageUrlSuccess,
  [Types.CAMPAIGN_IMAGE_URL_FAILURE]: campaignImageUrlFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
