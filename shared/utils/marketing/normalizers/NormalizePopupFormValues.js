import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';
import { normalizeHourSchedulerData } from '@shared/containers/Marketing/OptionalControls/utils';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { POPUP_STATUS_TYPE } from '@app/pages/Popup/constants';

export const NormalizePopupFormValues = (values, type) => {
  const [validFrom, validUntil] = values?.validDates || [];

  const tempValues = {
    ...values,
    validFrom: validFrom.toISOString(),
    validUntil: validUntil.toISOString(),
  };

  const collectedValues = type === PAGE_TYPES.POPUP_NEW ? values : tempValues;

  if (collectedValues.promo) {
    if (typeof values.promo === 'object') {
      tempValues.promo = {
        _id: values.promo?.value,
        promoCode: values.promo?.label,
      };
    }
    else {
      tempValues.promo = {
        _id: values.promo,
        promoCode: values.promo,
      };
    }
  }

  const filterShopsList = collectedValues.positiveButton?.action?.data?.filterShopsList;
  const merchantTypes = collectedValues.positiveButton?.action?.data?.merchantTypes;
  if (filterShopsList) {
    tempValues.positiveButton.action.data.filterShops = '1';
    delete tempValues.positiveButton.action.data.filterShopsList;
  }
  if (merchantTypes) {
    tempValues.positiveButton.action.data.filterShops = merchantTypes;
    delete tempValues.positiveButton.action.data.filterShopsList;
    delete tempValues.positiveButton.action.data.merchantTypes;
  }

  // Fe Handle With - totalOrderCountControl: [{ 1: {"min": number, "max": number}, 2: {"min": number, "max": number} ... }]
  // Backend Resp - totalOrderCountControl:
  // [{{"domainType": "string", "min": number, "max": number}, {"domainType": "string", "min": number, "max": number} ... }]
  if (collectedValues.controls?.totalOrderCountControl) {
    tempValues.controls?.totalOrderCountControl.forEach((item, index) => {
      if (item?.min || item?.max || item?.min === 0 || item?.max === 0) {
        const _item = item;
        _item.domainType = index;
      }
    });
    const totalOrderCountControlFilteredValues = collectedValues.controls?.totalOrderCountControl.filter(item => (item?.domainType));
    tempValues.controls.totalOrderCountControl = totalOrderCountControlFilteredValues;
  }

  if (collectedValues.controls?.availableDayPeriods) {
    const availableDayPeriods = collectedValues.controls?.availableDayPeriods;
    tempValues.controls.availableDayPeriods = normalizeHourSchedulerData(availableDayPeriods);
  }

  tempValues.timezone = getSelectedCountryTimeZones()[0]?.timezone;
  if (type === PAGE_TYPES.POPUP_NEW) {
    tempValues.status = POPUP_STATUS_TYPE.INACTIVE;
  }

  return tempValues;
};
