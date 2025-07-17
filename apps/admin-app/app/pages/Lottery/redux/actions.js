import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    createLotteryRequest: { body: null },
    createLotterySuccess: { data: null },
    createLotteryFailure: { error: null },
    updateLotteryRequest: { body: null },
    updateLotterySuccess: { data: null },
    updateLotteryFailure: { error: null },
    createLotterySegmentsRequest: { body: null },
    createLotterySegmentsSuccess: { data: null },
    createLotterySegmentsFailure: { error: null },
    getLotteryByIdRequest: { id: null },
    getLotteryByIdSuccess: { data: null },
    getLotteryByIdFailure: { error: null },
    getLotterySegmentsByIdRequest: { id: null },
    getLotterySegmentsByIdSuccess: { data: null },
    getLotterySegmentsByIdFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.LOTTERY.NEW}_` },
);
