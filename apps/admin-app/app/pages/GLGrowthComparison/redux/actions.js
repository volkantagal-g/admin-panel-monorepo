import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStartDate1, getEndDate1, getStartDate2, getEndDate2 } from '../utils';

const prefix = `${REDUX_KEY.GL_GROWTH_COMPARISON}_`;

export const { Types, Creators } = createActions(
  {
    initPage: () => {
      const action = {
        type: `${prefix}INIT_PAGE`,
        selectedDate1: {
          startDate: getStartDate1(),
          endDate: getEndDate1(),
        },
        selectedDate2: {
          startDate: getStartDate2(),
          endDate: getEndDate2(),
        },
      };
      return action;
    },
    destroyPage: null,
    getComparisonDataRequest: { data: null },
    getComparisonDataSuccess: { data: [] },
    getComparisonDataFailure: { error: null },

    setSelectedCity: { data: null },
    setMaxOrderCount: { data: '' },
    setMinOrderCount: { data: '' },
    setSelectedDate1: { startDate: null, endDate: null },
    setSelectedDate2: { startDate: null, endDate: null },
    setSelectedTimeRange: { startTime: null, endTime: null },
    setRequestedDates: { data: null },
  },
  { prefix },
);
