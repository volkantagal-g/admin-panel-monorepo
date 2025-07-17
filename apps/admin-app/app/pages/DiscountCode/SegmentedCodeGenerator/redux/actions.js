import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DISCOUNT_CODE.SEGMENTED_CODE_GENERATOR}_`; // TODO fix REDUX_KEY

export const { Types, Creators } = createActions({
  createSegmentedCodeByBulkRequest: { params: {} },
  createSegmentedCodeByBulkSuccess: { data: {} },
  createSegmentedCodeByBulkFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
