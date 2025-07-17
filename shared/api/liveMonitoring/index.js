import axios from '@shared/axios/common';

export const getCitiesMonitoringData = data => {
  const config = {
    method: 'POST',
    url: '/liveMonitoring/getCitiesMonitoringData',
    data,
  };

  if (data?.selectedDivision) {
    config.headers = { division: data.selectedDivision };
  }

  return axios(config).then(response => {
    return response.data;
  });
};

export const getCitiesMonitoringDataBySelectedCity = data => {
  const config = {
    method: 'POST',
    url: '/liveMonitoring/getCitiesMonitoringDataBySelectedCity',
    data,
  };

  if (data?.selectedDivision) {
    config.headers = { division: data.selectedDivision };
  }

  return axios(config).then(response => {
    return response.data;
  });
};

export const getWarehouseStatsForPermittedDomainType = data => {
  return axios({
    method: 'POST',
    url: '/liveMonitoring/getWarehouseStatsForPermittedDomainType',
    data,
  }).then(response => {
    return response.data;
  });
};
