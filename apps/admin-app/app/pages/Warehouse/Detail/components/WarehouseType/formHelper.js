import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { warehouseType: 0 };

export const validationSchema = () => {
  return Yup.object().shape({
    warehouseType: Yup.number().required(t('error:REQUIRED')),
    isAllowedForNegativeStock: Yup.boolean(),
  });
};
