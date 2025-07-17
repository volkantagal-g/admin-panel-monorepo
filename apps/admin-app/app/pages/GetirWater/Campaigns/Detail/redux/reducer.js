import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  updateCampaign: {
    data: {},
    isPending: false,
    error: null,
  },
  campaignDetail: {
    data: {},
    isPending: false,
  },
  vendors: {
    data: [],
    isPending: false,
    error: null,
  },
  brands: {
    data: [],
    isPending: false,
    error: null,
  },
  products: {
    data: [],
    isPending: false,
    error: null,
  },
  promoUsageDetail: {
    data: {},
    isPending: false,
  },
  updateCampaignStatus: {
    data: {},
    isPending: false,
    error: null,
  },
  campaignImageUrl: {
    isPending: false,
    error: null,
  },
  createSegment: {
    data: undefined,
    isPending: false,
    error: null,
  },
  getClientCountBySegment: {
    data: undefined,
    isPending: false,
    error: null,
  },
};

// update campaign

export const updateCampaignRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateCampaign: {
      ...state.updateCampaign,
      isPending: true,
    },
  };
};

export const updateCampaignSuccess = (state = INITIAL_STATE, { campaigns }) => {
  return {
    ...state,
    updateCampaign: {
      ...state.updateCampaign,
      data: campaigns,
      isPending: false,
    },
  };
};

export const updateCampaignFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateCampaign: {
      ...state.updateCampaign,
      isPending: false,
      error,
    },
  };
};

// campaign detail

export const campaignDetailRequest = (state = INITIAL_STATE) => ({
  ...state,
  campaignDetail: {
    data: {},
    isPending: true,
  },
});

export const campaignDetailSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  campaignDetail: {
    ...state.campaignDetail,
    data,
    isPending: false,
  },
});

export const campaignDetailFailure = (state = INITIAL_STATE) => ({
  ...state,
  campaignDetail: {
    ...state.campaignDetail,
    data: {},
    isPending: false,
  },
});

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

// get products

export const getProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    products: {
      ...INITIAL_STATE.products,
      isPending: true,
    },
  };
};

export const getProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    products: {
      ...INITIAL_STATE.products,
      data,
      isPending: false,
    },
  };
};

export const getProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    products: {
      ...INITIAL_STATE.products,
      isPending: false,
      error,
    },
  };
};

// promo usage detail

export const promoUsageDetailRequest = (state = INITIAL_STATE) => ({
  ...state,
  promoUsageDetail: {
    data: {},
    isPending: true,
  },
});

export const promoUsageDetailSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  promoUsageDetail: {
    ...state.promoUsageDetail,
    data,
    isPending: false,
  },
});

export const promoUsageDetailFailure = (state = INITIAL_STATE) => ({
  ...state,
  promoUsageDetail: {
    ...state.promoUsageDetail,
    data: {},
    isPending: false,
  },
});

// update campaign status

export const updateCampaignStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateCampaignStatus: {
      ...state.updateCampaignStatus,
      isPending: true,
    },
  };
};

export const updateCampaignStatusSuccess = (state = INITIAL_STATE, { campaigns }) => {
  return {
    ...state,
    updateCampaignStatus: {
      ...state.updateCampaignStatus,
      data: campaigns,
      isPending: false,
    },
  };
};

export const updateCampaignStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateCampaignStatus: {
      ...state.updateCampaignStatus,
      isPending: false,
      error,
    },
  };
};

export const createSegmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createSegment: {
      ...INITIAL_STATE.createSegment,
      isPending: true,
    },
  };
};

export const createSegmentSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createSegment: {
      ...INITIAL_STATE.createSegment,
      data,
      isPending: false,
    },
  };
};

export const createSegmentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createSegment: {
      ...INITIAL_STATE.createSegment,
      isPending: false,
      error,
    },
  };
};

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

export const getClientCountBySegmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getClientCountBySegment: {
      ...INITIAL_STATE.getClientCountBySegment,
      isPending: true,
    },
  };
};

export const getClientCountBySegmentSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getClientCountBySegment: {
      ...INITIAL_STATE.getClientCountBySegment,
      data,
      isPending: false,
    },
  };
};

export const getClientCountBySegmentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getClientCountBySegment: {
      ...INITIAL_STATE.getClientCountBySegment,
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
  [Types.UPDATE_CAMPAIGN_REQUEST]: updateCampaignRequest,
  [Types.UPDATE_CAMPAIGN_SUCCESS]: updateCampaignSuccess,
  [Types.UPDATE_CAMPAIGN_FAILURE]: updateCampaignFailure,
  [Types.GET_CAMPAIGN_DETAIL_REQUEST]: campaignDetailRequest,
  [Types.GET_CAMPAIGN_DETAIL_SUCCESS]: campaignDetailSuccess,
  [Types.GET_CAMPAIGN_DETAIL_FAILURE]: campaignDetailFailure,
  [Types.GET_VENDORS_REQUEST]: getVendorsRequest,
  [Types.GET_VENDORS_SUCCESS]: getVendorsSuccess,
  [Types.GET_VENDORS_FAILURE]: getVendorsFailure,
  [Types.GET_BRANDS_REQUEST]: getBrandsRequest,
  [Types.GET_BRANDS_SUCCESS]: getBrandsSuccess,
  [Types.GET_BRANDS_FAILURE]: getBrandsFailure,
  [Types.GET_PRODUCTS_REQUEST]: getProductsRequest,
  [Types.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [Types.GET_PRODUCTS_FAILURE]: getProductsFailure,
  [Types.GET_PROMO_USAGE_DETAIL_REQUEST]: promoUsageDetailRequest,
  [Types.GET_PROMO_USAGE_DETAIL_SUCCESS]: promoUsageDetailSuccess,
  [Types.GET_PROMO_USAGE_DETAIL_FAILURE]: promoUsageDetailFailure,
  [Types.UPDATE_CAMPAIGN_STATUS_REQUEST]: updateCampaignStatusRequest,
  [Types.UPDATE_CAMPAIGN_STATUS_SUCCESS]: updateCampaignStatusSuccess,
  [Types.UPDATE_CAMPAIGN_STATUS_FAILURE]: updateCampaignStatusFailure,
  [Types.CAMPAIGN_IMAGE_URL_REQUEST]: campaignImageUrlRequest,
  [Types.CAMPAIGN_IMAGE_URL_SUCCESS]: campaignImageUrlSuccess,
  [Types.CAMPAIGN_IMAGE_URL_FAILURE]: campaignImageUrlFailure,
  [Types.CREATE_SEGMENT_REQUEST]: createSegmentRequest,
  [Types.CREATE_SEGMENT_SUCCESS]: createSegmentSuccess,
  [Types.CREATE_SEGMENT_FAILURE]: createSegmentFailure,
  [Types.GET_CLIENT_COUNT_BY_SEGMENT_REQUEST]: getClientCountBySegmentRequest,
  [Types.GET_CLIENT_COUNT_BY_SEGMENT_SUCCESS]: getClientCountBySegmentSuccess,
  [Types.GET_CLIENT_COUNT_BY_SEGMENT_FAILURE]: getClientCountBySegmentFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
