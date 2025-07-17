import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.DISCOUNT_CODE.SEGMENTED_CODE_GENERATOR;

export const createSegmentedCodeByBulkSelector = {
  getIsPending: state => state?.[reduxKey]?.createSegmentedCodeByBulk.isPending,
  getData: state => state?.[reduxKey]?.createSegmentedCodeByBulk.data,
};
