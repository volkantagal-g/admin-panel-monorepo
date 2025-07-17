import * as Yup from 'yup';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  name: {},
  isSendToFranchise: true,
};

export const validationSchema = () => {
  return Yup.object().shape({
    name: YupMultiLanguage.string({ isRequired: true }),
    isSendToFranchise: Yup.bool(),
  });
};
