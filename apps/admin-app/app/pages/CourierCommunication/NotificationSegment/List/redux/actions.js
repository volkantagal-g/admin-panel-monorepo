import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  segmentList: {
    segmentName: '',
    creationDateTime: '',
    client: null,
    currentPage: 1,
    rowsPerPage: 10,
  },
  segmentListSuccess: { data: [] },
  segmentListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COURIER_COMMUNICATION_SEGMENT.LIST}_` });
