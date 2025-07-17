import { reduxKey } from '../constants';

export const getMentorshipUserOfCurrentUserSelector = {
  getData: state => state?.[reduxKey]?.mentorshipUserOfCurrentUser?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipUserOfCurrentUser?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipUserOfCurrentUser?.error,
};

export const getMentorshipCourseDetailSelector = {
  getData: state => state?.[reduxKey]?.mentorshipCourseDetail?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipCourseDetail?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipCourseDetail?.error,
};
