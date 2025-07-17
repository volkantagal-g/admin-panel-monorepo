import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.SEGMENT.LIST;

export const segmentsSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.segments.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.segments.data,
  getTotalCount: (state: {[reduxKey: string]: State}) => state[reduxKey]?.segments.totalCount,
};

export const deleteSegmentSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.deleteSegment.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.deleteSegment.data,
};

export const resetClientsOfSegmentSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.resetClientsOfSegment.isPending };

export const sendSegmentListAudienceInfoMailSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.sendSegmentListAudienceInfoMail.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.sendSegmentListAudienceInfoMail.data,
};
