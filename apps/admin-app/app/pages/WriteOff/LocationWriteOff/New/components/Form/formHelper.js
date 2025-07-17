import * as Yup from 'yup';

import { locationWriteOffComments } from '@shared/shared/constantValues';
import { t } from '@shared/i18n';

export const defaultValues = {
  warehouseId: '',
  warehouseLocationId: '',
  reason: '',
  documentedDate: null,
  products: [],
};

export const MAX_COMMENT_LENGTH = 100;

export const validationSchema = () => {
  return Yup.object()
    .shape({
      warehouseId: Yup.string()
        .required(t('error:REQUIRED')),
      warehouseLocationId: Yup.string()
        .required(t('error:REQUIRED')),
      reason: Yup.string()
        .required(t('error:REQUIRED')),
      comment: Yup.string().oneOf(Object.keys(locationWriteOffComments)).required(t('error:REQUIRED')),
      documentedDate: Yup.date().nullable(),
      products: Yup.array().of(
        Yup.object().shape({
          quantity: Yup.number().required(t('error:REQUIRED')),
          productId: Yup.string().required(t('error:REQUIRED')),
          comment: Yup.string().max(MAX_COMMENT_LENGTH, t('baseYupError:STRING.MAX', { max: MAX_COMMENT_LENGTH })),
        }),
      ).required(t('error:REQUIRED')),
    });
};
