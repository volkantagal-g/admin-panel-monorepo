import { object, string } from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { value: '{}' };

const urlSafeStringRegex = /^[a-zA-Z0-9-_.~]+$/;

export const validationSchema = object({
  key: string().required().test(
    'is-url-safe',
    'The string must only contain URL-safe characters (alphanumeric, hyphen, underscore, period, and tilde)',
    value => urlSafeStringRegex.test(value),
  ),
  alias: string().required(),
  configType: string().required(),
  value: object().required().typeError(t('INVALID')),
});
