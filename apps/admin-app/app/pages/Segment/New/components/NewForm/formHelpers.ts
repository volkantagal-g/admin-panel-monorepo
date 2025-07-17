import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      description: Yup.string().min(20).required(t('error:REQUIRED')),
      countries: Yup.array().of(Yup.string()).when('hasGlobalAccess', {
        is: false,
        then: Yup.array().of(Yup.string()).required(),
      }),
      hasGlobalAccess: Yup.boolean().required(),
      type: Yup.number().required(t('error:REQUIRED')),
      domainTypes: Yup.array().of(Yup.number()).when('hasAllDomainTypes', {
        is: false,
        then: Yup.array().of(Yup.number()).required(),
      }),
      hasAllDomainTypes: Yup.boolean().required(),
      expireAt: Yup.string().required(t('error:REQUIRED')),
    });
};
