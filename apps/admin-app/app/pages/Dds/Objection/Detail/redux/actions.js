import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DDS.OBJECTION.DETAIL}_`;

export const { Types, Creators } = createActions({
  getDdsObjectionDetailRequest: { objectionId: undefined },
  getDdsObjectionDetailSuccess: { data: {} },
  getDdsObjectionDetailFailure: { error: null },
  acceptDdsObjectionRequest: { objectionId: undefined },
  acceptDdsObjectionFailure: { error: null },
  rejectDdsObjectionRequest: { objectionId: undefined, description: undefined },
  rejectDdsObjectionFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
