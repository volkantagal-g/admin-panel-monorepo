import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  taxOffice: '',
  taxNumber: '',
  name: '',
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      taxOffice: Yup.string()
        .required(t('error:REQUIRED')),
      taxNumber: Yup.string()
        .required(t('error:REQUIRED')),
      name: Yup.string()
        .required(t('error:REQUIRED')),
    });
};
