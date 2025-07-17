import { createSelector } from 'reselect';

import { reduxKey } from '../constants';

export const isModalOpenSelector = createSelector(
  state => state?.[reduxKey],
  state => state?.isModalOpen,
);

export const getIsNewSessionNoteSelector = { getData: state => state?.[reduxKey]?.isNewSessionNote };

export const getActiveSessionNoteSelector = { getData: state => state?.[reduxKey]?.activeSessionNote };
