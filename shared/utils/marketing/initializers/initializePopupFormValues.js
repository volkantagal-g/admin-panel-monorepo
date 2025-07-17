import moment from 'moment';

import { getDefaultCountry, getDefaultPhoneLanguages, getDefaultValidDates } from './sharedInitializers';
import { CLIENT_APP_ACTION_TYPE } from '@shared/containers/Marketing/ClientAppActions/constants';
import { getSelectedCountryTimeZones, getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import { convertSchedulerDatesToArr } from '@shared/containers/Marketing/OptionalControls/utils';

export const initializePopupFormValues = () => {
  return {
    country: getDefaultCountry(),
    validDates: getDefaultValidDates(0, true),
    phoneLanguages: getDefaultPhoneLanguages(),
    negativeButton: { action: { type: CLIENT_APP_ACTION_TYPE.CLOSE } },
  };
};

export const initializePopupDetailFormValues = values => {
  const selectedCountry = getSelectedCountry();
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;

  const dateFormat = 'YYYY-MM-DD HH:mm:ss';

  const originalControls = values?.controls || {};

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

  let tempPromo;

  if (values?.promo) {
    if (typeof values.promo === 'object') {
      tempPromo = values.promo?._id;
    }
  }

  let tempValidDates;

  if (values?.validFrom && values?.validUntil) {
    const validFrom = moment(moment.utc(values.validFrom).tz(selectedCountryPrimaryTimeZone).format(dateFormat));
    const validUntil = moment(moment.utc(values.validUntil).tz(selectedCountryPrimaryTimeZone).format(dateFormat));
    tempValidDates = [validFrom, validUntil];
  }

  return {
    ...values,
    country: { label: selectedCountry.name[getLangKey()], value: selectedCountry._id },
    promo: tempPromo,
    validDates: tempValidDates,
    controls: {
      ...originalControls,
      ...(availableDayPeriods && { availableDayPeriods }),
      ...(totalOrderCountControl && { totalOrderCountControl }),
    },
  };
};
