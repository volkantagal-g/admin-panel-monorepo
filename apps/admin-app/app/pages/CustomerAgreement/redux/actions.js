import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getDocumentTypesRequest: null,
  getDocumentTypesSuccess: { documentTypes: [] },
  getDocumentTypesFailure: { error: null },
  setDocumentTypeSelectedRequest: { documentType: 0 },
  setDocumentTypeSelectedClear: null,
  setAgreementForcedRequest: { agreementId: '', forced: false, selectedAgreementType: 0 },
  setAgreementForcedSuccess: { success: false },
  setAgreementForcedFailure: { error: null },
  setUploadUrlsRequest: { agreementType: 0, agreementLanguage: '', doc: {} },
  setUploadUrlsSuccess: { data: {}, doc: {} },
  setUploadUrlsFailure: { error: null },
  setUploadUrlsClear: null,
  saveAgreementRequest: { agreementType: 0, files: [], nextVersion: 0 },
  saveAgreementSuccess: { success: false },
  saveAgreementFailure: { error: null },
  getPreviousAgreementsRequest: { agreementType: 0, page: '' },
  getPreviousAgreementsSuccess: { previousAgreements: [], pagination: {} },
  getPreviousAgreementsFailure: { error: null },
  getPreviousAgreementsClear: null,
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.CUSTOMER_AGREEMENT}_` });
