import { t } from '@shared/i18n';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  requiredWithoutType: [{ required: true, message: t('error:REQUIRED') }],
};
