import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { franchiseType: '' };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      franchiseType: Yup.string()
        .required(t('error:REQUIRED')),
    });
};
