import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.PANEL_DOC.SEARCH;

export const panelDocsByFilterSelector = {
  getIsPending: state => state[reduxKey]?.panelDocsByFilter.isPending,
  getData: state => state[reduxKey]?.panelDocsByFilter.data,
};

export const adminGuidesSelector = {
  getIsPending: state => state[reduxKey]?.adminGuides.isPending,
  getData: state => state[reduxKey]?.adminGuides.data,
};

export const highlightedDocumentsSelector = {
  getIsPending: state => state[reduxKey]?.highlightedDocuments.isPending,
  getData: state => state[reduxKey]?.highlightedDocuments.data,
};

export const resultShownSelector = state => state[reduxKey]?.resultShown;
