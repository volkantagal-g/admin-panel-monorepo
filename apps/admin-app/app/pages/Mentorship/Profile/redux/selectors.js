import { reduxKey } from '../constants';

export const getEmployeeOfCurrentUserSelector = {
  getData: state => state?.[reduxKey]?.employeeOfCurrentUser?.data,
  getIsPending: state => state?.[reduxKey]?.employeeOfCurrentUser?.isPending,
  hasError: state => state?.[reduxKey]?.employeeOfCurrentUser?.error,
};

export const getMentorshipUserSelector = {
  getData: state => state?.[reduxKey]?.mentorshipUserInfo?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipUserInfo?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipUserInfo?.error,
};

export const createOrUpdateMentorshipUserInfoSelector = {
  getData: state => state?.[reduxKey]?.mentorshipUserInfo?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipUserInfo?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipUserInfo?.error,
};
