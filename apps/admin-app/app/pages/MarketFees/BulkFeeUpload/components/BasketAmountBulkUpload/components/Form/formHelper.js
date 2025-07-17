import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const initialValues = { basketAmounts: undefined };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      basketAmounts: Yup.array().of(Yup.object().shape({
        warehouseId: Yup.string().required(),
        domainType: Yup.number(),
        minDiscountedAmount: Yup.number(),
        maxDiscountedAmount: Yup.number().nullable(),
        zoneBasedBasketAmounts: Yup.object().shape({
          1: Yup.object()
            .shape({
              minDiscountedAmount: Yup.number(),
              maxDiscountedAmount: Yup.number(),
            }),
          2: Yup.object()
            .shape({
              minDiscountedAmount: Yup.number(),
              maxDiscountedAmount: Yup.number(),
            }),
          3: Yup.object()
            .shape({
              minDiscountedAmount: Yup.number(),
              maxDiscountedAmount: Yup.number(),
            }),
        }),
      }).required(t('error:REQUIRED'))),
    });
};
