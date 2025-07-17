import axios from '@shared/axios/common';

export const getTransferGroups = ({ limit, offset, status }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/getTransferGroupsByFilter',
    data: { limit, offset, status },
  }).then(response => {
    return response.data;
  });
};

export const getTransferGroupById = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/getTransferGroupById',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getProductTransferGroupsByFilter = ({ transferGroup, limit, offset }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/getProductTransferGroupsByFilter',
    data: { transferGroup, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getWarehouseTransferGroupsByFilter = ({ transferGroups, limit, offset }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/getWarehouseTransferGroupsByFilter',
    data: { transferGroups, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const updateTransferGroupOfWarehousesBulk = ({ transferGroup, warehouses }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/updateTransferGroupOfWarehousesBulk',
    data: { transferGroup, warehouses },
  }).then(response => {
    return response.data;
  });
};

export const createTransferGroup = ({ name }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/createTransferGroup',
    data: { name },
  }).then(response => {
    return response.data;
  });
};

export const getProductTransferGroupsByProduct = ({ productId }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/getProductTransferGroupsByProduct',
    data: { product: productId },
  }).then(response => {
    return response.data;
  });
};

export const updateTransferGroupsOfProduct = ({ productId, transferGroups }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/updateTransferGroupsOfProduct',
    data: { product: productId, transferGroups },
  }).then(response => {
    return response.data;
  });
};

export const updateTransferGroupOfProductsBulk = ({ transferGroup, products }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/updateTransferGroupOfProductsBulk',
    data: { transferGroup, products },
  }).then(response => {
    return response.data;
  });
};

export const inactivateTransferGroup = ({ transferGroup }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/inactivateTransferGroup',
    data: { transferGroup },
  }).then(response => {
    return response.data;
  });
};

export const getWarehouseTransferGroupByWarehouse = (requestBody = {}) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/getWarehouseTransferGroupByWarehouse',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const deleteTransferGroupOfWarehouse = (requestBody = {}) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/deleteTransferGroupOfWarehouse',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updateTransferGroupOfWarehouse = (requestBody = {}) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/updateTransferGroupOfWarehouse',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updateTransferGroup = ({ id, body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/transferGroup/updateTransferGroup',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};
