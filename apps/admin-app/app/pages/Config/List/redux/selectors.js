import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CONFIG.LIST;

export const configSelector = {
  getData: state => state[reducerKey]?.configs?.data,
  getPagination: state => {
    return {
      next: state[reducerKey]?.configs?.nextPageToken,
      prev: state[reducerKey]?.configs?.prevPageToken,
    };
  },
  getIsPending: state => state[reducerKey]?.configs?.isPending,
};
export const updateConfigSelector = { getIsPending: state => state[reducerKey]?.updateConfig?.isPending };
export const filterSelector = { getFilters: state => state[reducerKey]?.filters };
export const deleteConfigSelector = { getIsPending: state => state[reducerKey]?.deleteConfig?.isPending };
