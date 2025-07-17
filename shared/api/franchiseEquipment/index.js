import axios from '@shared/axios/common';

export const getFranchiseEquipmentList = async ({ selectedWarehouses, selectedFranchises, isArchived }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchise-equipment/filter',
    data: { selectedWarehouses, selectedFranchises, isArchived },
  });
  return data;
};

export const createFranchiseEquipment = async ({ franchiseId, warehouseId, carCount, motoCount, openDate }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchise-equipment/save',
    data: { franchiseId, warehouseId, carCount, motoCount, openDate },
  });
  return data;
};

export const getFranchiseEquipmentDetail = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchise-equipment/get-detail',
    data: { franchiseEquipmentRightId: id },
  });
  return data;
};

export const updateFranchiseEquipment = async ({ id, data: body, openDate }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchise-equipment/update-detail',
    data: { franchiseEquipmentRightId: id, data: body, openDate },
  });
  return data;
};

export const getFranchiseEquipmentLogs = async ({ id, limit, offset }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchise-equipment/log',
    data: { franchiseEquipmentRightId: id, limit, offset },
  });
  return data;
};

export const updateFranchiseEquipmentVehicleCount = async ({ id, data: body }) => {
  const { data } = await axios({
    method: 'PUT',
    url: `/franchise-equipment/vehicleCount/${id}`,
    data: body,
  });
  return data;
};

export const archiveFranchiseEquipment = async ({ id }) => {
  const { data } = await axios({
    method: 'PUT',
    url: `/franchise-equipment/archive/${id}`,
  });
  return data;
};
