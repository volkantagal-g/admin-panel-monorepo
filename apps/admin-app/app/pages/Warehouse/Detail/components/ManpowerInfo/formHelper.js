import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { manHourFeeGroup: 0 };

export const validationSchema = () => {
  return Yup.object().shape({ manHourFeeGroup: Yup.number().required(t('error:REQUIRED')) });
};
