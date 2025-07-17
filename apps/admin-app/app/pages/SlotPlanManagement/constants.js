import { WORKFORCE_EMPLOYEE_TYPES } from '@shared/shared/constants';
import { t } from '@shared/i18n';

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
