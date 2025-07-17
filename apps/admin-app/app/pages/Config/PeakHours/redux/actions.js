import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getPeakHoursRequest: { peakHoursType: null, cityId: null, regionId: null },
  getPeakHoursSuccess: { data: {} },
  getPeakHoursFailure: { error: null },
  updatePeakHoursRequest: { id: null, updateData: {} },
  updatePeakHoursSuccess: { data: {} },
  updatePeakHoursFailure: { error: null },
  createPeakHoursRequest: { peakHours: null, peakHoursType: null, cityId: null, regionId: null },
  createPeakHoursSuccess: { data: {} },
  createPeakHoursFailure: { error: null },
  updatePeakHoursMessageRequest: { id: null, updateData: {} },
  updatePeakHoursMessageSuccess: { data: {} },
  updatePeakHoursMessageFailure: { error: null },
  setPeakHoursType: { PeakHoursType: null },
  setCity: { cityId: null },
  setRegion: { regionId: null },
}, { prefix: `${REDUX_KEY.CONFIG.PEAK_HOURS}_` });
