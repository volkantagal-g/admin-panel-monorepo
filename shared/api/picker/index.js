import axios from '@shared/axios/common';

export const listPickers = async params => {
  const { data } = await axios({
    method: 'POST',
    url: '/picker/filterPickers',
    data: { ...params, fields: 'name _id isActivated warehouse isLoggedIn personalGsm username uniqueIdentifier tc' },
  });
  return data;
};

export const filterPickers = async params => {
  const { data } = await axios({
    method: 'POST',
    url: '/picker/filterPickers',
    data: params,
  });
  return data;
};
export const getPickerDetail = async ({ id, fields }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/picker/${id}`,
    params: { fields },
  });
  return data;
};
export const updatePickerApi = async ({ id, updateData }) => {
  const { data } = await axios({
    method: 'PATCH',
    url: `/picker/${id}`,
    data: updateData,
  });
  return data;
};
export const releasePickerFromWarehouseApi = async ({ id, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/picker/releasePickerFromWarehouse',
    data: { pickerId: id, warehouseId: updateData.warehouse },
  });
  return data;
};
export const updateWarehouseApi = async ({ id, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/picker/setWarehouseToPicker',
    data: { pickerId: id, warehouseId: updateData.warehouse },
  });
  return data;
};
export const activatePickerApi = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/picker/activatePicker',
    data: { pickerId: id },
  });
  return data;
};
export const releasePickerJobApi = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/picker/${id}/free`,
  });
  return data;
};
export const getPickerJobApi = async ({ id }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/picker/${id}/job`,
  });
  return data;
};
export const deactivatePickerApi = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/picker/deactivatePicker',
    data: { pickerId: id },
  });
  return data;
};
