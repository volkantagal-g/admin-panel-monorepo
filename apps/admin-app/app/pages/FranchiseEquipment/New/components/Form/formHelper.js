import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  franchiseId: null,
  warehouseId: null,
  carCount: null,
  motoCount: null,
  openDate: null,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      franchiseId: Yup.string()
        .trim()
        .required(t('baseYupError:MIXED.REQUIRED')),
      warehouseId: Yup.string()
        .trim()
        .required(t('baseYupError:MIXED.REQUIRED')),
      carCount: Yup.number()
        .required(t('baseYupError:MIXED.REQUIRED'))
        .min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
      motoCount: Yup.number()
        .required()
        .min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
    });
};
