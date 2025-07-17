import { createSelector } from 'reselect';

import { reduxKey } from '../constants';

export const isModalOpenSelector = createSelector(
  state => state?.[reduxKey],
  state => state?.isModalOpen,
);

export const createOrUpdateMentorshipCourseSelector = { getIsPending: state => state?.[reduxKey]?.createOrUpdateMentorshipCourse?.isPending };

export const filterMentorshipCoursesSelector = {
  getData: state => state?.[reduxKey]?.mentorshipCourses?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipCourses?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipCourses?.error,
  getPaginationData: state => state?.[reduxKey]?.mentorshipCourses?.pagination || {},
};
