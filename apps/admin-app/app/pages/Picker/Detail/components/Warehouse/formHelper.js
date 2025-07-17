import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { warehouse: '' };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      warehouse: Yup.string()
        .required(t('error:REQUIRED')),
    });
};
