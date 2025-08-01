import { ACTIVE_GETIRIANS_TAB, NON_ACTIVE_GETIRIANS_TAB } from '@app/pages/Employee/List/constants';
import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.EMPLOYEE.LIST;

export const filteredActiveEmployeesSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.filteredActiveEmployees.data,
  getTotalCount: (state: {[reduxKey: string]: State}) => state[reduxKey]?.filteredActiveEmployees.totalCount,
};

export const filteredNoNActiveEmployeesSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.filteredNoNActiveEmployees.data,
  getTotalCount: (state: {[reduxKey: string]: State}) => state[reduxKey]?.filteredNoNActiveEmployees.totalCount,
};

export const filterSelector = {
  getFilters: (state: {[reduxKey: string]: State}) => state[reduxKey]?.filters,
  getPagination: (state: {[reduxKey: string]: State}) => state[reduxKey]?.filters.pagination,
};

export const tableDataSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => {
    return state[reduxKey]?.filteredEmployeesCommon.isPending;
  },
  getData: (state: { [reduxKey: string]: State }) => {
    const filters = filterSelector.getFilters(state);
    if (filters?.activeTabKey === ACTIVE_GETIRIANS_TAB) {
      return filteredActiveEmployeesSelector.getData(state);
    }
    if (filters?.activeTabKey === NON_ACTIVE_GETIRIANS_TAB) {
      return filteredNoNActiveEmployeesSelector.getData(state);
    }

    return [];
  },
  getTotalCount: (state: { [reduxKey: string]: State }) => {
    const filters = filterSelector.getFilters(state);
    if (filters?.activeTabKey === ACTIVE_GETIRIANS_TAB) {
      return filteredActiveEmployeesSelector.getTotalCount(state);
    }
    if (filters?.activeTabKey === NON_ACTIVE_GETIRIANS_TAB) {
      return filteredNoNActiveEmployeesSelector.getTotalCount(state);
    }

    return 0;
  },
};
