import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { isValidGSMGlobal } from '@shared/utils/validation';

export const validationSchema = () => {
  return Yup.object().shape({
    cellPhone: Yup.string()
      .required(t('baseYupError:MIXED.REQUIRED'))
      .test('gsm-test', t('error:VALID_PHONE'), cellPhone => {
        return isValidGSMGlobal(cellPhone);
      }),
    nameSurname: Yup.string()
      .required(t('baseYupError:MIXED.REQUIRED'))
      .min(5, t('baseYupError:STRING.MIN', { min: 5 })),
    email: Yup.string()
      .email(t('baseYupError:STRING.EMAIL'))
      .required()
      .min(5, t('baseYupError:STRING.MIN', { min: 5 })),
  });
};
