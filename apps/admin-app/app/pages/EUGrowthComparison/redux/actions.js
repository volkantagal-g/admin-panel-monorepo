import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCountriesRequest: {},
  getCountriesSuccess: { data: [] },
  getCountriesFailure: { error: null },
  getXWeekStatsRequest: { week: null },
  getXWeekStatsSuccess: { data: {} },
  getXWeekStatsFailure: { error: null },
  getStatsBetweenDatesRequest: { startDateL: null, endDateL: null },
  getStatsBetweenDatesSuccess: { data: {} },
  getStatsBetweenDatesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.EU_GROWTH_COMPARISON}_` });
