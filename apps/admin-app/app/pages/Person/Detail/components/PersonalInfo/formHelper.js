import * as Yup from 'yup';

import { isValidClientGSM } from '../../../utils';

export const validationSchema = ({ t }) => {
  return Yup.object().shape({
    uniqueIdentifier: Yup.string().trim(),
    country: Yup.string().required(),
    countryGsmCode: Yup.string().required(),
    personalGsm: Yup.string()
      .required(t('error:REQUIRED'))
      .test('validationForExactLength', t('error:INVALID'), function (gsm) {
        const { countryGsmCode } = this.parent;
        if (!gsm || gsm.length <= 2 || gsm.length > 17) {
          return this.createError({ message: t('error:INVALID') });
        }
        if (!isValidClientGSM(gsm, countryGsmCode)) {
          return this.createError({ message: t('error:INVALID') });
        }
        return true;
      }),
    shouldAddEmployeeDiscount: Yup.bool(),
  });
};
