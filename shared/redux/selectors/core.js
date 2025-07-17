import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.CORE;

export const searchPagesSelector = {
  getData: state => state[reduxKey]?.searchPages?.data,
  getIsPending: state => state[reduxKey]?.searchPages?.isPending,
};

export const searchRolesSelector = {
  getData: state => state[reduxKey]?.searchRoles?.data,
  getIsPending: state => state[reduxKey]?.searchRoles?.isPending,
};

export const searchPanelDocsSelector = {
  getData: state => state[reduxKey]?.searchPanelDocs?.data,
  getIsPending: state => state[reduxKey]?.searchPanelDocs?.isPending,
};
