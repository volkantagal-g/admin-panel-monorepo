import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COMPONENT.DETAIL;

export const getComponentByIdSelector = {
  getData: state => state[reducerKey]?.getComponentById?.data,
  getIsPending: state => state[reducerKey]?.getComponentById?.isPending,
};

export const getComponentRolesSelector = {
  getData: state => state[reducerKey]?.componentRoles?.data,
  getIsPending: state => state[reducerKey]?.componentRoles?.isPending,
  getIsRequested: state => state[reducerKey]?.componentRoles?.isRequested,
};

export const updateComponentSelector = {
  getData: state => state[reducerKey]?.updateComponent?.data,
  getIsPending: state => state[reducerKey]?.updateComponent?.isPending,
};
