import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { warehouseDeliveryFeeLayers: undefined, type: 'regular' };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      warehouseDeliveryFeeLayers: Yup.array().of(Yup.object().shape({
        warehouseId: Yup.string(),
        layer: Yup.array().of(Yup.object()),
      })).required(t('error:REQUIRED')),
      type: Yup.string(),
    });
};
