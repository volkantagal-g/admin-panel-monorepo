import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { Segment } from '../../../types';

export const validationSchema = () => {
  return Yup.object()
    .shape({ expiration: Yup.object().shape({ isExpired: Yup.boolean().required(t('error:REQUIRED')) }) });
};

export const getInitialValues = (segment: Segment) => {
  return ({
    expiration: {
      isExpired: segment.expiration?.isExpired || false,
      expiredAt: segment.expiration?.time || '',
    },
  });
};
