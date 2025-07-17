import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const validationSchema = Yup.object()
  .shape({
    name: Yup.object().shape({
      tr: Yup.string()
        .trim()
        .min(3)
        .max(50)
        .required(t('error:REQUIRED')),
      en: Yup.string()
        .trim()
        .min(3)
        .max(50)
        .required(t('error:REQUIRED')),
    }).required(t('error:REQUIRED')),
  });

export const getInitialValues = () => {
  return { name: { tr: '', en: '' } };
};
