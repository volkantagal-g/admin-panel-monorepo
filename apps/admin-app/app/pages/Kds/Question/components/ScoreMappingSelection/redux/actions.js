import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.QUESTION.SELECT_SCORE_MAPPING}_`;

export const { Types, Creators } = createActions({
  getScoreMappingListRequest: { questionType: undefined },
  getScoreMappingListSuccess: { data: null },
  getScoreMappingListFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
