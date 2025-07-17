import * as Yup from 'yup';

import { GETIR_10_DOMAIN_TYPE, NONE_POYGON_TYPE } from '@shared/shared/constants';

export const defaultValues = {
  polygonTypes: NONE_POYGON_TYPE,
  domainTypes: GETIR_10_DOMAIN_TYPE,
  city: '',
  date: [],
  hours: [],
  isActive: true,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      polygonType: Yup.number().min(1),
      domainTypes: Yup.number(),
      city: Yup.string().trim(),
      date: Yup.date(),
      hours: Yup.number(),
    });
};
