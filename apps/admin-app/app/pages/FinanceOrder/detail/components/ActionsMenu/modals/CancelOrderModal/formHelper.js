import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const validationSchema = Yup.object()
  .shape({
    reasonCode: Yup.string().nullable().required(t('error:REQUIRED')),
    description: Yup.string().required(t('error:REQUIRED')).max(255, t('error:MAX_LENGTH_255')),
  });

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const initialValues = {
  reasonCode: null,
  description: '',
};
