import axios from '@shared/axios/common';

export const getOrderGrowthMonitoringData = data => {
  const config = {
    method: 'POST',
    url: '/liveMonitoring/getLiveMonitoringData',
    data,
  };

  return axios(config).then(response => {
    return response.data;
  });
};
