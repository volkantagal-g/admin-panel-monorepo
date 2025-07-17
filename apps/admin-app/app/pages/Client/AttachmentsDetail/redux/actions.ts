import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.CLIENT.ATTACHMENTS_DETAIL}_` as const;

export const { Types, Creators } = createActions({
  getAttachmentURLRequest: ['sessionId', 'attachmentId'],
  getAttachmentURLSuccess: { data: null },
  getAttachmentURLFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
