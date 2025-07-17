import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY, GETIR_10_DOMAIN_TYPE, COUNTRIES, COUNTRY_CODES } from '@shared/shared/constants';
import { numberFormat, percentFormat } from '@shared/utils/localization';
import { getLangKey, t } from '@shared/i18n';
import { euGrowthCities } from '@shared/shared/constantValues';

const reducerKey = REDUX_KEY.EU_GROWTH_COMPARISON;

export const countriesSelector = {
  getCountries: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'countries');
    },
    ({ data }) => {
      return data;
    }
  ),
  getCountriesIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'countries');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const xWeekStatsSelector = {
  getXWeekCountryStats: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'xWeekStats');
    },
    ({ data }) => {
      const { countryStats = [] } = data;
      return countryStats.map(countryStat => {
        const { countryId, domainStats } = countryStat;
        const countryCode = COUNTRY_CODES[countryId];
        return {
          name: COUNTRIES[countryCode.toLowerCase()][getLangKey()],
          orderCount: domainStats[GETIR_10_DOMAIN_TYPE].orderCount,
          weekToWeekGrowth: percentFormat({ maxDecimal: 2 }).format(domainStats[GETIR_10_DOMAIN_TYPE].weekToWeekGrowth),
          numberOfWarehouse: domainStats[GETIR_10_DOMAIN_TYPE].numberOfWarehouse,
          orderCountPerWarehouse: numberFormat({ maxDecimal: 0 }).format(domainStats[GETIR_10_DOMAIN_TYPE].orderCountPerWarehouse),
          avgDailyOrderCount: `${numberFormat({ maxDecimal: 0 }).format(domainStats[GETIR_10_DOMAIN_TYPE].avgDailyOrderCount)}
          (${t('euGrowthComparison:X_DAYS', { day: domainStats[GETIR_10_DOMAIN_TYPE].dayCount })})`,
          ...countryStat,
        };
      });
    }
  ),
  getXWeekCityStats: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'xWeekStats');
    },
    ({ data }) => {
      const { cityStats = [] } = data;
      return cityStats.map(cityStat => {
        const { cityId, domainStats } = cityStat;
        return {
          name: euGrowthCities[cityId][getLangKey()],
          orderCount: domainStats[GETIR_10_DOMAIN_TYPE].orderCount,
          weekToWeekGrowth: percentFormat({ maxDecimal: 2 }).format(domainStats[GETIR_10_DOMAIN_TYPE].weekToWeekGrowth),
          numberOfWarehouse: domainStats[GETIR_10_DOMAIN_TYPE].numberOfWarehouse,
          orderCountPerWarehouse: numberFormat({ maxDecimal: 0 }).format(domainStats[GETIR_10_DOMAIN_TYPE].orderCountPerWarehouse),
          avgDailyOrderCount: `${numberFormat({ maxDecimal: 0 }).format(domainStats[GETIR_10_DOMAIN_TYPE].avgDailyOrderCount)}
          (${t('euGrowthComparison:X_DAYS', { day: domainStats[GETIR_10_DOMAIN_TYPE].dayCount })})`,
          ...cityStat,
        };
      });
    }
  ),
  getXWeekStatsIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'xWeekStats');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const currentWeekStatsSelector = {
  getCurrentWeekCountryStats: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'currentWeekStats');
    },
    ({ data }) => {
      const { countryStats = [] } = data;
      return countryStats.map(countryStat => {
        const { countryId, domainStats, numberOfWeek } = countryStat;
        const countryCode = COUNTRY_CODES[countryId];
        return {
          name: `${COUNTRIES[countryCode.toLowerCase()][getLangKey()]} (${t('euGrowthComparison:WEEK_X', { week: numberOfWeek })})`,
          orderCount: domainStats[GETIR_10_DOMAIN_TYPE].orderCount,
          weekToWeekGrowth: percentFormat({ maxDecimal: 2 }).format(domainStats[GETIR_10_DOMAIN_TYPE].weekToWeekGrowth),
          numberOfWarehouse: domainStats[GETIR_10_DOMAIN_TYPE].numberOfWarehouse,
          orderCountPerWarehouse: numberFormat({ maxDecimal: 0 }).format(domainStats[GETIR_10_DOMAIN_TYPE].orderCountPerWarehouse),
          avgDailyOrderCount: `${numberFormat({ maxDecimal: 0 }).format(domainStats[GETIR_10_DOMAIN_TYPE].avgDailyOrderCount)}
          (${t('euGrowthComparison:X_DAYS', { day: domainStats[GETIR_10_DOMAIN_TYPE].dayCount })})`,
          ...countryStat,
        };
      });
    }
  ),
  getCurrentWeekCityStats: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'currentWeekStats');
    },
    ({ data }) => {
      const { cityStats = [] } = data;
      return cityStats.map(cityStat => {
        const { cityId, domainStats, numberOfWeek } = cityStat;
        return {
          name: `${euGrowthCities[cityId][getLangKey()]} (${t('euGrowthComparison:WEEK_X', { week: numberOfWeek })})`,
          orderCount: domainStats[GETIR_10_DOMAIN_TYPE].orderCount,
          weekToWeekGrowth: percentFormat({ maxDecimal: 2 }).format(domainStats[GETIR_10_DOMAIN_TYPE].weekToWeekGrowth),
          numberOfWarehouse: domainStats[GETIR_10_DOMAIN_TYPE].numberOfWarehouse,
          orderCountPerWarehouse: numberFormat({ maxDecimal: 0 }).format(domainStats[GETIR_10_DOMAIN_TYPE].orderCountPerWarehouse),
          avgDailyOrderCount: `${numberFormat({ maxDecimal: 0 }).format(domainStats[GETIR_10_DOMAIN_TYPE].avgDailyOrderCount)}
          (${t('euGrowthComparison:X_DAYS', { day: domainStats[GETIR_10_DOMAIN_TYPE].dayCount })})`,
          ...cityStat,
        };
      });
    }
  ),
  getCurrentWeekStatsIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'currentWeekStats');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
