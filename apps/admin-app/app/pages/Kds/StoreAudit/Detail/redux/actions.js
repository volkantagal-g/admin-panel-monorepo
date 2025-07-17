import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getStoreAuditDetailRequest: { id: null },
  getStoreAuditDetailSuccess: { data: {}, initialData: {} },
  getStoreAuditDetailFailure: { error: null },

  updateStoreAuditAnswerRequest: { questionGroupId: null, question: {} },
  updateStoreAuditAnswerSuccess: { data: {}, uploadedImageCollapsePanel: {} },
  updateStoreAuditAnswerFailure: { error: null },

  uploadImagesToS3Request: { fileList: [], questionGroupId: null, question: {} },
  uploadImagesToS3Success: null,
  uploadImagesToS3Failure: { error: null },

  updateStoreAuditDetailRequest: { data: {}, isPowerUserRequest: null },
  updateStoreAuditDetailFailure: { error: null },

  updateStoreAuditNoteRequest: { questionGroupId: null, question: {} },
  updateStoreAuditNoteSuccess: { data: {} },
  updateStoreAuditNoteFailure: { error: null },

  getKdsAuditFormTypeDetailRequest: { id: null },
  getKdsAuditFormTypeDetailSuccess: { data: {} },
  getKdsAuditFormTypeDetailFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.KDS.STORE_AUDIT.DETAIL}_` });
