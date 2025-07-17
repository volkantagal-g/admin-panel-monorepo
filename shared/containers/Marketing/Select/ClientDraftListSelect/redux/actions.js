import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getClientDraftsRequest: { searchString: '' },
    getClientDraftsSuccess: { data: [] },
    getClientDraftsFailure: { error: null },

    getClientDraftDetailRequest: { draftId: '' },
    getClientDraftDetailSuccess: { data: [] },
    getClientDraftDetailFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.CLIENT_DRAFT}_` },
);
