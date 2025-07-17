import { createSelector } from 'reselect';

import { reduxKey } from '../constants';

export const requestMentorshipSelector = { getIsPending: state => state?.[reduxKey]?.requestMentorship?.isPending };

export const isModalOpenSelector = createSelector(
  state => state?.[reduxKey],
  state => state?.isModalOpen,
);
