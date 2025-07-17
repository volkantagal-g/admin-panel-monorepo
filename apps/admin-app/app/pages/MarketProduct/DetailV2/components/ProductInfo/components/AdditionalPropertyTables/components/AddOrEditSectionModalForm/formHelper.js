import * as Yup from 'yup';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';

export const validationSchema = () => {
  return Yup.object()
    .shape({ title: YupMultiLanguage.string({ isRequired: true, min: null, max: null }) });
};

export const getInitialValues = () => {
  return { title: getLangDataOfItem() };
};
