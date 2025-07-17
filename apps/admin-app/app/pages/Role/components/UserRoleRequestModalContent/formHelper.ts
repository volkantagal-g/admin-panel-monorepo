import * as Yup from 'yup';

import { t } from '@shared/i18n';
import {
  ROLE_REQUEST_DURATION_TYPE,
  ROLE_REQUEST_TIME_LIMIT,
} from '@app/pages/Role/components/UserRoleRequestModalContent/constants';

export const defaultValues: Partial<RoleRequestType> = {
  requestReason: '',
  timeLimit: ROLE_REQUEST_TIME_LIMIT.PERMANENT,
  durationType: ROLE_REQUEST_DURATION_TYPE.DURATION,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      requestReason: Yup.string()
        .trim()
        .required(t('baseYupError:STRING.REQUIRED'))
        .min(10, t('baseYupError:STRING.MIN', { min: 10 })),
      timeLimit: Yup.string()
        .required(t('baseYupError:STRING.REQUIRED'))
        .oneOf(Object.keys(ROLE_REQUEST_TIME_LIMIT)),
      durationType: Yup.string()
        .required(t('baseYupError:STRING.REQUIRED'))
        .oneOf(Object.keys(ROLE_REQUEST_DURATION_TYPE)),
      durationDays: Yup.number()
        .when(['timeLimit', 'durationType'], {
          is: (timeLimit, durationType) => {
            return timeLimit === ROLE_REQUEST_TIME_LIMIT.TEMPORARY && durationType === ROLE_REQUEST_DURATION_TYPE.DURATION;
          },
          then: Yup.number().required(t('baseYupError:MIXED.REQUIRED')),
        }),
      endDate: Yup.date()
        .when(['timeLimit', 'durationType'], {
          is: (timeLimit, durationType) => {
            return timeLimit === ROLE_REQUEST_TIME_LIMIT.TEMPORARY && durationType === ROLE_REQUEST_DURATION_TYPE.END_DATE;
          },
          then: Yup.date().required(t('baseYupError:DATE.REQUIRED')),
        }),
    });
};
