import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { Segment } from '../../../types';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      lifetimeConditions: Yup.object().shape({
        isEnabled: Yup.boolean().required(t('error:REQUIRED')),
        reasonText: Yup.string().when(['isEnabled'], {
          is: true,
          then: Yup.string().required(),
          otherwise: Yup.string(),
        }),
      }),
    });
};

export const getInitialValues = (segment: Segment) => ({
  lifetimeConditions: {
    isEnabled: segment.lifetimeConditions?.isEnabled || false,
    reasonText: segment.lifetimeConditions?.reasonText || '',
    createdAt: segment.lifetimeConditions?.createdAt || '',
  },
});
