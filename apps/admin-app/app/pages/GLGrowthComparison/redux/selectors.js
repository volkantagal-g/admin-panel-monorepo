import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { getFormattedOrderRankData, getFormattedPromoData, getFormattedPromoUsageData } from '../utils';

const reducerKey = REDUX_KEY.GL_GROWTH_COMPARISON;

export const maxOrderCountSelector = createSelector(
  state => {
    return getStateObject(state, reducerKey, 'maxOrderCount');
  },
  data => {
    return data;
  },
);

export const minOrderCountSelector = createSelector(
  state => {
    return getStateObject(state, reducerKey, 'minOrderCount');
  },
  data => {
    return data;
  },
);

export const promoUsageDataSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'comparisonData');
    },
    minOrderCountSelector,
    maxOrderCountSelector,
    ({ data: usageData }, minCount, maxCount) => {
      const minNum = minCount ? parseInt(minCount, 10) : 0;
      const maxNum = maxCount ? parseInt(maxCount, 10) : Infinity;
      const promoIdToPromoCodeMap = getFormattedPromoData(usageData.promos);
      return getFormattedPromoUsageData(usageData, promoIdToPromoCodeMap, minNum, maxNum);
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'comparisonData');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const clientOrderDataSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'comparisonData');
    },
    ({ data }) => {
      return getFormattedOrderRankData(data);
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'comparisonData');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const selectedCitySelector = createSelector(
  state => {
    return getStateObject(state, reducerKey, 'selectedCity');
  },
  data => {
    return data;
  },
);

export const selectedDateSelector = {
  getSelectedDate1: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'selectedDate1');
    },
    data => {
      return data;
    },
  ),
  getSelectedDate2: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'selectedDate2');
    },
    data => {
      return data;
    },
  ),
};

export const requestedDateSelector = {
  getSelectedDate1: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'requestedDates');
    },
    data => {
      return data?.selectedDate1;
    },
  ),
  getSelectedDate2: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'requestedDates');
    },
    data => {
      return data?.selectedDate2;
    },
  ),
};

export const selectedTimeRangeSelector = createSelector(
  state => {
    return getStateObject(state, reducerKey, 'selectedTimeRange');
  },
  data => {
    return data;
  },
);
