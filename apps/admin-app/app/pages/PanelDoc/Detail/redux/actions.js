import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PANEL_DOC.DETAIL}_`;

export const { Types, Creators } = createActions({
  getPanelDocByIdRequest: { _id: '' },
  getPanelDocByIdSuccess: { data: {} },
  getPanelDocByIdFailure: { error: null },
  panelDocUpdateActivenessRequest: { existingPanelDoc: null, isActive: null },
  panelDocUpdateActivenessSuccess: null,
  panelDocUpdateActivenessFailure: { error: null },
  panelDocUpdateHighlightRequest: { existingPanelDoc: null, isHighlighted: null },
  panelDocUpdateHighlightSuccess: null,
  panelDocUpdateHighlightFailure: { error: null },
  panelDocUpdateRequest: { data: {}, contentEditor: {} },
  panelDocUpdateSuccess: null,
  panelDocUpdateFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
