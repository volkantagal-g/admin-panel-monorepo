import { t } from '@shared/i18n';

export const activenessSelectOptions =
  [
    { label: t('tmsPage:ACTIVE'), value: true },
    { label: t('tmsPage:INACTIVE'), value: false },
  ];

export const formValidationRules = { required: [{ required: true, message: t('error:REQUIRED') }] };
