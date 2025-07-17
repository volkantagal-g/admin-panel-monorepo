import * as Yup from 'yup';

import moment from 'moment';

import { t } from '@shared/i18n';

export const defaultPreparationValues = { class: undefined, from: moment().add(1, 'day').endOf('day').toISOString() };
export const defaultFrequencyValues = { code: undefined, from: moment().add(1, 'day').endOf('day').toISOString() };

export const validationFrequencySchema = () => {
  return Yup.object().shape({ code: Yup.number().required(t('error:REQUIRED')), from: Yup.string().required(t('error:REQUIRED')) });
};

export const validationPreparationSchema = () => {
  return Yup.object().shape({ code: Yup.string().required(t('error:REQUIRED')), from: Yup.string().required(t('error:REQUIRED')) });
};
