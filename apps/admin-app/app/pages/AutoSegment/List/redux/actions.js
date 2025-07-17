import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.AUTO_SEGMENT.LIST}_`;

export const { Types, Creators } = createActions({
  getAutoSegmentsRequest: { limit: null, offset: null, areInactivesIncluded: false },
  getAutoSegmentsSuccess: { data: [] },
  getAutoSegmentsFailure: { error: null },

  createAutoSegmentRequest: { payload: null },
  createAutoSegmentSuccess: { data: {} },
  createAutoSegmentFailure: { error: null },

  updateAutoSegmentRequest: { id: null, updateData: null },
  updateAutoSegmentSuccess: { data: {} },
  updateAutoSegmentFailure: { error: null },

  activateAutoSegmentTemplateVersionRequest: { id: null, updateData: null },
  activateAutoSegmentTemplateVersionSuccess: { data: {} },
  activateAutoSegmentTemplateVersionFailure: { error: null },

  activateAutoSegmentTemplateRequest: { id: null },
  activateAutoSegmentTemplateSuccess: { autoSegmentTemplate: {} },
  activateAutoSegmentTemplateFailure: { error: null },
  deactivateAutoSegmentTemplateRequest: { id: null },
  deactivateAutoSegmentTemplateSuccess: { autoSegmentTemplate: {} },
  deactivateAutoSegmentTemplateFailure: { error: null },

  getSegmentClientCountsRequest: { autoSegmentId: null, segments: null },
  getSegmentClientCountsSuccess: { autoSegmentId: null, count: null },
  getSegmentClientCountsFailure: { error: null },

  getClientListTemplatesRequest: { name: null },
  getClientListTemplatesSuccess: { data: [] },
  getClientListTemplatesFailure: { error: null },

  getInitialClientListTemplateRequest: { id: null },
  getInitialClientListTemplateSuccess: { data: [] },
  getInitialClientListTemplateFailure: { error: null },

  getAutoSegmentTemplateRequest: { id: null },
  getAutoSegmentTemplateSuccess: { data: {} },
  getAutoSegmentTemplateFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
