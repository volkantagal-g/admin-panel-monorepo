import axios from '@shared/axios/common';

export const filterDdsObjections = ({
  franchiseId,
  warehouseIds,
  statuses,
  criterionNames,
  startDate,
  endDate,
  limit,
  offset,
}) => {
  return axios({
    method: 'POST',
    url: '/dds/objections/filter',
    data: { franchiseId, warehouseIds, statuses, criterionNames, startDate, endDate, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getDdsObjectionDetail = async ({ objectionId }) => {
  return axios({
    method: 'POST',
    url: '/dds/getObjection',
    data: { objectionId },
  }).then(response => {
    return response.data;
  });
};

export const acceptDdsObjection = async ({ objectionId }) => {
  return axios({
    method: 'POST',
    url: '/dds/acceptObjection',
    data: { objectionId },
  }).then(response => {
    return response.data;
  });
};

export const rejectDdsObjection = async ({ objectionId, description }) => {
  return axios({
    method: 'POST',
    url: '/dds/rejectObjection',
    data: { objectionId, description },
  }).then(response => {
    return response.data;
  });
};
