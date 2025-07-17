import { t } from '@shared/i18n';
import { isObjectIdValid } from '@shared/utils/common';

export const objectIdValidatorRule = () => ({
  validator: async (_, value) => {
    if (value && !isObjectIdValid(value)) {
      return Promise.reject(t('error:VALID_OBJECT_ID'));
    }
    return true;
  },
});
