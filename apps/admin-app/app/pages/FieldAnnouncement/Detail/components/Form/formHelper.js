import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  warehouseIds: [],
  titleEn: undefined,
  titleNative: undefined,
  active: true,
  descriptionEn: undefined,
  descriptionNative: undefined,
};

export const validationSchema = () => {
  return Yup.object().shape({
    warehouseIds: Yup.array().of(Yup.string()).required(t('error:REQUIRED')).min(1),
    active: Yup.boolean().required(t('error:REQUIRED')),
    titleEn: Yup.string(),
    titleNative: Yup.string(),
    descriptionEn: Yup.string(),
    descriptionNative: Yup.string(),
  });
};
