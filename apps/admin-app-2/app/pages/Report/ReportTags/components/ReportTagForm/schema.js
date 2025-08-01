import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const reportTagValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.object()
      .shape({
        tr: Yup.string().trim().required(t('error:REQUIRED')),
        en: Yup.string().trim().required(t('error:REQUIRED')),
      })
      .required(),
    description: Yup.object()
      .shape({
        tr: Yup.string().trim().required(t('error:REQUIRED')),
        en: Yup.string().trim().required(t('error:REQUIRED')),
      })
      .required(),
    backgroundColor: Yup.string().default('#FFFFFF'),
    textColor: Yup.string().default('#000000'),
  });
};
