import * as Yup from 'yup';

import { GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE } from '@shared/shared/constants';
import { t } from '@shared/i18n';

export const defaultValues = {
  [GETIR_10_DOMAIN_TYPE]: [],
  [GETIR_MARKET_DOMAIN_TYPE]: [],
};

// TO-DO: Refactor with new form helper logic
const itemValidationSchema = Yup.array().of(
  Yup.object().shape({
    min: Yup.number()
      .min(0, t('baseYupError:NUMBER.MIN', { min: 0 }))
      .typeError(t('baseYupError:MIXED.NOT_TYPE')),
    max: Yup.number() // can only be -1 other than positive integers (signifying rest of the values)
      .min(-1, t('baseYupError:NUMBER.MIN', { min: -1 }))
      .typeError(t('baseYupError:MIXED.NOT_TYPE')),
    commissionRate: Yup.number()
      .min(0, t('baseYupError:NUMBER.MIN', { min: 0 }))
      .max(100, t('baseYupError:NUMBER.MAX', { max: 100 }))
      .typeError(t('baseYupError:MIXED.NOT_TYPE')),
  }),
);

export const validationSchema = () => {
  return Yup.object()
    .shape({
      [GETIR_10_DOMAIN_TYPE]: itemValidationSchema,
      [GETIR_MARKET_DOMAIN_TYPE]: itemValidationSchema,
    });
};
