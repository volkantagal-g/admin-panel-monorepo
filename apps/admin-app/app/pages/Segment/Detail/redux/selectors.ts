import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.SEGMENT.DETAIL;

export const segmentSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].segment.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey].segment.data,
};

export const segmentClientCountSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].segmentClientCount.isPending,
  getIsRequested: (state: {[reduxKey: string]: State}) => state[reduxKey].segmentClientCount.isRequested,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey].segmentClientCount.data,
};

export const updateSegmentSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].updateSegment.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey].updateSegment.data,
};

export const deleteSegmentSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].deleteSegment.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey].deleteSegment.data,
};

export const resetClientsOfSegmentSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].resetClientsOfSegment.isPending };

export const expirationStatusSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].expirationStatus.isPending };

export const indefiniteExpirationSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].indefiniteExpiration.isPending };
