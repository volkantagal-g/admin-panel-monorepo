import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getWorkingHoursRequest: { workingHoursType: null, countryId: null, cityId: null, regionId: null },
  getWorkingHoursSuccess: { data: {} },
  getWorkingHoursFailure: { error: null },
  createWorkingHoursRequest: { workingHours: null, workingHoursType: null, countryId: null, cityId: null, regionId: null },
  createWorkingHoursSuccess: { data: {} },
  createWorkingHoursFailure: { error: null },
  updateWorkingHoursRequest: { id: null, updateData: {} },
  updateWorkingHoursSuccess: { data: {} },
  updateWorkingHoursFailure: { error: null },
  updateWorkingHoursMessageRequest: { id: null, updateData: {} },
  updateWorkingHoursMessageSuccess: { data: {} },
  updateWorkingHoursMessageFailure: { error: null },
  setWorkingHoursType: { workingHoursType: null },
  setCountry: { countryId: null },
  setCity: { cityId: null },
  setRegion: { regionId: null },
}, { prefix: `${REDUX_KEY.CONFIG.WORKING_HOURS}_` });
