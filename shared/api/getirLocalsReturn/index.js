import axios from '@shared/axios/common';

export const getAlertData = () => {
  return axios({
    method: 'GET',
    url: '/localscourierscheduling/panel/return/slot/alerts',
  }).then(response => {
    return response.data;
  });
};

export const getSlotData = ({ warehouseId }) => {
  return axios({
    method: 'GET',
    url: `localscourierscheduling/panel/return/slot?warehouseId=${warehouseId}`,
  }).then(response => {
    return response.data;
  });
};

export const alertResolve = ({ id }) => {
  return axios({
    method: 'PUT',
    url: `localscourierscheduling/panel/return/slot/alerts/${id}/resolve`,
  }).then(response => {
    return response.data;
  });
};

export const getUpdatedCourierPlanData = ({ warehouseId }) => {
  return axios({
    method: 'POST',
    url: `localscourierscheduling/panel/return/warehouse/${warehouseId}/refresh-courier-plan`,
  }).then(response => {
    return response.data;
  });
};

export const getCourierReassignData = ({ id }) => {
  return axios({
    method: 'POST',
    url: `localscourierscheduling/panel/return/slot/${id}/find-available-couriers`,
  }).then(response => {
    return response.data;
  });
};
