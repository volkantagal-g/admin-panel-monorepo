import * as Yup from 'yup';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  title: {},
  description: {},
  isActive: null,
};

export const validationSchema = () => {
  return Yup.object().shape({
    title: YupMultiLanguage.string({ isRequired: true }),
    description: YupMultiLanguage.string({ isRequired: true }),
    isActive: Yup.boolean().required(),
  });
};
