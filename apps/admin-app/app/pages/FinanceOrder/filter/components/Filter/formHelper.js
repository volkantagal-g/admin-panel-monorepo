import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const validationSchema = Yup.object()
  .shape({
    startCheckoutDate: Yup.string().required(t('error:REQUIRED')),
    endCheckoutDate: Yup.string().required(t('error:REQUIRED')),
    status: Yup.string().required(t('error:REQUIRED')),
  });
