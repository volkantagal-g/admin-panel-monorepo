import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ANNOUNCEMENT.LIST;

export const resultsSelector = {
  getResults: state => state?.[reducerKey]?.results?.data,
  isPending: state => state?.[reducerKey]?.results?.isPending,
};

export const filtersSelector = { getFilters: state => state?.[reducerKey]?.filters };
