import { ACTIVENESS_OPTIONS, courierStatuses, YES_NO_OPTIONS } from '@shared/shared/constantValues';
import { convertSelectOptions, isNullOrUndefined } from '@shared/utils/common';
import {
  COURIER_STATUS_FREE,
  COURIER_STATUS_BUSY,
} from '@shared/shared/constants';

export const convertedCourierStatusOptions = convertSelectOptions(
  Object.entries(courierStatuses).map(([key, value]) => ({
    value: key,
    label: value,
  })),
  { valueKey: 'value', labelKey: 'label', isTranslation: true },
);

export const convertedActivenessOptions = convertSelectOptions(ACTIVENESS_OPTIONS, {
  labelKey: 'label',
  valueKey: 'value',
  hasTranslationKey: true,
});

export const convertedYesOrNoOptions = convertSelectOptions(YES_NO_OPTIONS, {
  labelKey: 'label',
  valueKey: 'value',
  hasTranslationKey: true,
});

export const formatCourierListParams = ({ name, isActivated, status, isLoggedIn, domainTypes }) => {
  const params = {};
  if (name) {
    params.name = name;
  }
  if (!isNullOrUndefined(isActivated)) {
    params.isActivated = isActivated;
  }
  if (!isNullOrUndefined(status)) {
    params.statuses = [status];
  }
  if (!isNullOrUndefined(isLoggedIn)) {
    params.isLoggedIn = isLoggedIn;
  }
  if (!isNullOrUndefined(domainTypes)) {
    params.domainTypes = domainTypes;
  }
  params.withTotalCount = true;
  params.fields = 'isActivated isLoggedIn name status gsm domainTypes';

  return params;
};

export const getStatusColorForList = status => {
  if (status === COURIER_STATUS_FREE) return 'green';
  if (status === COURIER_STATUS_BUSY) return 'red';

  return 'orange';
};
