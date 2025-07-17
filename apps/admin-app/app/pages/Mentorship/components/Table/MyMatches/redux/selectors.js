import { reduxKey } from '../constants';

export const filterMentorshipRequestMatchesSelector = {
  getData: state => state?.[reduxKey]?.mentorshipRequestMatches?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipRequestMatches?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipRequestMatches?.error,
  getPaginationData: state => state?.[reduxKey]?.mentorshipRequestMatches?.pagination || {},
  getFilters: state => state?.[reduxKey]?.mentorshipRequestMatches?.filters || {},
};
