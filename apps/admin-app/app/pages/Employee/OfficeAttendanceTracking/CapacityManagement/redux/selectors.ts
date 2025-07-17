import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.CAPACITY_MANAGEMENT;

export const publicHolidaysSelector = {
  getData: state => state[reduxKey]?.publicHolidays?.data,
  getIsPending: state => state[reduxKey]?.publicHolidays?.isPending,
};

export const exclusionFiltersSelection = { getFilters: state => state[reduxKey]?.exclusionFilters };

export const capacityTemplateDataSelector = {
  getIsPending: state => state[reduxKey]?.capacityTemplateData?.isPending,
  getData: state => state[reduxKey]?.capacityTemplateData?.data,
};

export const capacityTemplateFiltersSelector = { getFilters: state => state[reduxKey]?.filters };

export const importedDataSelector = { getImportedData: state => state[reduxKey]?.importedData?.data };

export const uploadCapacityDataSelector = { getIsPending: state => state[reduxKey]?.uploadCapacityData?.isPending };

export const invalidEmailsSelector = { getInvalidEmails: state => state[reduxKey]?.invalidEmails?.data };
