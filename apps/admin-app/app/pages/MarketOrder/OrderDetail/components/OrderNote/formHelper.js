import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const validationSchema = () => {
  return Yup.object().shape({ message: Yup.string().trim().required(t('marketOrderPage:ORDER_DETAIL_NOTE')) });
};

export const getInitialValues = () => {
  return { message: '' };
};
