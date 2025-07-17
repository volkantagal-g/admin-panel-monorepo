import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { isAdmin: false };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      isAdmin: Yup.boolean()
        .required(t('error:REQUIRED')),
    });
};
