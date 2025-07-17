import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  polygonType: undefined,
  domainType: undefined,
  subregionIntervalType: undefined,
  city: undefined,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      polygonType: Yup.number().required(t('error:REQUIRED')).min(1),
      domainType: Yup.number(),
      subregionIntervalType: Yup.number(),
      city: Yup.string().trim().required(t('error:REQUIRED')),
    });
};
