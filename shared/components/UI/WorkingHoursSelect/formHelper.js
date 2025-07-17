import * as Yup from 'yup';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';

export const defaultValues = { message: getLangDataOfItem(undefined, undefined, "") };

export const validationSchema = () => {
  return Yup.object()
    .shape({ message: YupMultiLanguage.string({ min: null, max: null, isRequired: true }) });
};