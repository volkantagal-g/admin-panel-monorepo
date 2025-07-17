import { formatDate, getDefaultCountry, getDefaultDeviceTypes, getDefaultPhoneLanguages, getDefaultValidDates } from './sharedInitializers';
import { convertSchedulerDatesToArr } from '@shared/containers/Marketing/OptionalControls/utils';

export const initializeBannerFormValues = () => {
  return {
    country: getDefaultCountry(),
    validDates: getDefaultValidDates(15, false),
    phoneLanguages: getDefaultPhoneLanguages(),
    deviceTypes: getDefaultDeviceTypes(),
  };
};

export const initializeBannerDetailFormValues = values => {
  const startDate = formatDate(values.startDate);
  const endDate = formatDate(values.endDate);
  const dateRange = [startDate, endDate];

  const originalControls = values.controls || {};

  const availableDayPeriods = originalControls.availableDayPeriods
    ? convertSchedulerDatesToArr(originalControls.availableDayPeriods)
    : undefined;

  const totalOrderCountControl = Array.isArray(originalControls.totalOrderCountControl)
    ? (() => {
      const arr = [];
      originalControls.totalOrderCountControl.forEach(item => {
        if (item?.domainType !== undefined) {
          arr[item.domainType] = {
            domainType: item.domainType,
            min: item.min,
            max: item.max,
          };
        }
      });
      return arr;
    })()
    : undefined;

  return {
    ...values,
    dateRange,
    controls: {
      ...originalControls,
      ...(availableDayPeriods && { availableDayPeriods }),
      ...(totalOrderCountControl && { totalOrderCountControl }),
    },
  };
};
