import { object, string } from 'yup';

const urlSafeStringRegex = /^[a-zA-Z0-9-_.~]+$/;

export const updateConfigNodeValidationSchema = object({
  key: string().required().test(
    'is-url-safe',
    'The string must only contain URL-safe characters (alphanumeric, hyphen, underscore, period, and tilde)',
    value => urlSafeStringRegex.test(value),
  ),
  alias: string().required(),
  type: string().required(),
});
