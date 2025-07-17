import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const teamSchema =
    Yup.object()
      .shape({
        name: Yup.string()
          .min(10, t('baseYupError:STRING.MIN', { min: 10 }))
          .required(),
        description: Yup.string()
          .min(10, t('baseYupError:STRING.MIN', { min: 10 }))
          .required(),
      });

export const getInitialValues = () => {
  const initialValues = {
    name: '',
    description: '',
  };
  return initialValues;
};
