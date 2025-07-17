import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { requestReason: '' };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      requestReason: Yup.string()
        .trim()
        .required(t('baseYupError:STRING.REQUIRED'))
        .min(10, t('baseYupError:STRING.MIN', { min: 10 })),
    });
};
