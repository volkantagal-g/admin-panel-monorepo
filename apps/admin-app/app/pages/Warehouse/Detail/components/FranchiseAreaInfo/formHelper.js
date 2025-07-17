import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { franchiseArea: '' };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      franchiseArea: Yup.string()
        .min(2)
        .required(t('error:REQUIRED')),
    });
};
