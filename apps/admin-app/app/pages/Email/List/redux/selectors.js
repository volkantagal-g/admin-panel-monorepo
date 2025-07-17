import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.EMAIL.LIST;

export const resultsSelector = {
  getResults: state => state?.[reducerKey]?.results?.data,
  isPending: state => state?.[reducerKey]?.results?.isPending,
};

export const globalSettingsSelector = {
  getData: state => state?.[reducerKey]?.globalSettings?.data,
  isPending: state => state?.[reducerKey]?.globalSettings?.isPending,
};

export const filtersSelector = { getFilters: state => state?.[reducerKey]?.filters };
