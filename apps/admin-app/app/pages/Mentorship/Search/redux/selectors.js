import { reduxKey } from '../constants';

export const searchMentorshipCoursesSelector = {
  getData: state => state?.[reduxKey]?.mentorshipCourses?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipCourses?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipCourses?.error,
  getPaginationData: state => state?.[reduxKey]?.mentorshipCourses?.pagination || {},
  getFilters: state => state?.[reduxKey]?.mentorshipCourses?.filters || {},
};
