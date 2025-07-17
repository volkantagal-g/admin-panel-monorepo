import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.SCORE_MAPPING}_`;

export const { Types, Creators } = createActions({
  getKdsScoreMappingRequest: { questionType: undefined },
  getKdsScoreMappingSuccess: { data: null },
  getKdsScoreMappingFailure: { error: null },
  updateKdsScoreMappingRequest: { data: undefined },
  updateKdsScoreMappingFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
