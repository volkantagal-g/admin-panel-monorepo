import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { reasonId: null };

export const validationSchema = () => {
  return Yup.object().shape({ reasonId: Yup.string().required(t('baseYupError:MIXED.REQUIRED')) });
};
