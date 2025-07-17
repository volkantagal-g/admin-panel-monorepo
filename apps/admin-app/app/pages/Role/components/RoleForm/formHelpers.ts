import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .required(t('error:REQUIRED')),
      isActive: Yup.boolean(),
      description: Yup.object()
        .shape({
          en: Yup.string().required(t('error:REQUIRED')),
          tr: Yup.string().required(t('error:REQUIRED')),
        }),
      parent: Yup.string(),
    });
};
