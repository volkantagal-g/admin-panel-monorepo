import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

export const getBrands = () => {
  return axios({
    method: 'POST',
    url: '/water/getAllBrands',
  }).then(response => {
    return response.data;
  });
};

export const getFirms = () => {
  return axios({
    method: 'POST',
    url: '/water/getAllFirms',
  }).then(response => {
    return response.data;
  });
};

export const getProductsByVendorIds = data => {
  return axios({
    method: 'POST',
    url: '/water/getProductsByVendorIds',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrders = (data, params) => {
  return axios({
    method: 'POST',
    url: '/water/getActiveOrders',
    data,
    params,
  }).then(response => {
    return response.data;
  });
};

export const getVendors = data => {
  return axios({
    method: 'POST',
    url: '/water/getAllVendors',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getPaymentMethods = () => {
  return axios({
    method: 'POST',
    url: '/water/getPaymentMethods',
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const filterOrders = data => {
  return axios({
    method: 'POST',
    url: '/water/filterOrders',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncements = data => {
  return axios({
    method: 'POST',
    url: '/water/getAnnouncements',
    data,
  }).then(response => {
    return response.data;
  });
};

export const createAnnouncement = data => {
  return axios({
    method: 'POST',
    url: '/water/createAnnouncement',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncementDetail = ({ announcementId }) => {
  return axios({
    method: 'POST',
    url: '/water/getAnnouncementDetail',
    params: { announcementId },
  }).then(response => {
    return response.data;
  });
};

export const updateAnnouncement = data => {
  return axios({
    method: 'POST',
    url: '/water/updateAnnouncement',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getCampaigns = data => {
  return axios({
    method: 'POST',
    url: '/water/getCampaigns',
    data,
  }).then(response => {
    return response.data;
  });
};

export const createCampaign = data => {
  return axios({
    method: 'POST',
    url: '/water/createCampaign',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getCampaignDetail = ({ campaignId }) => {
  return axios({
    method: 'POST',
    url: '/water/getCampaignDetail',
    params: { campaignId },
  }).then(response => {
    return response.data;
  });
};

export const updateCampaign = ({ data, campaignId }) => {
  return axios({
    method: 'PUT',
    url: '/water/updateCampaign',
    data,
    params: { campaignId },
  }).then(response => {
    return response.data;
  });
};

export const getProducts = () => {
  return axios({
    method: 'POST',
    url: '/water/getAllProducts',
  }).then(response => {
    return response.data;
  });
};

export const getPromoUsageDetail = ({ campaignId }) => {
  return axios({
    method: 'POST',
    url: '/water/getPromoUsageDetail',
    params: { campaignId },
  }).then(response => {
    return response.data;
  });
};

export const updateCampaignStatus = ({ data, campaignId }) => {
  return axios({
    method: 'POST',
    url: '/water/updateCampaignStatus',
    data,
    params: { campaignId },
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const uploadCampaignImage = ({ loadedImage }) => {
  return axios({
    method: 'POST',
    url: '/water/uploadCampaignImage',
    data: { image: loadedImage },
  }).then(response => {
    return response.data;
  });
};

export const createSegment = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/water/createSegment',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getClientCountBySegment = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/water/getClientCountBySegment',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getAllVendorStatus = () => {
  return axios({
    method: 'POST',
    url: '/water/getAllVendorStatus',
  }).then(response => {
    return response.data;
  });
};

export const getVendorsFilter = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/water/getVendorsFilter',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getVendorFilterCount = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/water/getVendorFilterCount',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getGetirWaterSlotData = ({ id, date }) => {
  return axios({
    method: 'GET',
    url: '/water/getSlotData',
    params: { id, date },
  }).then(response => {
    return response.data;
  });
};

export const updateSlotCapacity = ({ body }) => {
  return axios({
    method: 'PUT',
    url: '/water/updateSlotCapacity',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getGetirWaterBulkSlotData = () => {
  return axios({
    method: 'GET',
    url: '/water/getBulkSlotData',
  }).then(response => {
    return response.data;
  });
};

export const updateBulkSlotCapacity = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/water/updateBulkSlotCapacity',
    data: body,
  }).then(response => {
    return response.data;
  });
};
