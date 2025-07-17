import axios from '@shared/axios/common';

export const createLottery = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/lottery/createLottery',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateLottery = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/lottery/updateLottery',
    data,
  }).then(response => {
    return response.data;
  });
};

export const createLotterySegments = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/lottery/createLotterySegments',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getLotteryById = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/lottery/getLottery',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getLotterySegmentsById = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/lottery/getLotterySegments',
    data: { id },
  }).then(response => {
    return response.data;
  });
};
