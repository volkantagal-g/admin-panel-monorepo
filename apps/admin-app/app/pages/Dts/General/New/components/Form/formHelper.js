import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  rule: null,
  ruleDescription: null,
  ruleCategory: null,
  rulePriority: null,
  description: null,
  feedbackSource: null,
  person: null,
  realized: null,
  warehouse: null,
  files: [],
  isActive: null,
};

export const validationSchema = () => {
  return Yup.object().shape({
    rule: Yup.string().required(t('baseYupError:MIXED.REQUIRED')),
    ruleDescription: Yup.string().nullable(),
    ruleCategory: Yup.string().nullable(),
    rulePriority: Yup.string().nullable(),
    description: Yup.string().required(t('baseYupError:MIXED.REQUIRED')),
    feedbackSource: Yup.string().required(t('baseYupError:MIXED.REQUIRED')),
    person: Yup.string().nullable(),
    realized: Yup.date(),
    warehouse: Yup.string().required(t('baseYupError:MIXED.REQUIRED')),
    files: Yup.array().nullable(),
    isActive: Yup.boolean().required(),
  });
};
