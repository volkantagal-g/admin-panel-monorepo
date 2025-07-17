import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { employmentType: '' };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      employmentType: Yup.string()
        .required(t('error:REQUIRED')),
    });
};
