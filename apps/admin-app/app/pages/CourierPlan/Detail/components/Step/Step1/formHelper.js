import * as Yup from 'yup';

import { FORECAST_TYPE } from '@app/pages/CourierPlan/constants';

import { defaultSchema } from '../CommonForm/formHelper';

export const defaultValues = {
  type: undefined,
  fileList: [],
  finalFileList: [],
};

export const validationSchema = t => Yup.object().shape({
  ...defaultSchema,
  type: Yup.number().required(t('error:REQUIRED')),
});

export const planTypeForecast = t => {
  return [
    { label: t('FORECAST_OPERATIONAL'), value: FORECAST_TYPE.Operational },
    { label: t('FORECAST_HYBRID'), value: FORECAST_TYPE.Hybrid },
    { label: t('FORECAST_DATA'), value: FORECAST_TYPE.Data },
  ];
};
