import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  name: '',
  gsm: '',
  gsmAlt: undefined,
  nameAlt: undefined,
  email: '',
  hasAlternativeContactInformation: null,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string().required(t('error:REQUIRED')),
      gsm: Yup.string().required(t('error:REQUIRED')),
      nameAlt: Yup.string().when('hasAlternativeContactInformation', {
        is: true,
        then: Yup.string().required(),
      }),
      gsmAlt: Yup.string().when('hasAlternativeContactInformation', {
        is: true,
        then: Yup.string().required(),
      }),
      hasAlternativeContactInformation: Yup.boolean(),
      email: Yup.string().required(t('error:REQUIRED')),
    });
};
