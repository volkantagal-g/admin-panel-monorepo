import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MENTORSHIP.SELECT.MENTOR}_`;

export const {
  Types,
  Creators,
} = createActions({
  getMentorsRequest: { filters: {} },
  getMentorsSuccess: { data: [] },
  getMentorsFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
