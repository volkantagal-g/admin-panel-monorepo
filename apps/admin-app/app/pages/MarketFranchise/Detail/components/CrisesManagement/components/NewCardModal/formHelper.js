import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  date: '',
  topicId: '',
  notes: '',
  files: [],
  franchiseId: '',
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      date: Yup.string()
        .trim()
        .required(t('baseYupError:MIXED.REQUIRED')),
      notes: Yup.string()
        .trim()
        .required(t('baseYupError:MIXED.REQUIRED')),
      topicId: Yup.string()
        .trim()
        .required(t('baseYupError:MIXED.REQUIRED')),
    });
};
