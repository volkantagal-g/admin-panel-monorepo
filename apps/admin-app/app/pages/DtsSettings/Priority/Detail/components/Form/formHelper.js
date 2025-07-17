import * as Yup from 'yup';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  title: {},
  description: {},
  rejectionPoint: null,
  warningPoint: null,
  isActive: null,
};

export const validationSchema = () => {
  return Yup.object().shape({
    title: YupMultiLanguage.string({ isRequired: true }),
    description: YupMultiLanguage.string({ isRequired: true }),
    rejectionPoint: Yup.number().nullable(),
    warningPoint: Yup.number().nullable(),
    isActive: Yup.boolean().required(),
  });
};
