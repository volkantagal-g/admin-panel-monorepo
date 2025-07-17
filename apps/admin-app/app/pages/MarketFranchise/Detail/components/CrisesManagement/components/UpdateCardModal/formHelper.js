import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  date: '',
  notes: '',
  topicId: '',
  files: [],
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      notes: Yup.string()
        .trim()
        .required(t('baseYupError:MIXED.REQUIRED')),
    });
};
