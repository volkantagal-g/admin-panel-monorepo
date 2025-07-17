import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PERSON_REQUEST.STATUS.DETAIL}_`;

export const { Types, Creators } = createActions({
  getInformationEditRequestDetailRequest: { approvalId: undefined },
  getInformationEditRequestDetailSuccess: { data: null },
  getInformationEditRequestDetailFailure: { error: null },
  acceptInformationEditRequestDetailRequest: { approvalId: undefined, description: undefined },
  acceptInformationEditRequestDetailSuccess: { data: null },
  acceptInformationEditRequestDetailFailure: { error: null },
  rejectInformationEditRequestDetailRequest: { approvalId: undefined, description: undefined },
  rejectInformationEditRequestDetailSuccess: { data: null },
  rejectInformationEditRequestDetailFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
