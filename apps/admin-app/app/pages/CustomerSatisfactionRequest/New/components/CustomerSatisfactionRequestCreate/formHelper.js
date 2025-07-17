import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  warehouseId: '',
  products: [],
};

export const validationSchema = () => {
  return Yup.object().shape({
    warehouseId: Yup.string().required(t('error:REQUIRED')),
    products: Yup.array().when('warehouseId', {
      is: Yup.string(),
      then: Yup.array()
        .of(
          Yup.object().shape({
            quantity: Yup.number().required(t('error:REQUIRED')),
            productId: Yup.string().required(t('error:REQUIRED')),
          }),
        )
        .required(t('error:REQUIRED')),
      otherwise: undefined,
    }),
  });
};
