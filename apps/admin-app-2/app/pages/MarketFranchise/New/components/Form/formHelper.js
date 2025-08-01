import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  franchiseType: '',
  name: '',
  taxOffice: '',
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .min(2)
        .required(t('error:REQUIRED')),
      franchiseType: Yup.string()
        .required(t('error:REQUIRED')),
      taxOffice: Yup.string().trim()
        .required(t('error:REQUIRED')),
    });
};
