import { getDurationText } from '@app/pages/Courier/Detail/utils';
import { formatDateWithSecond } from '@shared/utils/dateHelper';

export const getHeaderTitle = (t, name) => {
  if (name) {
    return `${name} - ${t('DRIVER_DETAIL')}`;
  }

  return `${t('DRIVER_DETAIL')}`;
};

export const getLastStatusChangeText = (t, statusLastChangedAt) => {
  if (statusLastChangedAt) {
    return `${t('LAST_STATUS_CHANGE')}: ${formatDateWithSecond(statusLastChangedAt)} - ${getDurationText(statusLastChangedAt)}`;
  }

  return `${t('LAST_STATUS_CHANGE')} - ${t('UNKNOWN')}`;
};
