import * as Yup from 'yup';

import { weekDays } from '../../../utils/constants';

export const defaultValues = {
  name: null,
  cityId: null,
  polygonType: null,
  domainTypes: undefined,
  vehicleTypes: [],
  startTime: undefined,
  endTime: undefined,
  startDate: undefined,
  endDate: undefined,
  activeDays: weekDays,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string().min(3).required(),
      cityId: Yup.string().trim(),
      polygonType: Yup.number().min(1).required(),
      domainTypes: Yup.array().min(1).required(),
      vehicleTypes: Yup.array().optional(),
      startTime: Yup.string().required(),
      endTime: Yup.string().required(),
      startDate: Yup.date().required(),
      endDate: Yup.date().required(),
      activeDays: Yup.array().min(1).required(),
    });
};
