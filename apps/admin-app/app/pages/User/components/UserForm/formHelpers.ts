import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .required(t('error:REQUIRED')),
      email: Yup.string()
        .email()
        .required(t('error:REQUIRED')),
      countries: Yup.array()
        .of(Yup.string()),
      hasGlobalAccess: Yup.boolean(),
    });
};
