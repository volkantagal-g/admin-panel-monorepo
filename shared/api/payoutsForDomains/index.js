import axios from '@shared/axios/common';

export const getFoodPayoutReportsApi = ({
  startTime,
  endTime,
}) => {
  return axios({
    method: 'POST',
    url: 'payoutsForDomains/food-report',
    data: {
      startTime,
      endTime,
    },
  }).then(response => {
    return response;
  });
};

export const getLocalPayoutReportsApi = ({
  startTime,
  endTime,
}) => {
  return axios({
    method: 'POST',
    url: 'payoutsForDomains/local-report',
    data: {
      startTime,
      endTime,
    },
  }).then(response => {
    return response;
  });
};

export const getTipPayoutReportsApi = ({
  startTime,
  endTime,
}) => {
  return axios({
    method: 'POST',
    url: 'payoutsForDomains/tip-report',
    data: {
      startTime,
      endTime,
    },
  }).then(response => {
    return response;
  });
};

export const getWaterPayoutReportsApi = ({
  startTime,
  endTime,
}) => {
  return axios({
    method: 'POST',
    url: 'payoutsForDomains/water-report',
    data: {
      startTime,
      endTime,
    },
  }).then(response => {
    return response;
  });
};

export const getFoodPayoutDetailedReportsApi = params => {
  return axios({
    method: 'GET',
    url: 'payoutsForDomains/food-detailed-report',
    params: { ...params },
  }).then(response => {
    return response;
  });
};
export const getLocalPayoutDetailedReportsApi = params => {
  return axios({
    method: 'GET',
    url: 'payoutsForDomains/local-detailed-report',
    params: { ...params },
  }).then(response => {
    return response;
  });
};
export const getTipPayoutDetailedReportsApi = params => {
  return axios({
    method: 'GET',
    url: 'payoutsForDomains/tip-detailed-report',
    params: { ...params },
  }).then(response => {
    return response;
  });
};
export const getWaterPayoutDetailedReportsApi = params => {
  return axios({
    method: 'GET',
    url: 'payoutsForDomains/water-detailed-report',
    params: { ...params },
  }).then(response => {
    return response;
  });
};

export const exportFoodPayoutDetailedReportsApi = params => {
  return axios({
    method: 'GET',
    url: 'payoutsForDomains/export-food-detailed-report',
    params: { ...params },
  }).then(response => {
    return response;
  });
};
export const exportLocalPayoutDetailedReportsApi = params => {
  return axios({
    method: 'GET',
    url: 'payoutsForDomains/export-local-detailed-report',
    params: { ...params },
  }).then(response => {
    return response;
  });
};
export const exportTipPayoutDetailedReportsApi = params => {
  return axios({
    method: 'GET',
    url: 'payoutsForDomains/export-tip-detailed-report',
    params: { ...params },
  }).then(response => {
    return response;
  });
};
export const exportWaterPayoutDetailedReportsApi = params => {
  return axios({
    method: 'GET',
    url: 'payoutsForDomains/export-water-detailed-report',
    params: { ...params },
  }).then(response => {
    return response;
  });
};
