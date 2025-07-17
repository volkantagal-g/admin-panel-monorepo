import * as Yup from 'yup';

import { DAYTIME_INTERVAL_TYPE, GETIR_10_DOMAIN_TYPE, NONE_POYGON_TYPE } from '@shared/shared/constants';
import { vehicleTypes } from '../../utils';

export const defaultValues = {
  polygonType: NONE_POYGON_TYPE,
  domainType: GETIR_10_DOMAIN_TYPE,
  subregionIntervalType: DAYTIME_INTERVAL_TYPE,
  city: '',
  isActive: true,
  vehicleTypes: [...vehicleTypes],
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      polygonType: Yup.number().min(1),
      domainType: Yup.number(),
      subregionIntervalType: Yup.number(),
      city: Yup.string()
        .trim(),
      vehicleTypes: Yup.array().optional(),
    });
};
