import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  username: '',
  name: '',
  email: '',
  gsm: '',
  franchise: '',
  isOwner: false,
  isGetirEmployee: false,
};

export const validationSchema = () => {
  return Yup.object().shape({
    username: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    name: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    email: Yup.string().email().required(t('baseYupError:MIXED.REQUIRED')),
    gsm: Yup.number().required(t('baseYupError:MIXED.REQUIRED')),
    franchise: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    isOwner: Yup.boolean().required(t('baseYupError:MIXED.REQUIRED')),
    isGetirEmployee: Yup.boolean().required(t('baseYupError:MIXED.REQUIRED')),
  });
};
