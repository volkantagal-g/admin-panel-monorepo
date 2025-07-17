import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.CAPACITY_MANAGEMENT}_`;

export const { Types, Creators } = createActions({
  getPublicHolidaysRequest: {},
  getPublicHolidaysSuccess: { data: null },
  getPublicHolidaysFailure: {},

  getCapacityTemplateDataRequest: { reqData: null },
  getCapacityTemplateDataSuccess: { data: null },
  getCapacityTemplateDataFailure: {},

  uploadCapacityDataRequest: { reqData: null },
  uploadCapacityDataSuccess: { invalidEmails: null },
  uploadCapacityDataFailure: {},

  setTemplateFilters: { filters: null },
  setExclusionFilters: { filters: null },
  setImportedData: { data: null },
  resetImportedData: {},
  resetInvalidEmails: {},

  initPage: null,
  destroyPage: null,
}, { prefix });
