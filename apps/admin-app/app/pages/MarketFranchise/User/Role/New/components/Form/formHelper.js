import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  name: '',
  descriptions: {},
};

export const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    descriptions: YupMultiLanguage.string({ isRequired: true }),
  });
};
