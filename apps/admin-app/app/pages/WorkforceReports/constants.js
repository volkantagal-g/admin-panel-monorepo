import moment from 'moment';

import { t } from '@shared/i18n';
import { getLocalDateFormat } from '@shared/utils/localization';
import { WORKFORCE_EMPLOYEE_TYPES } from '@shared/shared/constants';

export const REPORT_TYPES = { SHIFT_PLAN: 1, LEAVE_MANAGEMENT: 2, SLOT_PERFORMANCE: 3, SLOT_CHANGE_LOG: 4, SLOT_SELECTION: 5 };

export const workerTypeOptions = [
  {
    value: WORKFORCE_EMPLOYEE_TYPES.COURIER,
    label: t('global:WORKER_TYPES.COURIER'),
  },
  {
    value: WORKFORCE_EMPLOYEE_TYPES.PICKER,
    label: t('global:WORKER_TYPES.PICKER'),
  },
];

export const customWeekStartEndFormat = value => `${moment(value).startOf('week').format(getLocalDateFormat())} ~ ${moment(value)
  .endOf('week')
  .format(getLocalDateFormat())}`;
