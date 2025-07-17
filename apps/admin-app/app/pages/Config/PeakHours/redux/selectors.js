import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CONFIG.PEAK_HOURS;

export const peakHoursSelector = { getData: state => state?.[reducerKey]?.peakHours?.data };

export const filtersSelector = {
  getData: state => state?.[reducerKey]?.filters,
  getPeakHoursType: state => state?.[reducerKey]?.filters?.peakHoursType,
  getCity: state => state?.[reducerKey]?.filters?.cityId,
  getRegion: state => state?.[reducerKey]?.filters?.regionId,
};
