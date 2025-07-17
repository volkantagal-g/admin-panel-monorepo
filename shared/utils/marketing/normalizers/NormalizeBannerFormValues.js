import { normalizeHourSchedulerData } from '@shared/containers/Marketing/OptionalControls/utils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { BANNER_STATUS } from '@app/pages/Banner/constants';
import { CLIENT_APP_ACTION_TYPE } from '@shared/containers/Marketing/ClientAppActions/constants';

export const NormalizeBannerFormValues = (values, type) => {
  const [validFrom, validUntil] = (values && values.dateRange) ? values.dateRange : [];

  const tempValues = {
    ...values,
    startDate: validFrom.toISOString(),
    endDate: validUntil.toISOString(),
  };

  // Fe Handle With - totalOrderCountControl: [{ 1: {"min": number, "max": number}, 2: {"min": number, "max": number} ... }]
  // Backend Resp - totalOrderCountControl:
  // [{{"domainType": "string", "min": number, "max": number}, {"domainType": "string", "min": number, "max": number} ... }]
  const collectedValues = type === PAGE_TYPES.BANNER_NEW ? values : tempValues;

  // If there is an action and if the action type is REDIRECT_TO_GETIRFINANCE_BNPL_COMMUNICATION_SDK then add pageId and componentType into action data.
  if (collectedValues?.action && collectedValues?.action?.type === CLIENT_APP_ACTION_TYPE.REDIRECT_TO_GETIRFINANCE_BNPL_COMMUNICATION_SDK) {
    tempValues.action = {
      ...collectedValues.action,
      data: {
        ...collectedValues.action.data,
        pageId: collectedValues.pageIds[0],
        componentType: collectedValues.componentType.toString(),
      },
      ownerService: collectedValues.domainType,
    };
  }

  if (collectedValues?.controls?.totalOrderCountControl) {
    tempValues.controls.totalOrderCountControl.forEach((item, index) => {
      if (item?.min || item?.max || item?.min === 0 || item?.max === 0) {
        const _item = item;
        _item.domainType = index;
      }
    });
    const totalOrderCountControlFilteredValues = collectedValues.controls.totalOrderCountControl.filter(item => (item?.domainType));
    tempValues.controls.totalOrderCountControl = totalOrderCountControlFilteredValues;
  }

  if (collectedValues.controls?.availableDayPeriods) {
    const { availableDayPeriods } = collectedValues.controls;
    tempValues.controls.availableDayPeriods = normalizeHourSchedulerData(availableDayPeriods);
  }

  tempValues.timezone = getSelectedCountryTimeZones()[0]?.timezone;

  if (type === 'BANNER_NEW') {
    tempValues.status = BANNER_STATUS.INACTIVE;
  }

  delete tempValues.dateRange;

  return tempValues;
};
