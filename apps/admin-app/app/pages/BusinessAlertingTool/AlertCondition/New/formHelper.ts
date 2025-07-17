import * as Yup from 'yup';

import { NOTIFICATION_RECEIVER_LIMIT } from '../../constants';

export function validationSchema() {
  return Yup.object().shape({
    name: Yup.object().shape({ tr: Yup.string().trim().required(), en: Yup.string().trim().required() }),
    description: Yup.object().shape({ tr: Yup.string().trim().required(), en: Yup.string().trim().required() }),
    metricGroup: Yup.string().trim().required(),
    permittedRoles: Yup.array().min(1).required(),
    notificationPreferences: Yup.object().shape({
      email: Yup.object().shape({ isActive: Yup.boolean(), recipients: Yup.array().max(NOTIFICATION_RECEIVER_LIMIT) }),
      slack: Yup.object().shape({ isActive: Yup.boolean(), recipients: Yup.array().max(NOTIFICATION_RECEIVER_LIMIT) }),
    }),
    queryInfo: Yup.object().shape({
      raw: Yup.object().shape({
        variables: Yup.object().required(),
        filters: Yup.object().required(),
        breakdown: Yup.string().trim(),
        formula: Yup.string().trim(),
        timePeriod: Yup.number().required(),
        compareWithPast: Yup.boolean(),
        compareWithPastPeriod: Yup.number(),
      }),
      runningConfig: Yup.object().shape({ runningHours: Yup.array().min(1).required() }),
    }),
  });
}
