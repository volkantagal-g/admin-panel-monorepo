import { reduxKey } from '../constants';

export const filterMentorshipRequestsSelector = {
  getData: state => state?.[reduxKey]?.mentorshipRequests?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipRequests?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipRequests?.error,
  getPaginationData: state => state?.[reduxKey]?.mentorshipRequests?.pagination || {},
  getFilters: state => state?.[reduxKey]?.mentorshipRequests?.filters || {},
};

export const acceptMentorshipSelector = {
  getData: state => state?.[reduxKey]?.acceptMentorship?.data,
  getIsPending: state => state?.[reduxKey]?.acceptMentorship?.isPending,
  hasError: state => state?.[reduxKey]?.acceptMentorship?.error,
};

export const withdrawMentorshipSelector = {
  getData: state => state?.[reduxKey]?.withdrawMentorship?.data,
  getIsPending: state => state?.[reduxKey]?.withdrawMentorship?.isPending,
  hasError: state => state?.[reduxKey]?.withdrawMentorship?.error,
};

export const declineMentorshipSelector = {
  getData: state => state?.[reduxKey]?.declineMentorship?.data,
  getIsPending: state => state?.[reduxKey]?.declineMentorship?.isPending,
  hasError: state => state?.[reduxKey]?.declineMentorship?.error,
};
