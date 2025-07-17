import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createComponentRequest: { body: null },
  createComponentSuccess: { data: [] },
  createComponentFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COMPONENT.NEW}_` });
