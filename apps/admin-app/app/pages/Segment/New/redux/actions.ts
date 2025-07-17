import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SEGMENT.NEW}_`;

export const { Types, Creators } = createActions({
  createSegmentRequest: { values: null, onSuccess: null },
  createSegmentSuccess: { data: null },
  createSegmentFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
