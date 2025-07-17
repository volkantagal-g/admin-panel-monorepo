import { reduxKey } from '../constants';

export const getMentorshipUserOfCurrentUserSelector = {
  getData: state => state?.[reduxKey]?.mentorshipUserOfCurrentUser?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipUserOfCurrentUser?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipUserOfCurrentUser?.error,
};

export const getMentorshipMentorDetailSelector = {
  getData: state => state?.[reduxKey]?.mentorshipMentorDetail?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipMentorDetail?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipMentorDetail?.error,
};

export const filterMentorshipCoursesSelector = {
  getData: state => state?.[reduxKey]?.mentorshipCourses?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipCourses?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipCourses?.error,
  getPaginationData: state => state?.[reduxKey]?.mentorshipCourses?.pagination || {},
};
