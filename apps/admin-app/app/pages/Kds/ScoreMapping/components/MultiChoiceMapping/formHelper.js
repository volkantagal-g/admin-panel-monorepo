import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  GETIR10: [],
  MARKET: [],
  STORE_CONVERSION: [],
  MAIN_WAREHOUSE: [],
  WATER: [],
};

export const validationSchema = () => {
  return Yup.object().shape({
    GETIR10: Yup.array().of(
      Yup.object().shape({
        name: YupMultiLanguage.string({ isRequired: true }),
        min: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
        max: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
      }),
    ),
    MARKET: Yup.array().of(
      Yup.object().shape({
        name: YupMultiLanguage.string({ isRequired: true }),
        min: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
        max: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
      }),
    ),
    STORE_CONVERSION: Yup.array().of(
      Yup.object().shape({
        name: YupMultiLanguage.string({ isRequired: true }),
        min: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
        max: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
      }),
    ),
    MAIN_WAREHOUSE: Yup.array().of(
      Yup.object().shape({
        name: YupMultiLanguage.string({ isRequired: true }),
        min: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
        max: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
      }),
    ),
    WATER: Yup.array().of(
      Yup.object().shape({
        name: YupMultiLanguage.string({ isRequired: true }),
        min: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
        max: Yup.number().required().min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
      }),
    ),
  });
};
