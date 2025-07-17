import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { getAllStates } from '../redux/selectors';
import { useValidateState } from './useValidateState';

const getFilterValuesByKey = (filterKey, state) => {
  if (isEmpty(state)) return {};

  const returnObject = {};

  if (Array.isArray(filterKey)) {
    filterKey.forEach(key => {
      returnObject[key] = {};
    });
  } 
  else {
    returnObject[filterKey] = {};
  }

  Object.keys(state).forEach(key => {
    if (isEmpty(state[key])) {
      return false;
    }

    return Object.keys(state[key]).forEach(stateKey => {
      if ((Array.isArray(filterKey) && filterKey.includes(stateKey)) || filterKey === stateKey) {
        Object.assign(returnObject[stateKey], { [key]: state[key][stateKey] });
      }
    });
  });

  return returnObject;
};

const useFilterValues = filterKey => {
  useValidateState({ filterKey, componentName: 'useFilterValues' });

  const state = useSelector(getAllStates);
  const filteredState = getFilterValuesByKey(filterKey, state);

  return {
    values: filteredState,
    rawValues: state,
  };
};

export default useFilterValues;