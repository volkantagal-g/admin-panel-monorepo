import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PERSON_REQUEST.STATUS.LIST}_`;

export const { Types, Creators } = createActions({
  getInformationEditRequestListRequest: {
    person: undefined,
    franchise: undefined,
    status: undefined,
    startDate: undefined,
    endDate: undefined,
    limit: undefined,
    offset: undefined,
  },
  getInformationEditRequestListSuccess: { data: null, total: 0 },
  getInformationEditRequestListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
