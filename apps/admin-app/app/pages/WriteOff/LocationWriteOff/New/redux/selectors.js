import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.LOCATION_WRITE_OFF.NEW;

export const locationsSelector = {
  getIsPending: state => state[reducerKey].locations?.isPending,
  getData: state => state[reducerKey].locations?.data,
};

export const productsSelector = {
  getIsPending: state => state[reducerKey].products?.isPending,
  getData: createSelector(
    state => state[reducerKey].products,
    ({ data }) => {
      return data?.reduce((acc, curr) => {
        // eslint-disable-next-line no-param-reassign
        acc[curr._id] = curr;
        return acc;
      }, {});
    },
  ),
};
