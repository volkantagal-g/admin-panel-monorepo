import axios from '@shared/axios/common';

export const getWorkingHours = ({ countryIds, cityIds, regionIds, warehouseIds, types, domainTypes, fields }) => {
  const requestBody = {};

  if (countryIds && countryIds.length) {
    requestBody.countryIds = countryIds;
  }
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
  if (domainTypes && domainTypes.length) {
    requestBody.domainTypes = domainTypes;
  }
  if (fields && fields.length) {
    requestBody.fields = fields;
  }

  return axios({
    method: 'POST',
    url: '/workingHours/getWorkingHours',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const createWorkingHours = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/workingHours/createWorkingHours',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updateWorkingHours = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/workingHours/updateWorkingHours',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateWorkingHoursMessage = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/workingHours/updateWorkingHoursMessage',
    data: {
      id,
      updateData,
    },
  }).then(({ data } = {}) => ({ data }));
};

export const updateWorkingHoursByWarehouse = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/workingHours/updateWorkingHoursByWarehouse',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateWorkingHoursMessageByWarehouse = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/workingHours/updateWorkingHoursMessageByWarehouse',
    data: {
      id,
      updateData,
    },
  }).then(({ data } = {}) => ({ data }));
};

export const createWarehouseWorkingHours = requestBody => {
  return axios({
    method: 'POST',
    url: '/workingHours/createWarehouseWorkingHours',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};
