import axios from '@shared/axios/common';

export const getPeakHours = ({ cityIds, regionIds, warehouseIds, types }) => {
  const requestBody = {};

  if (cityIds && cityIds.length) {
    requestBody.cityIds = cityIds;
  }
  if (regionIds && regionIds.length) {
    requestBody.regionIds = regionIds;
  }
  if (warehouseIds && warehouseIds.length) {
    requestBody.warehouseIds = warehouseIds;
  }
  if (types && types.length) {
    requestBody.types = types;
  }

  return axios({
    method: 'POST',
    url: 'peakHours/getPeakHours',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const createPeakHours = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: 'peakHours/createPeakHours',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updatePeakHours = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: 'peakHours/updatePeakHours',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updatePeakHoursMessage = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: 'peakHours/updatePeakHoursMessage',
    data: {
      id,
      updateData,
    },
  }).then(({ data } = {}) => ({ data }));
};

export const updatePeakHoursByWarehouse = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: 'peakHours/updatePeakHoursByWarehouse',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updatePeakHoursMessageByWarehouse = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: 'peakHours/updatePeakHoursMessageByWarehouse',
    data: {
      id,
      updateData,
    },
  }).then(({ data } = {}) => ({ data }));
};

export const createWarehousePeakHours = requestBody => {
  return axios({
    method: 'POST',
    url: 'peakHours/createWarehousePeakHours',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};
