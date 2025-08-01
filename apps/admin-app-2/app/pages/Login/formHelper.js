import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { email: '' };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      email: Yup.string()
        .email(t('error:VALID_EMAIL'))
        .required(t('error:REQUIRED')),
    });
};
