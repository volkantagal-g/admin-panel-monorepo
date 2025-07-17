import { createSelector } from 'reselect';

import { reduxKey } from '../constants';

export const finishMentorshipSelector = { getIsPending: state => state?.[reduxKey]?.finishMentorship?.isPending };

export const isModalOpenSelector = createSelector(
  state => state?.[reduxKey],
  state => state?.isModalOpen,
);
