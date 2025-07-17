import * as Yup from 'yup';

import { isValidGSMGlobal } from '@shared/utils/validation';

export const validationSchema = ({ t }) => {
  return Yup.object().shape({
    name: Yup.string().trim(),
    relation: Yup.number(),
    fullGsm: Yup.string().test(t('error:INVALID'), gsm => {
      if (gsm) {
        return isValidGSMGlobal(gsm.split('-')?.join(''));
      }
      return true;
    }),
  });
};
