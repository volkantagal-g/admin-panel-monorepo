import axios from '@shared/axios/common';
import { BagConstraint } from '@app/pages/MarketOrder/BagConstraint/types';

export const getBagConstraints = (): Promise<BagConstraint[]> => {
  return axios({
    method: 'POST',
    url: '/bag/getBagConstraints',
    data: {},
  }).then(response => response.data);
};
export const createBagConstraint = (body: BagConstraint) : Promise<BagConstraint> => {
  return axios({
    method: 'POST',
    url: '/bag/createBagConstraint',
    data: body,
  }).then(response => response.data);
};
export const updateBagConstraint = (body: BagConstraint): Promise<{success: boolean}> => {
  return axios({
    method: 'POST',
    url: '/bag/updateBagConstraint',
    data: body,
  }).then(response => response.data);
};

export const getBagExclusions = () : Promise<any> => {
  return axios({
    method: 'POST',
    url: '/bag/getBagExclusions',
    data: {},
  }).then(response => response.data);
};
