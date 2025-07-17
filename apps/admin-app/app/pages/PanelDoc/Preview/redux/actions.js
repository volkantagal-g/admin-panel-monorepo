import { createActions } from 'reduxsauce';

import { PAGE_REDUX_KEY } from '../constants';

const prefix = `${PAGE_REDUX_KEY}_`;

export const { Types, Creators } = createActions({
  getPanelDocByIdRequest: { _id: null },
  getPanelDocByIdSuccess: { data: null },
  getPanelDocByIdFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
