import * as Yup from 'yup';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  name: {},
  description: {},
  roles: [],
  reports: [],
  countries: [],
  hasGlobalAccess: false,
};

export const validationSchema = () => {
  return Yup.object().shape({
    name: YupMultiLanguage.string({ isRequired: true }),
    description: YupMultiLanguage.string({ isRequired: true }),
    roles: Yup.array().of(Yup.object().shape({
      permissions: Yup.array().of(Yup.string()).required(),
      role: Yup.string().required(),
    })),
    reports: Yup.array().of(Yup.string()),
    countries: Yup.array().of(Yup.string()).when('hasGlobalAccess', {
      is: false,
      then: Yup.array().of(Yup.string()).required(),
    }),
    hasGlobalAccess: Yup.boolean().required(),
  });
};
