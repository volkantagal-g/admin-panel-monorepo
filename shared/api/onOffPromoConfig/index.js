import axios from '@shared/axios/common';

export const getOnOffResult = () => {
  return axios({
    method: 'GET',
    url: '/onOffPromoConfig/configTable',
    json: true,
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseConfig = ({ changedConfig }) => {
  return axios({
    method: 'POST',
    url: '/onOffPromoConfig/updateWarehouseConfig',
    json: true,
    data: { changedConfig },
  }).then(response => {
    return response.data;
  });
};
