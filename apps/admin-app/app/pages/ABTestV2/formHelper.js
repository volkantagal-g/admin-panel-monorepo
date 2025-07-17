import { t } from '@shared/i18n';
import { MIN_SEARCH_INPUT_LENGTH } from './constants';

export const rules = {
  required: [{ required: true, message: t('error:REQUIRED') }],
  minLength: [{
    message: t('MIN_THREE_CHARACTERS'),
    validator: (_, value) => {
      if (value !== '' && value.length < MIN_SEARCH_INPUT_LENGTH) {
        return Promise.reject(new Error());
      }
      return Promise.resolve();
    },
  },
  ],
};
