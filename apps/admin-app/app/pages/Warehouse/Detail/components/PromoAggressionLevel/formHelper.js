import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { promoAggressionLevel: 0 };

export const validationSchema = () => {
  return Yup.object().shape({ promoAggressionLevel: Yup.number().required(t('error:REQUIRED')) });
};
