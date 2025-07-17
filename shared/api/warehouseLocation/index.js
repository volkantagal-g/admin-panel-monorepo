import axios from '@shared/axios/common';

export const getWarehouseLocationTemplates = ({ warehouseType }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/getWarehouseLocationTemplates',
    data: { warehouseType },
  }).then(response => {
    return response.data;
  });
};

export const getWarehouseSections = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/getWarehouseLocationsGrouped',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const createNewSection = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/createWarehouseLocationSection',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const createNewBlock = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/createWarehouseLocationBlock',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseLocationActivate = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/updateWarehouseLocationActivate',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseLocationDeactivate = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/updateWarehouseLocationDeactivate',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseLocationAllowedForTransfer = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/updateLocationAllowedForTransfer',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseLocationArchive = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/updateWarehouseLocationArchive',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const saveWarehouseLocationSelfCode = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/updateWarehouseLocationSelfCode',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updateLocationWriteOffEnabled = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/updateWarehouseLocationAllowanceForWriteOff',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getWarehouseStocksByProductIds = ({ warehouseId, productIds }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/getWarehouseStocksByProductIds',
    data: { warehouseId, productIds },
  }).then(response => {
    return response.data;
  });
};

export const filterWarehouseLocations = ({ warehouseId, isAllowedForWriteOff, states }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/filterWarehouseLocations',
    data: { warehouseId, isAllowedForWriteOff, states },
  }).then(response => {
    return response.data;
  });
};

export const getWarehouseStocksByProductIdAndLocationTypes = ({ warehouseId, locationBarcodes, productIds, onlyPositiveQuantity }) => {
  return axios({
    method: 'POST',
    url: '/warehouseLocation/getWarehouseStocksByProductIdAndLocationTypes',
    data: { warehouseId, locationBarcodes, productIds, onlyPositiveQuantity },
  }).then(response => {
    return response.data;
  });
};
