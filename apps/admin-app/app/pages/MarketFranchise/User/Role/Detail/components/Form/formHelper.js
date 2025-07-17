import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  key: null,
  descriptions: {},
  permissions: [],
};

export const validationSchema = () => {
  return Yup.object().shape({
    key: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    descriptions: YupMultiLanguage.string({ isRequired: true }),
    permissions: Yup.array().of(
      Yup.object().shape({
        key: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
        description: YupMultiLanguage.string({ isRequired: true }),
      })
    ),
  });
};
