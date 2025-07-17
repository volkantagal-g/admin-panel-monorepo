import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  auditorId: null,
  franchiseId: null,
  warehouseId: null,
  auditFormTypeId: null,
  round: null,
};

export const validationSchema = () => {
  return Yup.object().shape({
    auditorId: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    franchiseId: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    warehouseId: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    auditFormTypeId: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    round: Yup.number().nullable(),
  });
};
