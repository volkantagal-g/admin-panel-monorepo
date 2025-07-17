import { t } from '@shared/i18n';

export const formRules = {
  hourly: [{ required: true, message: t('error:REQUIRED') }],
  daily: [{ required: true, message: t('error:REQUIRED') }],
  weekly: [{ required: true, message: t('error:REQUIRED') }],
  monthly: [{ required: true, message: t('error:REQUIRED') }],
};
