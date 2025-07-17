import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PANEL_DOC.SEARCH}_`;

export const { Types, Creators } = createActions({
  getPanelDocsByFilterRequest: { filters: {} },
  getPanelDocsByFilterSuccess: { data: [] },
  getPanelDocsByFilterFailure: { error: null },
  getAdminGuidesRequest: null,
  getAdminGuidesSuccess: { data: [] },
  getAdminGuidesFailure: { error: null },
  getHighlightedDocumentsRequest: null,
  getHighlightedDocumentsSuccess: { data: [] },
  getHighlightedDocumentsFailure: { error: null },
  setResultShown: { isResultShown: false },
  initPage: null,
  destroyPage: null,
}, { prefix });
