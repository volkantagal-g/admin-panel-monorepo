import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { validateValueByType } from '../../../utils';
import { CONFIG_TYPES } from '@app/pages/Config/constants';

export const MAX_KEY_LENGTH = 100;
export const MIN_DESCRIPTION_LENGTH = 10;
export const MIN_RESPONSIBLE_SQUAD_LENGTH = 10;
export const MAX_RESPONSIBLE_SQUAD_LENGTH = 100;

export const defaultValues = {
  key: '',
  type: undefined,
  value: undefined,
  description: '',
  responsibleSquad: '',
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      key: Yup.string()
        .max(MAX_KEY_LENGTH, t('baseYupError:STRING.MAX', { max: MAX_KEY_LENGTH }))
        .required(t('baseYupError:STRING.REQUIRED')),
      type: Yup.string()
        .oneOf(Object.values(CONFIG_TYPES))
        .required(t('baseYupError:STRING.REQUIRED')),
      value: Yup.mixed()
        // arrow functions do not allow rebinding `this`
        // eslint-disable-next-line func-names
        .test('value', t('configPage:ERR_TYPE_AND_VALUE_DOES_NOT_MATCH'), function (value) {
          return validateValueByType({ type: this.options.parent.type, value });
        })
        .required(),
      description: Yup.string()
        .min(MIN_DESCRIPTION_LENGTH, t('baseYupError:STRING.MIN', { min: MIN_DESCRIPTION_LENGTH }))
        .required(t('baseYupError:STRING.REQUIRED')),
      responsibleSquad: Yup.string()
        .min(MIN_RESPONSIBLE_SQUAD_LENGTH, t('baseYupError:STRING.MIN', { min: MIN_RESPONSIBLE_SQUAD_LENGTH }))
        .max(MAX_RESPONSIBLE_SQUAD_LENGTH, t('baseYupError:STRING.MAX', { max: MAX_RESPONSIBLE_SQUAD_LENGTH }))
        .required(t('baseYupError:STRING.REQUIRED')),
    });
};
