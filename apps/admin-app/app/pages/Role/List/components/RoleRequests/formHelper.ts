import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { isObjectIdValid } from '@shared/utils/common';
import {
  ROLE_REQUEST_DURATION_TYPE,
  ROLE_REQUEST_TIME_LIMIT,
} from '@app/pages/Role/components/UserRoleRequestModalContent/constants';

export const defaultValues = { id: '', responseReason: '' };

export const rejectRequestValidationSchema = () => {
  return Yup.object()
    .shape({
      responseReason: Yup.string()
        .trim()
        .required(t('baseYupError:STRING.REQUIRED')),
    });
};

export const approveRequestValidationSchema = () => {
  return Yup.object()
    .shape({
      responseReason: Yup.string()
        .trim(),
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

export const objectIdValidationSchema = () => {
  return Yup.object()
    .shape({
      id: Yup.string()
        .trim()
        .test('ObjectId', t('baseYupError:STRING.OBJECT_ID'), value => {
          if (!value) return true;
          return isObjectIdValid(value);
        }),
    });
};
