import axios from '@shared/axios/common';

export const getActiveOrdersForOperation = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getActiveOrdersForOperation',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrderStatsByFilters = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getActiveOrderStatsByFilters',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrdersForCustomerServices = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getActiveOrdersForCustomerServices',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrdersForManagement = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getActiveOrdersForManagementV2',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrdersExecutiveStatsManagement = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getActiveOrdersExecutiveStatsManagement',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrdersExecutiveStats = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getActiveOrdersExecutiveStats',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrdersForGrowth = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getActiveOrdersForGrowth',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrdersProductsCount = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getActiveOrdersProductsCount',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrdersPromoStats = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getActiveOrdersPromoStats',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getFraudSuspicionOrders = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getFraudSuspicionOrders',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getOrdersByFilters = body => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getOrdersByFilters',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getClientsWhoHasActiveOrder = () => {
  return axios({
    method: 'POST',
    url: '/marketOrderAnalytics/getClientsWhoHasActiveOrder',
  }).then(response => {
    return response.data;
  });
};
