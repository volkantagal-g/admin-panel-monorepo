import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { ORDER_NOTE } from './constants';

export const validationSchema = () => {
  return Yup.object().shape({ [ORDER_NOTE]: Yup.string().trim().required(t('financeOrderDetailPage:ORDER_DETAIL_NOTE')) });
};

export const getInitialValues = () => {
  return { [ORDER_NOTE]: '' };
};
