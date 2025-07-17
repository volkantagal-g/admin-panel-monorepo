import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  ruleNumber: null,
  title: {},
  category: null,
  priority: null,
  description: {},
  closeMessage: null,
  closeAs: null,
  rejectionPoint: null,
  warningPoint: null,
  acceptancePoint: null,
  isActive: null,
  defaultNote: '',
};

export const validationSchema = () => {
  return Yup.object().shape({
    ruleNumber: Yup.number().required(t('baseYupError:MIXED.REQUIRED')),
    title: YupMultiLanguage.string({ isRequired: true, max: 400 }),
    category: Yup.string().required(t('baseYupError:MIXED.REQUIRED')),
    priority: Yup.string().required(t('baseYupError:MIXED.REQUIRED')),
    description: YupMultiLanguage.string({ isRequired: true, max: 400 }),
    closeMessage: Yup.string().nullable(),
    closeAs: Yup.number().nullable(),
    rejectionPoint: Yup.number().nullable(),
    warningPoint: Yup.number().nullable(),
    acceptancePoint: Yup.number().nullable(),
    isActive: Yup.boolean().required(),
    defaultNote: Yup.string(),
  });
};
