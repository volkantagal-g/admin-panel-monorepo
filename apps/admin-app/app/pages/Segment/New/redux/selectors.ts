import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.SEGMENT.NEW;

export const createSegmentSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].createSegment.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey].createSegment.data,
};
