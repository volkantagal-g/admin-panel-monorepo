import * as Yup from 'yup';

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
        value: Yup.number().required(),
      }),
    ),
    MARKET: Yup.array().of(
      Yup.object().shape({
        name: YupMultiLanguage.string({ isRequired: true }),
        value: Yup.number().required(),
      }),
    ),
    STORE_CONVERSION: Yup.array().of(
      Yup.object().shape({
        name: YupMultiLanguage.string({ isRequired: true }),
        value: Yup.number().required(),
      }),
    ),
    MAIN_WAREHOUSE: Yup.array().of(
      Yup.object().shape({
        name: YupMultiLanguage.string({ isRequired: true }),
        value: Yup.number().required(),
      }),
    ),
    WATER: Yup.array().of(
      Yup.object().shape({
        name: YupMultiLanguage.string({ isRequired: true }),
        value: Yup.number().required(),
      }),
    ),
  });
};
