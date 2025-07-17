import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  name: {},
  status: null,
  auditFormType: null,
};

export const validationSchema = () => {
  return Yup.object().shape({
    name: YupMultiLanguage.string({ isRequired: true }),
    auditFormType: Yup.array().min(1).required(t('baseYupError:MIXED.REQUIRED')),
    status: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
  });
};