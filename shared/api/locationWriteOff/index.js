import axios from '@shared/axios/common';

export const createLocationWriteOff = data => {
  return axios({
    method: 'POST',
    url: '/stock/createLocationWriteOff',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getLocationWriteOffDetail = id => {
  return axios({
    method: 'POST',
    url: '/stock/getLocationWriteOffDetail',
    data: { locationWriteOffId: id },
  }).then(response => {
    return response.data;
  });
};

export const approveLocationWriteOff = id => {
  return axios({
    method: 'PUT',
    url: '/stock/approveLocationWriteOff',
    data: { locationWriteOffId: id },
  }).then(response => {
    return response.data;
  });
};

export const cancelLocationWriteOff = id => {
  return axios({
    method: 'PUT',
    url: '/stock/cancelLocationWriteOff',
    data: { locationWriteOffId: id },
  }).then(response => {
    return response.data;
  });
};

export const filterLocationWriteOff = data => {
  return axios({
    method: 'POST',
    url: '/stock/filterLocationWriteOffs',
    data,
  }).then(response => {
    return response.data;
  });
};
