import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const validationSchema = () => {
  return Yup.object().shape({
    dds_weight: Yup.number().required(t('error:REQUIRED')),
    dts_weight: Yup.number().required(t('error:REQUIRED')),
    kds_weight: Yup.number().required(t('error:REQUIRED')),
    sts_weight: Yup.number().required(t('error:REQUIRED')),
  });
};
