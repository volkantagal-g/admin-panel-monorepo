import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.AUTO_SEGMENT.LIST;

export const autoSegmentsSelector = {
  getData: state => state[reduxKey].autoSegments.data,
  getIsPending: state => state[reduxKey].autoSegments.isPending,
};

export const getClientListTemplatesSelector = {
  getData: state => state[reduxKey].clientListTemplates.data,
  getIsPending: state => state[reduxKey].clientListTemplates.isPending,
};

export const autoSegmentTemplateSelector = {
  getData: state => state?.[reduxKey]?.autoSegmentTemplate?.data,
  getIsPending: state => state?.[reduxKey]?.autoSegmentTemplate?.isPending,
};
