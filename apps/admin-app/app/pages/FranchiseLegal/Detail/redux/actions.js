import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.FRANCHISE_LEGAL.DETAIL}_`;

export const { Types, Creators } = createActions({
  getFranchiseLegalAgreementTableRequest: { limit: undefined, offset: undefined, filters: {}, agreementId: undefined },
  getFranchiseLegalAgreementTableSuccess: { data: null, total: 0 },
  getFranchiseLegalAgreementTableFailure: { error: null },
  getFranchiseLegalAgreementDetailRequest: { id: undefined },
  getFranchiseLegalAgreementDetailSuccess: { data: null },
  getFranchiseLegalAgreementDetailFailure: { error: null },
  notifyFranchisesRequest: { id: undefined },
  notifyFranchisesSuccess: {},
  notifyFranchisesFailure: { error: null },
  getLegalNotificationHistoryRequest: { id: undefined },
  getLegalNotificationHistorySuccess: { data: null },
  getLegalNotificationHistoryFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
