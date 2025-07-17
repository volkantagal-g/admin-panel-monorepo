import { createActions } from 'reduxsauce';

import { REDUX_KEY, DATE_TYPE } from '@shared/shared/constants';
import { getInitialDateRanges } from '../utils';

export const { Types, Creators } = createActions(
  {
    setSelectedCity: {
      selectedCity: null,
      filterKey: null,
    },
    setSelectedCities: {
      selectedCities: [],
      filterKey: null,
    },
    setSelectedDomainType: {
      selectedDomainType: null,
      filterKey: null,
    },
    setSelectedDomainTypes: {
      selectedDomainTypes: [],
      filterKey: null,
    },
    setSelectedHourRange: {
      selectedHourRange: [0, 24],
      filterKey: null,
    },
    setSelectedDateRange: {
      selectedDateRange: getInitialDateRanges(),
      filterKey: null,
    },
    setDateType: {
      dateType: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR,
      filterKey: null,
    },

    initFilter: null,
    destroyFilter: null,
  },
  { prefix: `${REDUX_KEY.FILTER}_` },
);
