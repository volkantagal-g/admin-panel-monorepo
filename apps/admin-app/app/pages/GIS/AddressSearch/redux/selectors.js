import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GIS.ADDRESS_SEARCH;

export const addressSearchSelector = { addressesData: state => state?.[reducerKey]?.addresses?.data };
